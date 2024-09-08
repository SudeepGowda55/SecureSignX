"use client"

// import { Web3Auth } from "@web3auth/modal";
// import { useEffect, useState } from "react";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";

// import RPC from 
import Head from "next/head";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Link from "next/link";
export default function Home() {
  return (
    <html lang="en">
    <body>
      <Navbar />
      <main
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center text-center"
      style={{ 
        backgroundImage: 'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp2533117.png&f=1&nofb=1&ipt=b5e418c6fb536e247f10e66a28b11e7431b3eacb38df4ae10db0342d418d7843&ipo=images)' 
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative max-w-7xl mx-auto p-6">
        <h1 className="text-8xl font-extrabold text-white mb-12">
          Welcome to Sign Protocol
        </h1>
        <p className="text-xl text-white mb-8">
          We offer cutting-edge solutions to ensure secure and efficient communication for all your needs. Now make attestations and verifications easy by utilizing our platform.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Add any additional content or buttons here */}
        </div>
        <div className="mt-12">
          {/* Secondary Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Make document verifications faster and easier
          </h2>
          
          {/* Sign In Button */}
          <Link
            href="/sign-in"
            className="bg-blue-500 text-white px-6 py-3 m-10 rounded-md shadow-md hover:bg-blue-600 transition duration-300 inline-block"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
    <section id ="features" className="flex items-center justify-center min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-8xl font-extrabold mb-10">
          Why Choose Us?
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl mb-12">
          Discover the benefits of using our platform for fast and efficient document verification.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800 p-10 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold mb-4">Fast Processing</h3>
            <p>
              Our platform ensures quick document verification with minimal wait times, allowing you to get your results faster.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-800 p-10 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold mb-4">Secure and Reliable</h3>
            <p>
              We prioritize security, using advanced encryption to keep your data safe and private throughout the verification process.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-800 p-10 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold mb-4">User-Friendly Interface</h3>
            <p>
              Our intuitive interface makes it easy for you to upload documents and track their verification status without hassle.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="about" className="bg-gray-800 text-white min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-10">
      About Us
    </h2>
    <p className="text-xl sm:text-lg lg:text-xl mb-20">
      At Sign Protocol, we are dedicated to revolutionizing document verification. Our mission is to streamline the verification process, ensuring that it is both fast and secure. We believe that document verification should be seamless, reliable, and easily accessible.
    </p>
    <div className="flex flex-col lg:flex-row lg:justify-center lg:space-x-12">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg mb-8 lg:mb-0 lg:w-1/3">
        <h3 className="text-xl font-semibold mb-6">Our Mission</h3>
        <p className="text-lg">
          We are committed to providing a platform that simplifies the process of verifying documents. By leveraging advanced technologies and prioritizing user experience, we aim to make document verification as efficient and secure as possible.
        </p>
      </div>
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg mb-8 lg:mb-0 lg:w-1/3">
        <h3 className="text-3xl font-semibold mb-6">Our Values</h3>
        <p className="text-lg">
          Integrity, security, and user-centric design are the core values that drive us. We are dedicated to maintaining the highest standards of privacy and reliability, ensuring that your documents are handled with utmost care and professionalism.
        </p>
      </div>
    </div>
    <div className="mt-20">
      <p className="text-xl sm:text-lg lg:text-xl m-10">
        Discover why users are choosing our platform for their document verification needs. We invite you to explore our innovative services and experience firsthand how we make the verification process faster and more efficient.
      </p>
    </div>
  </div>
</section>
<Footer />
    </body>
  </html>
  );
}
