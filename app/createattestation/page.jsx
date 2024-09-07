"use client"

import React, { useState } from 'react';
import { createAttestation } from './attestation';

const Page = () => {

  const [documentName, setDocumentName] = useState('');
  const [documentHash, setDocumentHash] = useState('');
  const [ipfsCid, setIpfsCid] = useState('');
  const [attestor, setAttestor] = useState('');
  const [submitter, setSubmitter] = useState('');
  const [complianceStatus, setComplianceStatus] = useState('');

  const [message, setMessage] = useState('');

  const attestation = async (e) => {
    e.preventDefault();

    try {
      await createAttestation(documentName, documentHash, ipfsCid, attestor, submitter, complianceStatus); // 0xC15e658AC13a89E8D2E5adBBcf29D5d168554553
      alert("Attestation created successfully!")
      setMessage('Attestation created successfully!');
    } catch (error) {
      console.error('Error creating attestation:', error);
      setMessage('Failed to create attestation.');
    }
  };

  return (
    <div>
      <div>
        <p>Create attestaion</p>
        <form onSubmit={attestation}>
          <div>
            <label>Document Name:</label>
            <input className='border border-black' type="text" value={documentName} onChange={(e) => setDocumentName(e.target.value)} required />
          </div>
          <div>
            <label>Document Hash:</label>
            <input className='border border-black' type="text" value={documentHash} onChange={(e) => setDocumentHash(e.target.value)} required />
          </div>
          <div>
            <label>IPFS CID:</label>
            <input className='border border-black' type="text" value={ipfsCid} onChange={(e) => setIpfsCid(e.target.value)} required />
          </div>
          <div>
            <label>Attestor Address:</label>
            <input className='border border-black' type="text" value={attestor} onChange={(e) => setAttestor(e.target.value)} required />
          </div>
          <div>
            <label>Submitter Address:</label>
            <input className='border border-black' type="text" value={submitter} onChange={(e) => setSubmitter(e.target.value)} required />
          </div>
          <div>
            <label>Compliance Status:</label>
            <input className='border border-black' type="text" value={complianceStatus} onChange={(e) => setComplianceStatus(e.target.value)} required />
          </div>

          <button type="submit">Create Attestation</button>
        </form>
        {/* {message && <p>{message}</p>} */}
        {/* <button onClick={() => attestation()}>Create attestaion</button> */}
      </div>
    </div>
  )
}

export default Page