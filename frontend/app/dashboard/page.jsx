"use client";

import axios from 'axios';
import React, { useState } from 'react';
import { decodeAbiParameters } from 'viem';

const Page = () => {
    const [attests, setAttests] = useState([]);

    const decodeAttestation = async (attestation) => {
        const decodedAttests = [];

        for (const att of attestation) {
            if (!att.data) continue;

            let parsedData = {};

            try {
                const data = decodeAbiParameters(
                    att.dataLocation === "onchain" ? att.schema.data : [{ type: "string" }],
                    att.data
                );

                const obj = {};

                data.forEach((item, i) => {
                    obj[att.schema.data[i].name] = item;
                });

                parsedData = obj;
                decodedAttests.push(parsedData);
            } catch (error) {
                console.error("Decoding error:", error);
                continue;
            }
        }

        return decodedAttests.length > 0 ? decodedAttests : undefined;
    };

    const queryAttestations = async (submitterAddress) => {
        try {
            const response = await axios.get("https://testnet-rpc.sign.global/api/index/attestations", {
                params: {
                    mode: "onchain",
                    schemaId: "onchain_evm_84532_0x22c",
                    attester: "0xC15e658AC13a89E8D2E5adBBcf29D5d168554553",
                    indexingValue: submitterAddress.toLowerCase(),
                }
            });

            const decoded = await decodeAttestation(response.data.data?.rows);
            if (decoded) {
                setAttests(decoded);
                console.log(decoded);
            } else {
                console.log("No attestations found.");
            }
        } catch (error) {
            console.error("Error fetching attestations:", error);
        }
    };

    return (
        <div className=" mx-auto bg-black h-screen" style={{ width: "100vw" }}>
            <h1 className="text-4xl mt-3 font-semibold text-center mb-6 text-white">GET ATTESTATIONS</h1>
            
            {attests.length > 0 ? (
                <table className="mx-2 min-w-full bg-white border border-black border-black-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-2 py-2 text-left border border-black">DOCUMENT Name</th>
                        <th className="px-2 py-2 text-left border border-black">DOCUMENT Hash</th>
                        <th className="px-2 py-2 text-left border border-black">IPFS_CID</th>
                        <th className="px-1 py-2 text-left border border-black">ATTESTOR</th>
                        <th className="px-1 py-2 text-left border border-black">SUBMITTER</th>
                        <th className="px-2 py-2 text-left border border-black">Verification Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attests.map((att, index) => (
                        <tr key={index} className="border-t">
                            <td className="px-2 py-2 border border-black">{att.document_name}</td>
                            <td className="px-2 py-2 border border-black">{att.document_hash}</td>
                            <td className="px-2 py-2 border border-black">{att.ipfs_cid}</td>
                            <td className="px-1 py-2 border border-black">{att.attestor}</td>
                            <td className="px-1 py-2 border border-black">{att.submitter}</td>
                            <td className="px-2 py-2 border border-black">{att.compliance_status} </td>
                        </tr>
                    ))}
                </tbody>
            </table>) : 
            <h3 className="text-3xl mt-3 font-semibold text-center mb-6 text-white">
                No Document Found
            </h3>
            }
            <button className=" mx-10 my-5 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
             onClick={() => queryAttestations("0xC15e658AC13a89E8D2E5adBBcf29D5d168554553")}>
                Get attestations
            </button>
        </div>
    )
}

export default Page;
