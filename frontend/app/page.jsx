"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useAccount } from "wagmi";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Home() {

  const { isConnected } = useAccount();

  const [isOpen, setIsOpen] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);

  return (
    <html>
      <body>
        <Head>
          <title>SecureSignX</title>
          <meta name="description" content="Welcome to SecureSignX" />
        </Head>
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
        <main
          className="relative flex items-center justify-center min-h-screen bg-cover bg-center text-center"
          style={{
            backgroundImage:
              "url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2533117.png&f=1&nofb=1&ipt=b5e418c6fb536e247f10e66a28b11e7431b3eacb38df4ae10db0342d418d7843&ipo=images)",
          }}
        >
          <div className="relative max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-6xl font-extrabold text-white mb-12">
              Welcome to Secure SignX
            </h1>
            <p className="text-xl text-white mb-8">
              A decentralized compliance and audit trail system for managing document Attestations via Sign Protocol, with Secure communication through XMTP and streamlined interactions using a MessageKit Bot
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {/* Add any additional content or buttons here */}
            </div>
            <div className="mt-12 flex flex-col items-center justify-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
                Make document verifications Faster and Effective
              </h2>
              <div className="mt-10">
                {isConnected ? (
                  <Link
                    href="/dashboard"
                    className="bg-blue-500 text-white px-6 py-3 m-10 rounded-md shadow-md hover:bg-blue-600 transition duration-300 inline-block"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <w3m-button />
                )}
              </div>
            </div>
          </div>
        </main>
        <section
          id="features"
          className="flex items-center justify-center min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-2xl lg:text-6xl font-extrabold mb-10">
              Why Choose Decentralised Attestation?
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl mb-12">
              Discover the benefits of using a Decentralised platform for fast
              and efficient document verification.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-800 m-10 p-10 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Decentralized Data Management with Tableland
                </h3>
                <p>
                  Tableland ensures your data is securely decentralized,
                  protecting it from tampering and unauthorized access while
                  offering SQL-like querying. This results in enhanced security,
                  reliable performance, and scalable data management.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-gray-800 m-10 p-10 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Fast and Secure Document Verification with Sign Protocol
                </h3>
                <p>
                  Sign Protocol leverages blockchain technology to provide fast
                  and immutable document verification. This ensures the
                  authenticity of documents with rapid processing and seamless
                  integration into your workflow.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-gray-800 m-10 p-10 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Private and Interoperable Messaging with XMTP
                </h3>
                <p>
                  XMTP enables private, encrypted, and decentralized messaging
                  within our platform. It ensures your communications are
                  confidential and seamlessly interoperable across different
                  decentralized applications and networks.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="bg-gray-800 text-white min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-10">
              About Us
            </h2>
            <p className="text-xl sm:text-lg lg:text-xl mb-20">
              At Secure SignX, we are dedicated to revolutionizing document
              verification. Our mission is to streamline the verification
              process, ensuring that it is both fast and secure. We believe that
              document verification should be seamless, reliable, and easily
              accessible.
            </p>
            <div className="flex flex-col lg:flex-row lg:justify-center lg:space-x-12">
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg mb-8 lg:mb-0 lg:w-1/3">
                <h3 className="text-xl font-semibold mb-6">Our Mission</h3>
                <p className="text-lg">
                  We are committed to providing a platform that simplifies the
                  process of verifying documents. By leveraging advanced
                  technologies and prioritizing user experience, we aim to make
                  document verification as efficient and secure as possible.
                </p>
              </div>
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg mb-8 lg:mb-0 lg:w-1/3">
                <h3 className="text-3xl font-semibold mb-6">Our Values</h3>
                <p className="text-lg">
                  Integrity, security, and user-centric design are the core
                  values that drive us. We are dedicated to maintaining the
                  highest standards of privacy and reliability, ensuring that
                  your documents are handled with utmost care and
                  professionalism.
                </p>
              </div>
            </div>
            <div className="mt-20">
              <p className="text-xl sm:text-lg lg:text-xl m-10">
                Discover why users are choosing our platform for their document
                verification needs. We invite you to explore our innovative
                services and experience firsthand how we make the verification
                process faster and more efficient.
              </p>
            </div>
          </div>
        </section>
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
      </body>
    </html>
  );
}
