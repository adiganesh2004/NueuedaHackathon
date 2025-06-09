// filepath: /fd-kyc-dapp/fd-kyc-dapp/scripts/deploy.js
const hre = require("hardhat");

async function main() {
    // Deploy KYC Vault contract
    const KYCContract = await hre.ethers.getContractFactory("KYCVault");
    const kycVault = await KYCContract.deploy();
    await kycVault.deployed();
    console.log("KYC Vault deployed to:", kycVault.address);

    // Deploy Fixed Deposit contract
    const FDContract = await hre.ethers.getContractFactory("FixedDeposit");
    const fixedDeposit = await FDContract.deploy();
    await fixedDeposit.deployed();
    console.log("Fixed Deposit deployed to:", fixedDeposit.address);

    // Deploy Price Oracle contract
    const PriceOracleContract = await hre.ethers.getContractFactory("PriceOracle");
    const priceOracle = await PriceOracleContract.deploy();
    await priceOracle.deployed();
    console.log("Price Oracle deployed to:", priceOracle.address);
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });