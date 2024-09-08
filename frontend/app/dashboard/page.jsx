"use client";

import axios from 'axios';
import React, { useState } from 'react';
import { useAccount } from "wagmi"
import { decodeAbiParameters } from 'viem';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const Page = () => {
    const [attests, setAttests] = useState([]);
    const router = useRouter();
    const { address } = useAccount();

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
            } else {
                alert("No attested docs found.");
            }
        } catch (error) {
            console.error("Error fetching attestations:", error);
        }
    };

    return (
        <div className=" mx-auto bg-black h-screen" style={{ width: "100vw" }}>
            <h1 className="text-4xl mt-3 font-semibold text-center mb-6 text-white">Check Your Attestations</h1>

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
                    No Document Attested yet, but please click the button to check it again
                </h3>
            }
            <button className=" mx-10 my-5 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => queryAttestations(address)}>
                Check for attested docs
            </button>
            <button className='mx-10 my-5 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                type="button" onClick={() => router.push('/upload')}>
                Upload a legal document
            </button>
            <div className='text-white left-3 relative m-10 flex flex-col space-y-10'>
                <p>Visit the XMTP Chat app to get real time notification regarding attested documents</p>
                <div>
                    <Link href={"https://xmtp-chat-app.vercel.app/"} className='text-white mx-10 my-5 py-2 px-4 bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                        click here for xmtp chat app
                    </Link>
                </div>
            </div>
            <div className='text-white left-3 relative m-10 flex flex-col space-y-10'>
                <p>If you are the compliance officer please click here for creating attestations</p>
                <button className='m-10 w-[10%] py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    type="button" onClick={() => router.push('/createattestation')}>
                    Attestation creation page
                </button>
            </div>
        </div >
    )
}

export default Page;
