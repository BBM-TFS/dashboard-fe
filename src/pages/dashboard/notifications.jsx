import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { saveAs } from 'file-saver'; // Install this package

export function Notifications() {
  const [animals, setAnimals] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  const config = {
    region: import.meta.env.VITE_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_ACCESS,
      secretAccessKey: import.meta.env.VITE_SECRET,
    },
    bucketName: import.meta.env.VITE_BUCKET_NAME,
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'animals'));
        setAnimals(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAnimals();
  }, []);

  const fetchFiles = async () => {
    const s3Client = new S3Client({ region: config.region, credentials: config.credentials });
    const command = new ListObjectsV2Command({ Bucket: config.bucketName });

    try {
      const data = await s3Client.send(command);
      const names = data.Contents.map((file) => file.Key); // Extract the file names
      setFileNames(names);
    } catch (err) {
      console.error("Error fetching file names:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const downloadFile = async (fileNames, searchTerm) => {
    const filteredFileName = searchTerm
      ? fileNames.filter(fileName => fileName.toLowerCase().includes(searchTerm.toLowerCase()))
      : fileNames;

    const s3Client = new S3Client({ region: config.region, credentials: config.credentials });
    const command = new GetObjectCommand({
      Bucket: config.bucketName,
      Key: filteredFileName,
    });

    try {
      const data = await s3Client.send(command);
      const file = new Blob([data.Body], { type: data.ContentType });
      saveAs(file, filteredFileName); // Using file-saver to download the file
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  const sortedAnimals = () => {
    let sortableItems = [...animals];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      } else if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader color="transparent" floated={false} shadow={false} className="m-0 p-4">
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">Animal Inventory</Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID", "Type", "Weight", "Auctioneer", "Confirmed", "AuctionPrice", "Selling Price", "Color", "Gender", "Arrival Date", "Invoice", ""].map((header) => (
                    <th key={header} className="border-b border-blue-gray-50 py-3 px-5 text-left" onClick={() => requestSort(header.toLowerCase())}>
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400 cursor-pointer">
                        {header}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedAnimals().map(({ id, animalType, weight, auctioneer, isConfirmed, auctionPrice, sellingPrice, color, sex, arrivalDate }, key) => (
                  <tr key={id}>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">{id}</Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">{animalType}</Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">{weight} kg</Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">{auctioneer}</Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Chip variant="gradient" color={isConfirmed === true ? "green" : "red"} value={isConfirmed} className="py-0.5 px-2 text-[11px] font-medium w-fit" />
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">{auctionPrice ? "R " + auctionPrice : " --- "}</Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">{sellingPrice ? "R " + sellingPrice : " --- "}</Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">{color}</Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">{sex}</Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">{arrivalDate ? arrivalDate.toString() : "N/A"}</Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        <button onClick={() => downloadFile(fileNames, id)}>Download</button>
                      </Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600">Edit</Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          <Typography variant="h5" color="blue-gray">Generate Animal Report</Typography>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Click on [ <a href="https://sst-test-invoice.vercel.app" className="text-gray-900 ml-1">Report Details</a> ] to view detailed animal statistics.
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;