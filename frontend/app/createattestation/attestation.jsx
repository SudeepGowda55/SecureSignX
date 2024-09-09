"use client";

import { client } from "@/utils/signprotocol-client";


export const createAttestation = async (document_name, document_hash, ipfs_cid, attestor, submitter, compliance_status) => {
    const res = await client.createAttestation({
        schemaId: "0x22c",
        data: {
            document_name,
            document_hash,
            ipfs_cid,
            attestor,
            submitter,
            compliance_status
        },
        indexingValue: attestor.toLowerCase()
    })

    return res
}
