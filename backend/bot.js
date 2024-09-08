import { run } from "@xmtp/message-kit";

const inMemoryCache = new Map();

const complianceOfficerAddress = "0xF6C3E769D1cA665C93ec15f683D8da84F79BBd19";

const managerAddress = "0xCc213DB18f8Bc2e58855cBF4Fb322162f6958F72";

async function sendCustomerGreeting(context) {
  const greetingMessage =
    `Hello! I am the Compliance and Document Review Bot.\n\n` +
    `As a customer, you can submit your documents for compliance approval:\n\n` +
    `You will be notified once your document is approved or rejected.\n\n` +
    `You can:\n` +
    `1. Check status of your document: status <hash>`;
  await context.send(greetingMessage, context.message.sender.address);
}

async function queryDocumentStatus(context, documentHash) {
  const documentData = inMemoryCache.get(documentHash);

  if (!documentData) {
    await context.send(
      `No document found with the hash: ${documentHash}`,
      context.message.sender.address
    );
  } else {
    const statusMessage =
      `Document Status:\n\n` +
      `Document Name: ${documentData.document_name}\n` +
      `Document Hash: ${documentData.document_hash}\n` +
      `Compliance Status: ${documentData.compliance_status}\n\n` +
      `View Document: https://ipfs.infura.io/ipfs/${documentData.ipfs_cid}\n\n`;
    await context.send(statusMessage, context.message.sender.address);
  }
}

async function sendOfficerGreeting(context) {
  const greetingMessage =
    `Hello Compliance Officer!\n\nI assist you with reviewing documents for compliance approval.\n\n` +
    `You can:\n` +
    `1. Approve a document: "approve <hash>"\n` +
    `2. Reject a document: "reject <hash>"\n` +
    `3. List all pending documents for review: "list pending"`;
  await context.send(greetingMessage, context.message.sender.address);
}

async function sendManagerGreeting(context) {
  const message =
    `Welcome, Manager!\n\n` +
    `As a manager, you can use the following command to view reports:\n\n` +
    `1. View document status report: "view reports"\n\n` +
    `For more assistance, type "help".`;
  await context.send(message, context.message.sender.address);
}

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

function listPendingDocuments() {
  let pendingDocs = [];

  for (const [hash, document] of inMemoryCache.entries()) {
    if (document.compliance_status === "pending_approval") {
      pendingDocs.push(document);
    }
  }

  if (pendingDocs.length === 0) {
    return "No pending documents for review.";
  }

  let response = "Pending Documents for Review:\n\n";
  pendingDocs.forEach((doc, index) => {
    response += `${index + 1}. Document Name: ${doc.document_name}\n`;
    response += `   Document Hash: ${doc.document_hash}\n`;
    response += `   Submitter: ${doc.submitter}\n\n`;
    response += `   View Document: https://ipfs.infura.io/ipfs/${documentData.ipfs_cid}\n\n`;
  });

  response += `Reply with 'approve <hash>' or 'reject <hash>.`;

  return response;
}

async function generateReports(context) {
  let reportMessage = "Document Status Report:\n\n";
  let hasDocuments = false;

  for (const [documentHash, documentData] of inMemoryCache) {
    hasDocuments = true;
    reportMessage +=
      `Document Name: ${documentData.document_name}\n` +
      `Document Hash: ${documentHash}\n` +
      `Compliance Status: ${documentData.compliance_status}\n` +
      `Submitter: ${documentData.submitter}\n\n` +
      `View Document: https://ipfs.infura.io/ipfs/${documentData.ipfs_cid}\n\n`;
  }

  if (!hasDocuments) {
    reportMessage = "No documents have been submitted yet.";
  }

  await context.send(reportMessage, context.message.sender.address);
}

run(async (context) => {
  const { content, sender } = context.message;
  const text = content.content;
  const senderAddress = sender.address;

  if (text.toLowerCase() === "help" || text === "") {
    if (senderAddress === complianceOfficerAddress) {
      await sendOfficerGreeting(context);
    } else if (senderAddress === managerAddress) {
      await sendManagerGreeting(context);
    } else {
      await sendCustomerGreeting(context);
    }
    return;
  }

  if (text.includes("Document Submission:")) {
    const documentData = parseDocumentMessage(text);
    inMemoryCache.set(documentData.document_hash, {
      ...documentData,
      compliance_status: "pending_approval",
    });

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

      await context.sendTo(
        `Document Review Report:\n\n` +
          `Document Name: ${documentData.document_name}\n` +
          `Document Hash: ${documentData.document_hash}\n` +
          `Attestor: ${documentData.attestor}\n` +
          `Submitter: ${documentData.submitter}\n` +
          `Compliance Status: ${newStatus}\n\n` +
          `View Document: https://ipfs.infura.io/ipfs/${documentData.ipfs_cid}\n\n` +
          `The document has been ${newStatus} by the compliance officer. The action was recorded and the respective parties have been notified.`,
        [managerAddress]
      );

      await context.sendTo(
        `You have successfully ${newStatus} the document "${documentData.document_name}".`,
        [senderAddress]
      );
    } else {
      await context.send("You are not authorized to make this decision.");
    }
  } else if (text.toLowerCase() === "list pending") {
    if (senderAddress === complianceOfficerAddress) {
      const pendingList = listPendingDocuments();
      await context.send(pendingList, senderAddress);
    } else {
      await context.send(
        "You are not authorized to view the pending documents."
      );
    }
  } else if (text.toLowerCase() === "view reports") {
    if (senderAddress === managerAddress) {
      await generateReports(context);
    } else {
      await context.send(
        "You are not authorized to view reports.",
        senderAddress
      );
    }
  } else if (text.toLowerCase().startsWith("status ")) {
    const parts = text.split(" ");
    const documentHash = parts[1];

    await queryDocumentStatus(context, documentHash);
  } else {
    if (senderAddress === complianceOfficerAddress) {
      await context.send(
        `Invalid command. As a compliance officer, you can use the following commands:\n\n` +
          `1. Accept a document: "accept <hash>"\n` +
          `2. Reject a document: "reject <hash>"\n` +
          `3. List pending documents: "list pending"\n` +
          `For more help, type "help".`,
        senderAddress
      );
    } else if (senderAddress === managerAddress) {
      await context.send(
        `Invalid command. As a manager, you can use the following command:\n\n` +
          `1. View document status report: "view reports"\n\n` +
          `For more help, type "help".`,
        senderAddress
      );
    } else {
      await context.send(
        `Invalid command. As a customer, you can submit a document:\n\n` +
          `For more help, type "help".`,
        senderAddress
      );
    }
  }
});
