"use client";

import React, { useState } from "react";
import { createAttestation } from "./attestation";
import {useAccount} from "wagmi"

const Page = () => {
  const [documentName, setDocumentName] = useState("");
  const [documentHash, setDocumentHash] = useState("");
  const [ipfsCid, setIpfsCid] = useState("");
  const [submitter, setSubmitter] = useState("");
  const [complianceStatus, setComplianceStatus] = useState("");
  const [message, setMessage] = useState("");

  const complianceOfficer = "0x31c577E2875787069d3387A6dC409C89ADfA8B6B";

  const {address} = useAccount()

  const attestation = async (e) => {
    e.preventDefault();

    if (address != complianceOfficer) {
      alert("Only compliance officer can create attestation.");
      return;
    }

    try {
      await createAttestation(
        documentName,
        documentHash,
        ipfsCid,
        attestor,
        submitter,
        complianceStatus
      ); 
      alert("Attestation created successfully!");
      setMessage("Attestation created successfully!");
    } catch (error) {
      console.error("Error creating attestation:", error);
      setMessage("Failed to create attestation.");
    }
  };

  return (
    <div className=" mx-auto bg-black h-screen" style={{ width: "100vw" }}>
      <h2 className="text-4xl mt-3 font-semibold text-center mb-6 text-white">
        ATTESTATION CAN CREATED ONLY BY COMPLIANCE OFFICER
      </h2>
      <p>Compliance officer address: 0x31c577E2875787069d3387A6dC409C89ADfA8B6B</p>
      <form
        onSubmit={attestation}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6  mx-auto"
        style={{ width: "30vw" }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document Name:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document Hash:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={documentHash}
            onChange={(e) => setDocumentHash(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            IPFS CID:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={ipfsCid}
            onChange={(e) => setIpfsCid(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attestor Address:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={attestor}
            onChange={(e) => setAttestor(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Submitter Address:
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            value={submitter}
            onChange={(e) => setSubmitter(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            value={complianceStatus}
            onChange={(e) => setComplianceStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required >
            <option value="" disabled>
              Select Compliance Status
            </option>
            <option value="option1">Verified</option>
            <option value="option2">Pending</option>
            <option value="option3">Rejected</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create Attestation
        </button>
      </form>
      {message && <p>{message}</p>}
      {/* <button onClick={() => attestation()}>Create attestaion</button> */}
    </div>
  );
};

export default Page;
