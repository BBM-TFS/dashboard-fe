import React, { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Card, CardHeader, CardBody, Typography, Button, Select, Option } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [folder, setFolder] = useState("invoice"); // Default folder selection

  const config = {
    region: import.meta.env.VITE_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_ACCESS,
      secretAccessKey: import.meta.env.VITE_SECRET,
    },
    bucketName: import.meta.env.VITE_BUCKET_NAME,
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    const fileName = file.name; // Automatically use the file's name
    const key = `${folder}/${fileName}`; // Construct the S3 key with the folder

    const s3Client = new S3Client({ region: config.region, credentials: config.credentials });

    const command = new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      Body: file,
    });

    try {
      const data = await s3Client.send(command);
      console.log("Success, file uploaded:", data);
      toast.success(`File uploaded successfully to the "${folder}" folder!`);
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <ToastContainer />
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-6 p-6">
          <Typography variant="h6" color="white">
            Upload Proof of Auction Payment
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Select 
            label="Select Folder" 
            onChange={(value) => setFolder(value)} 
            value={folder}
          >
            <Option value="invoice">Invoice</Option>
            <Option value="receipt">Receipt</Option>
          </Select>
          <input type="file" onChange={handleFileInput} />
          <Button
            onClick={() => uploadFile(selectedFile)}
            disabled={!selectedFile} 
            variant="gradient"
          >
            Upload File
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default Upload;
