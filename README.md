https://xmtp-chat-app.vercel.app/

# Secure SignX

<h4 align="center">
  <a href="https://secure-sign-x.vercel.app/">Click here to visit Secure SignX Website</a>
</h4>

<br />

![SecureSignX](https://github.com/user-attachments/assets/2dbd2c6f-e090-473e-b572-3cf3a8df31e4)

🧪 Secure SignX is a decentralized compliance and audit trail system for managing document Attestations via Sign Protocol, with Secure communication through XMTP and streamlined interactions using a MessageKit Bot

Secure SignX involves two major components

**Sign Protocol**

Currently, the Secure SignX Attestation Schema is deployed on **Base Sepolia Testnet**

[SecureSignx Sign Protocol Schema](https://testnet-scan.sign.global/schema/onchain_evm_84532_0x22c)

Workflow:

1. The employee should connect his wallet and then needs to upload the legal Document.
2. Then the attestation to any legal document can be created only by the Compliance Officer/Auditor.
3. Then the manager can review the attested documents.


The Flash Loan Smart Contract is deployed on **Tenderly's Base Mainnet Virtual Testnet**. 

You can view the **Attestations created on Sign Protocol** from here (https://testnet-scan.sign.global/schema/onchain_evm_84532_0x22c)

The second major component here is **XMTP Protocol**

World ID is a digital identity solution that enables users to anonymize their uniqueness and humanity via zero-knowledge proofs and advanced privacy-preserving cryptography.

<br />

![worldid](https://github.com/user-attachments/assets/da499d64-c0dd-4eb2-ada1-480aa25c0ca7)

<br />

## For Testing the app 

1. Visit https://swiftyield.vercel.app/ and click on start arbitrage, verify yourself with World ID, then deploy the contract.
   
2. After the contract is deployed copy the contract address.
   
3. Clone this repo and run

```
yarn install
```

4. Then Run the bot by running this command
   
```
yarn bot 
```

You can use npm instead of yarn

You can then check the transaction here [https://dashboard.tenderly.co/explorer/vnet/753ba0a6-023a-4c8d-b3e4-60f03d6dc4b7/transactions?kind=standard]

**Note:** Some Transactions may fail because of the gas fees issue, we are optimizing the contract code

<br />

## For Setting up Dev Environment 

⚙️ This application is built using **Scaffold Eth 2**.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

To get started with Secure SignX Development, follow the steps below:

1. Install Tenderly CLI

```
curl https://raw.githubusercontent.com/Tenderly/tenderly-cli/master/scripts/install-macos.sh | sh
```

2.  Then login (create an account first)

```
tenderly login
```

3. Clone this repo & install dependencies

```
git clone https://github.com/SudeepGowda55/SwiftYield.git
cd SwiftYield
yarn install
```

4. To deploy the contract to tenderly:

Create packages/tenderly/.env

```
# https://docs.tenderly.co/account/projects/account-project-slug
TENDERLY_ACCOUNT_ID=
TENDERLY_PROJECT_ID=

# https://docs.tenderly.co/account/projects/how-to-generate-api-access-token
TENDERLY_ACCESS_TOKEN=
```

Create packages/hardhat/.env

```
ALCHEMY_API_KEY= # leave empty
# DEPLOYER_PRIVATE_KEY=
ETHERSCAN_API_KEY= # leave empty

# https://docs.tenderly.co/account/projects/account-project-slug
TENDERLY_ACCOUNT_ID=
TENDERLY_PROJECT_ID=
# https://docs.tenderly.co/account/projects/how-to-generate-api-access-token
TENDERLY_ACCESS_TOKEN=
TENDERLY_AUTOMATIC_VERIFICATIONS=true
```

Create a staging environment

Note: use different environment name (test-1) every time

```
cd packages/tenderly
yarn stage:new test-1 8453
yarn stage:activate test-1
yarn stage:connect:hardhat
yarn stage:connect:nextjs
```

Now deploy the contract by running

```
cd packages/hardhat
yarn deploy --network virtual_mainnet
```
Now the contract will be deployed

5. To start NextJS app:

```
cd packages/nextjs
yarn dev
```

Visit the app on: `http://localhost:3000`. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

6. Now to interact with the bot and perform Flash Loan Arbitrage

```
cd packages/bot
node arbitrageBot.js
```
