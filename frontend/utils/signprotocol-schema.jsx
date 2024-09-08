import { client } from "./signprotocol-client"

const createSchema = async () => {
    const res = await client.createSchema({
        name: "Decentralised compliance platform",
        data: [
            { name: "document_name", type: "string" },
            { name: "document_hash", type: "string" },
            { name: "ipfs_cid", type: "string" },
            { name: "attestor", type: "address" }, // The address of the entity (e.g., compliance officer) attesting the document. i.e the signer
            { name: "submitter", type: "address" },  // Identifies who originally submitted the document for attestation.
            { name: "compliance_status", type: "string" },  // Current compliance status of the document (e.g., "Pending," "Verified").
        ]
    })

    console.log(res)
}
