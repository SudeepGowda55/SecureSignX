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
        <div>
            <h1>Get attestations</h1>
            <button onClick={() => queryAttestations("0xC15e658AC13a89E8D2E5adBBcf29D5d168554553")}>
                Get attestations
            </button>
            {attests.length > 0 && (
                <ul>
                    {attests.map((att, index) => (
                        <li key={index}>
                            {JSON.stringify(att)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Page;
