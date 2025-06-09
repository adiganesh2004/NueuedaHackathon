# Decentralized Fixed Deposit Tracker & KYC Vault

## Overview
The Decentralized Fixed Deposit Tracker and KYC Vault is a blockchain-based application that allows users to securely store their KYC documents and manage fixed deposits. The application leverages smart contracts on Ethereum or Polygon, IPFS for decentralized storage, and Chainlink for real-time price feeds.

## Features
- **Decentralized KYC Storage**: Users can upload identity documents securely, which are stored on IPFS. Access is controlled through smart contracts.
- **Fixed Deposit Management**: Users can create, track, and withdraw fixed deposits with interest calculations.
- **Real-Time INR Value Display**: The application fetches real-time conversion rates from crypto to INR using Chainlink oracles.
- **Tamper-Proof KYC**: Once uploaded, KYC records are immutable and can be reused across multiple dApps.

## Project Structure
```
fd-kyc-dapp
├── contracts
│   ├── KYCVault.sol
│   ├── FixedDeposit.sol
│   ├── PriceOracle.sol
│   └── interfaces
│       ├── IKYCVault.sol
│       └── IPriceOracle.sol
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   ├── assets
│   │   │   └── styles.css
│   │   ├── components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FixedDeposit
│   │   │   │   ├── CreateFD.jsx
│   │   │   │   ├── WithdrawFD.jsx
│   │   │   │   └── FDList.jsx
│   │   │   ├── KYC
│   │   │   │   ├── UploadKYC.jsx
│   │   │   │   ├── KYCStatus.jsx
│   │   │   │   └── ManageAccess.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── WalletConnect.jsx
│   │   ├── contexts
│   │   │   ├── Web3Context.jsx
│   │   │   └── KYCContext.jsx
│   │   ├── hooks
│   │   │   ├── useContract.js
│   │   │   ├── useIPFS.js
│   │   │   └── useOracle.js
│   │   ├── services
│   │   │   ├── ipfs.js
│   │   │   └── encryption.js
│   │   └── utils
│   │       ├── constants.js
│   │       └── helpers.js
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── scripts
│   ├── deploy.js
│   └── verify.js
├── test
│   ├── KYCVault.test.js
│   └── FixedDeposit.test.js
├── hardhat.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js and npm installed
- Hardhat for smart contract development
- IPFS for decentralized storage
- A wallet (e.g., MetaMask) for interacting with the dApp

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd fd-kyc-dapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

### Running the Application
1. Start the frontend:
   ```
   cd frontend
   npm run dev
   ```

2. Deploy the smart contracts:
   ```
   cd scripts
   node deploy.js
   ```

3. Run tests:
   ```
   npx hardhat test
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License. See the LICENSE file for details.