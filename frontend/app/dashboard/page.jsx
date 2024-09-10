"use client";

import axios from "axios";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { decodeAbiParameters } from "viem";
import { useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Page = () => {
  const [attests, setAttests] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const router = useRouter();
  const { address } = useAccount();

  const decodeAttestation = async (attestation) => {
    const decodedAttests = [];

    for (const att of attestation) {
      if (!att.data) continue;

      let parsedData = {};

      try {
        const data = decodeAbiParameters(
          att.dataLocation === "onchain"
            ? att.schema.data
            : [{ type: "string" }],
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
      const response = await axios.get(
        "https://testnet-rpc.sign.global/api/index/attestations",
        {
          params: {
            mode: "onchain",
            schemaId: "onchain_evm_84532_0x22c",
            attester: "0xC15e658AC13a89E8D2E5adBBcf29D5d168554553",
            indexingValue: submitterAddress.toLowerCase(),
          },
        }
      );

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
    <html>
      <body className="bg-black">
        <nav className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <XMarkIcon className="block h-6 w-6" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" />
                  )}
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0">
                  <Link href="/" className="text-2xl font-bold">
                    Secure SignX
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                  <Link
                    href="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="#features"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Features
                  </Link>
                  <Link
                    href="#about"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <w3m-button />
              </div>
            </div>
          </div>

          <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                href="#features"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="px-5">
                <w3m-button />
              </div>
            </div>
          </div>
        </nav>

        <div className="h-screen mt-20 px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl text-center mb-6 text-white ">
            Check Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
              {" "}
              Attestations
            </span>
          </h1>

          {attests.length > 0 ? (
            <table className="mx-2 min-w-full bg-white border border-black border-black-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-2 text-left border border-black">
                    DOCUMENT Name
                  </th>
                  <th className="px-2 py-2 text-left border border-black">
                    DOCUMENT Hash
                  </th>
                  <th className="px-2 py-2 text-left border border-black">
                    IPFS_CID
                  </th>
                  <th className="px-1 py-2 text-left border border-black">
                    ATTESTOR
                  </th>
                  <th className="px-1 py-2 text-left border border-black">
                    SUBMITTER
                  </th>
                  <th className="px-2 py-2 text-left border border-black">
                    Verification Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {attests.map((att, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-2 py-2 border border-black">
                      {att.document_name}
                    </td>
                    <td className="px-2 py-2 border border-black">
                      {att.document_hash}
                    </td>
                    <td className="px-2 py-2 border border-black">
                      {att.ipfs_cid}
                    </td>
                    <td className="px-1 py-2 border border-black">
                      {att.attestor}
                    </td>
                    <td className="px-1 py-2 border border-black">
                      {att.submitter}
                    </td>
                    <td className="px-2 py-2 border border-black">
                      {att.compliance_status}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3 className="text-3xl mt-20 font-semibold text-center mb-6 text-white">
              Please click the button to check again if any documents were
              attested
            </h3>
          )}
          <div className="text-center">
            <button
              className=" mx-10 my-5 py-2 px-4 align-middle text-xl bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => queryAttestations(address)}
            >
              Check for attested docs
            </button>
            <button
              className="mx-10 my-5 py-2 px-4 bg-blue-600 text-xl text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="button"
              onClick={() => router.push("/upload")}
            >
              Upload a legal document
            </button>
          </div>
          <div className="text-white text-xl text-center mx-4 sm:mx-10 md:mx-20 lg:mx-60 my-10 sm:my-14 lg:my-20 space-y-6">
            {/* XMTP Chat App Section */}
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
              <p className="text-center sm:text-left flex-1">
                Visit the XMTP Chat app to get real-time notifications regarding
                attested documents
              </p>
              <Link
                href={"https://xmtp-chat-app.vercel.app/"}
                className="w-full sm:w-48 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
              >
                Click here for XMTP chat app
              </Link>
            </div>

            {/* Attestation Creation Section */}
            <div className="flex flex-col items-center space-y-8 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
              <p className="text-center sm:text-left flex-1">
                If you are the compliance officer, please click here for
                creating attestations
              </p>
              <button
                className="w-full sm:w-48 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                type="button"
                onClick={() => router.push("/createattestation")}
              >
                Attestation creation page
              </button>
            </div>
          </div>
        </div>
        <div>
          <footer
            id="contact"
            className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between">
              {/* Quick Links Section */}
              <div className="mb-8 lg:mb-0">
                <button
                  onClick={() => setShowQuickLinks(!showQuickLinks)}
                  className="text-lg font-semibold mb-4 focus:outline-none"
                >
                  {showQuickLinks ? "Hide Quick Links" : "Quick Links"}
                </button>
                {showQuickLinks && (
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="hover:underline">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="#features" className="hover:underline">
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link href="#about" className="hover:underline">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="#contact" className="hover:underline">
                        Contact
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Contact Us Section */}
              <div className="mb-8 lg:mb-0">
                <button
                  onClick={() => setShowContactUs(!showContactUs)}
                  className="text-lg font-semibold mb-4 focus:outline-none"
                >
                  {showContactUs ? "Hide Contact Us" : "Contact Us"}
                </button>
                {showContactUs && (
                  <div>
                    <p className="mb-2">
                      Email:{" "}
                      <a
                        href="mailto:info@signprotocol.com"
                        className="hover:underline"
                      >
                        info@signprotocol.com
                      </a>
                    </p>
                    <p>
                      Phone:{" "}
                      <a href="tel:+1234567890" className="hover:underline">
                        +1 (234) 567-890
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {/* Social Media Section */}
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                  >
                    <path d="M23 3a10.43 10.43 0 0 1-2.83.77A4.96 4.96 0 0 0 22.4 2a9.94 9.94 0 0 1-3.16 1.21A4.96 4.96 0 0 0 16.8.8a4.96 4.96 0 0 0-5 5.05c0 .4.04.8.1 1.19A14.09 14.09 0 0 1 1.67 2.85a4.97 4.97 0 0 0-.67 2.51c0 1.74.87 3.27 2.18 4.17A4.95 4.95 0 0 1 .97 8v.06a4.99 4.99 0 0 0 3.97 4.9A5.05 5.05 0 0 1 .97 13a4.99 4.99 0 0 0 4.67 3.46A9.99 9.99 0 0 1 0 20.09a14.08 14.08 0 0 0 7.68 2.24c9.24 0 14.29-7.64 14.29-14.29 0-.22-.01-.43-.02-.65A10.16 10.16 0 0 0 23 3z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                  >
                    <path d="M22.676 0H1.324C.59 0 0 .59 0 1.324v21.352C0 23.41.59 24 1.324 24h11.47V14.708h-3.2v-3.6h3.2V8.41c0-3.2 1.94-4.9 4.76-4.9 1.33 0 2.48.1 2.81.14v3.26h-1.93c-1.5 0-1.8.72-1.8 1.78v2.32h3.6l-.47 3.6h-3.13V24h6.21c.73 0 1.324-.59 1.324-1.324V1.324C24 .59 23.41 0 22.676 0z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                  >
                    <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-11 18H6v-8h2v8zm-1-9.17c-.65 0-1.18-.53-1.18-1.18s.53-1.18 1.18-1.18c.65 0 1.18.53 1.18 1.18s-.53 1.18-1.18 1.18zm13 9.17h-2v-4.5c0-1.07-.42-1.8-1.47-1.8-.8 0-1.27.54-1.48 1.06-.08.19-.1.46-.1.73v4.51h-2v-8h2v1.12c.27-.42.74-1.02 1.8-1.02 1.33 0 2.2.87 2.2 2.74v5.16h-.01z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-center mt-8 border-t border-gray-700 pt-4">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Sign Protocol. All rights
                reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Page;
