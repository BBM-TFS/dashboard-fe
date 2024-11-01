import React, { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast

export function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(''); // State for custom file name

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
    if (!fileName) {
      toast.error("Please enter a file name before uploading."); // Show error if no file name
      return;
    }

    const s3Client = new S3Client({ region: config.region, credentials: config.credentials });

    const command = new PutObjectCommand({
      Bucket: config.bucketName,
      Key: fileName, // Use the custom file name
      Body: file,
    });

    try {
      const data = await s3Client.send(command);
      console.log("Success, file uploaded:", data);
      toast.success("File uploaded successfully!"); // Show success toast
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error("Error uploading file. Please try again."); // Show error toast
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <ToastContainer /> {/* Container for toasts */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-6 p-6">
          <Typography variant="h6" color="white">
            Upload Proof of auction payment - Invoice
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <input type="file" onChange={handleFileInput} />
          <input 
            type="text" 
            placeholder="Enter file name" // Placeholder for file name input
            value={fileName} 
            onChange={(e) => setFileName(e.target.value)} 
            className="border p-2"
          />
          <Button
            onClick={() => uploadFile(selectedFile)}
            disabled={!selectedFile} // Disable button if no file is selected
            variant="gradient"
          >
            Upload Invoice 
          </Button>
        </CardBody>
      </Card>
      </div>
  );
}

export default Upload;