import { client } from "@/utils/signprotocol-client";
import dynamic from "next/dynamic";

const Client = dynamic(
    () => import("@xmtp/xmtp-js"),
    {
        ssr: false
    }
)

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

export const submitAttestationInfo = async (ipfsCid) => {
    try {
        const testWallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY);
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