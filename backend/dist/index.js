import { run } from "@xmtp/message-kit";

// to store doc data
const inMemoryCache = new Map();

function parseDocumentMessage(text) {
  const lines = text.split("\n");
  return {
    document_name: lines[1].split(":")[1].trim(),
    document_hash: lines[2].split(":")[1].trim(),
    ipfs_cid: lines[3].split(":")[1].trim(),
    attestor: lines[4].split(":")[1].trim(),
    submitter: lines[5].split(":")[1].trim(),
    compliance_status: lines[6].split(":")[1].trim(),
  };
}

run(async (context) => {
  const { content, sender } = context.message;
  const text = content.content;
  const senderAddress = sender.address;

  if (text.includes("Document Submission:")) {
    const documentData = parseDocumentMessage(text);
    inMemoryCache.set(documentData.document_hash, {
      ...documentData,
      compliance_status: "pending_approval",
    });

    const complianceOfficerAddress =
      "0xF6C3E769D1cA665C93ec15f683D8da84F79BBd19";
    await context.sendTo(
      `New document requires approval:\n\n${text}\n\nReply with 'approve ${documentData.document_hash}' or 'reject ${documentData.document_hash}'.`,
      [complianceOfficerAddress]
    );

    await context.send(
      `Your document "${documentData.document_name}" has been submitted for approval. You will be notified once it's processed.`
    );
  } else if (
    text.toLowerCase().includes("approve") ||
    text.toLowerCase().includes("reject")
  ) {
    const complianceOfficerAddress =
      "0xF6C3E769D1cA665C93ec15f683D8da84F79BBd19";
    const parts = text.split(" ");
    const command = parts[0].toLowerCase();
    const documentHash = parts[1];

    if (senderAddress === complianceOfficerAddress) {
      const documentData = inMemoryCache.get(documentHash);

      if (!documentData) {
        await context.send("No pending document found for review.");
        return;
      }

      if (documentData.compliance_status !== "pending_approval") {
        await context.send(
          `The document "${documentData.document_name}" has already been ${documentData.compliance_status}.`
        );
        return;
      }

      const newStatus = command === "approve" ? "approved" : "rejected";
      documentData.compliance_status = newStatus;
      inMemoryCache.set(documentHash, documentData);

      await context.sendTo(
        `Your document "${documentData.document_name}" has been ${newStatus}.`,
        [documentData.submitter]
      );

      // const managerAddress = "0xmanagerAddress";
      // await context.sendTo(
      //   `Document Review Report:\n\n` +
      //   `Document Name: ${documentData.document_name}\n` +
      //   `Document Hash: ${documentData.document_hash}\n` +
      //   `IPFS CID: ${documentData.ipfs_cid}\n` +
      //   `Attestor: ${documentData.attestor}\n` +
      //   `Submitter: ${documentData.submitter}\n` +
      //   `Compliance Status: ${newStatus}\n\n` +
      //   `The document has been ${newStatus} by the compliance officer. The action was recorded and the respective parties have been notified.`,
      //   [managerAddress]
      // );

      await context.sendTo(
        `You have successfully ${newStatus} the document "${documentData.document_name}".`,
        [senderAddress]
      );
    } else {
      await context.send("You are not authorized to make this decision.");
    }
  } else {
    await context.send(
      "Invalid input. Please submit a document or provide a valid response."
    );
  }
});
