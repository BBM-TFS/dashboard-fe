// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export function Notifications() {
  const [animals, setAnimals] = useState([]);

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

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader color="transparent" floated={false} shadow={false} className="m-0 p-4">
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Animal Inventory
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID", "Type", "Weight", "Age", "Confirmed", "AuctionPrice","Selling Price", "Color", "Gender", "Arrival Date",""].map((header) => (
                    <th key={header} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {header}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {animals.map(({ id, animalType, weight, age, isConfirmed, auctionPrice, sellingPrice, color, sex, arrivalDate }, key) => (
                  <tr key={id}>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {id}
                      </Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {animalType}
                      </Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {weight} kg
                      </Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {age} years
                      </Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Chip variant="gradient" color={isConfirmed === true ? "green" : "red"} value={isConfirmed} className="py-0.5 px-2 text-[11px] font-medium w-fit" />
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {auctionPrice? "R " +auctionPrice : " --- "} 
                      </Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {sellingPrice? "R " +sellingPrice : " --- "} 
                      </Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {color} 
                      </Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {sex} 
                      </Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {arrivalDate? arrivalDate.toString() : "N/A"} 
                      </Typography>
                    </td>
                    <td className={`py-3 px-5 ${key === animals.length - 1 ? "" : "border-b border-blue-gray-50"}`}>
                      <Typography as="a" href="#" className="text-xs font-semibold text-blue-gray-600">
                        Edit
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
          <Typography variant="h5" color="blue-gray">
            Generate Animal Report
          </Typography>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Click on [ <a href="https://sst-test-invoice.vercel.app" className="text-gray-900 ml-1">Report Details</a> ] to view detailed animal statistics.
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;
