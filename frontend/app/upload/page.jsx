"use client"
import { useState } from "react";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const JWT = process.env.NEXT_PUBLIC_JWT; // Fetch JWT from environment variables

  const pinFileToIPFS = async () => {
    try {
      if (!file) {
        console.error("No file selected");
        return;
      }

      const data = new FormData();
      data.append("file", file);

      const request = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: data,
      });

      const response = await request.json();
      setIpfsHash(response.IpfsHash); // Store the CID
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update the file state when a file is selected
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    await pinFileToIPFS();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload File to Pinata (IPFS)</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleFileUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload to IPFS
      </button>

      {ipfsHash && (
        <div className="mt-4">
          <p>File uploaded successfully!</p>
          <p>CID: {ipfsHash}</p>
          <a
            href={`https://beige-definite-wildcat-182.mypinata.cloud/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View File on IPFS
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
