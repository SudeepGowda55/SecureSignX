import React from 'react'
import { client } from '@/utils/signprotocol'

const Page = () => {

  const createAttestation = async (contractDetails, signer) => {
    const res = await client.createAttestation({
      schemaId: "0x1df",
      data: {
        contractDetails,
        signer
      },
      indexingValue: signer.toLowerCase()
    })
    console.log(res)
  }

  createAttestation("0x123", "0xC15e658AC13a89E8D2E5adBBcf29D5d168554553")

  return (
    <div>
      <div>

      </div>
    </div>
  )
}

export default Page