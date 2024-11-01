import React, { useState, useEffect } from 'react';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { saveAs } from 'file-saver'; // Install this package

export function DownloadFile() {
    const [fileNames, setFileNames] = useState([]);

    const config = {
        region: import.meta.env.VITE_REGION,
        credentials: {
            accessKeyId: import.meta.env.VITE_ACCESS,
            secretAccessKey: import.meta.env.VITE_SECRET,
        },
        bucketName: import.meta.env.VITE_BUCKET_NAME,
    };

    // This function fetches the list of files from the S3 bucket
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

    const downloadFile = async (fileName) => {
        const s3Client = new S3Client({ region: config.region, credentials: config.credentials });
        const command = new GetObjectCommand({
            Bucket: config.bucketName,
            Key: fileName,
        });

        try {
            const data = await s3Client.send(command);
            const file = new Blob([data.Body], { type: data.ContentType });
            saveAs(file, fileName); // Using file-saver to download the file
        } catch (err) {
            console.error("Error downloading file:", err);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div>
            <h2>Download Files</h2>
            <ul>
                {fileNames.map((fileName) => (
                    <li key={fileName}>
                        <button onClick={() => downloadFile(fileName)}>
                            Download {fileName}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DownloadFile;