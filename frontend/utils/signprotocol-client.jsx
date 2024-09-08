import { privateKeyToAccount } from "viem/accounts"
import { SignProtocolClient, EvmChains, SpMode } from "@ethsign/sp-sdk"

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY

export const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.baseSepolia,
    account: privateKeyToAccount(privateKey)
})
