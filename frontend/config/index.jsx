import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { base, baseSepolia, mainnet, polygon, sepolia } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

const metadata = {
    name: 'SecureSignX',
    description: 'Decentralized Compliance and Attestation Platform',
    url: 'https://secure-sign-x.vercel.app/',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, sepolia, baseSepolia, base, polygon]

export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    })
    // ...wagmiOptions
})