import React, { useState, useEffect } from 'react';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { saveAs } from 'file-saver';

export function DownloadFile() {
    const [invoices, setInvoices] = useState([]);
    const [receipts, setReceipts] = useState([]);

    const config = {
        region: import.meta.env.VITE_REGION,
        credentials: {
            accessKeyId: import.meta.env.VITE_ACCESS,
            secretAccessKey: import.meta.env.VITE_SECRET,
        },
        bucketName: import.meta.env.VITE_BUCKET_NAME,
    };

    // Fetch files and categorize them
    const fetchFiles = async () => {
        const s3Client = new S3Client({ region: config.region, credentials: config.credentials });
        const command = new ListObjectsV2Command({ Bucket: config.bucketName });

        try {
            const data = await s3Client.send(command);
            const files = data.Contents.map((file) => file.Key);

            const invoiceFiles = files.filter((file) => file.startsWith("invoice/"));
            const receiptFiles = files.filter((file) => file.startsWith("receipt/"));

            setInvoices(invoiceFiles);
            setReceipts(receiptFiles);
        } catch (err) {
            console.error("Error fetching file names:", err);
        }
    };

    // Download a file
    const downloadFile = async (fileName) => {
        const s3Client = new S3Client({ region: config.region, credentials: config.credentials });
        const command = new GetObjectCommand({
            Bucket: config.bucketName,
            Key: fileName,
        });

        try {
            const data = await s3Client.send(command);

            const streamToBlob = async (stream, contentType) => {
                const chunks = [];
                const reader = stream.getReader();

                let done = false;
                while (!done) {
                    const { value, done: isDone } = await reader.read();
                    if (value) chunks.push(value);
                    done = isDone;
                }

                return new Blob(chunks, { type: contentType });
            };

            const blob = await streamToBlob(data.Body, data.ContentType);
            const fileNameOnly = fileName.split("/").pop();
            saveAs(blob, fileNameOnly);
        } catch (err) {
            console.error("Error downloading file:", err);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Download Files</h2>

            {/* Invoice Folder */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold bg-gray-200 p-3 rounded-md shadow-md mb-2">
                    🗂️ Invoices
                </h3>
                <div className="flex flex-wrap gap-4">
                    {invoices.map((fileName) => (
                        <div
                            key={fileName}
                            className="bg-blue-100 p-4 rounded-md shadow-md flex flex-col items-center w-48"
                        >
                            <p className="truncate mb-2">{fileName.split("/").pop()}</p>
                            <button
                                onClick={() => downloadFile(fileName)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Receipt Folder */}
            <div>
                <h3 className="text-lg font-semibold bg-gray-200 p-3 rounded-md shadow-md mb-2">
                    🗂️ Receipts
                </h3>
                <div className="flex flex-wrap gap-4">
                    {receipts.map((fileName) => (
                        <div
                            key={fileName}
                            className="bg-green-100 p-4 rounded-md shadow-md flex flex-col items-center w-48"
                        >
                            <p className="truncate mb-2">{fileName.split("/").pop()}</p>
                            <button
                                onClick={() => downloadFile(fileName)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DownloadFile;
