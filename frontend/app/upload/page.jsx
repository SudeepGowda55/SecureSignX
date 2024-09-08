"use client";

// import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";
import { useState } from "react";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";

const Client = dynamic(
    () => import("@xmtp/xmtp-js"),
    {
        ssr: false
    }
)

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const JWT = process.env.NEXT_PUBLIC_JWT; // Fetch JWT from environment variables
  const address = useAccount();

  const pinFileToIPFS = async () => {
    try {
      if (!file) {
        console.error("No file selected");
        return;
      }

      const data = new FormData();
      data.append("file", file);

      const request = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: data,
        }
      );

      const response = await request.json();
      console.log(response);
      setIpfsHash(response.IpfsHash); // Store the CID

      // Call the function to send the document info via XMTP after uploading
      await submitDocInfo(response.IpfsHash);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const submitDocInfo = async (ipfsCid) => {
    try {
      const testWallet = new Wallet(process.env.NEXT_PUBLIC_TEST_KEY);
      const xmtp = await Client.create(testWallet);
      const botAddress = "0x9223a195cbaC6D5411367e7f316F900670a11d77";
      const conversation = await xmtp.conversations.newConversation(botAddress);

      const documentData = {
        document_name: file.name,
        document_hash: "HashPlaceholder", // You can compute the actual hash
        ipfs_cid: ipfsCid,
        attestor: "0xF6C3E769D1cA665C93ec15f683D8da84F79BBd19",
        submitter: address,
        compliance_status: "submitted",
        view: `https://ipfs.io/ipfs/${ipfsCid}`,
      };

      const documentMessage = `Document Submission:\nName:${documentData.document_name}\nHash:${documentData.document_hash}\nIPFS CID:${documentData.ipfs_cid}\nAttestor:${documentData.attestor}\nSubmitter:${documentData.submitter}\nStatus:${documentData.compliance_status}\n\nView Document:${documentData.view}`;

      await conversation.send(documentMessage);

      console.log("Message sent to bot: documentData");
    } catch (error) {
      console.error("Error sending document data:", error);
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
