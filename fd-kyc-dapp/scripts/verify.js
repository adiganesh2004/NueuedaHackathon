const { ethers, run, network } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("Verifying contracts with the account:", deployer.address);

    const contracts = [
        { name: "KYCVault", address: "YOUR_KYCVAULT_CONTRACT_ADDRESS" },
        { name: "FixedDeposit", address: "YOUR_FIXEDDEPOSIT_CONTRACT_ADDRESS" },
        { name: "PriceOracle", address: "YOUR_PRICEORACLE_CONTRACT_ADDRESS" },
    ];

    for (const contract of contracts) {
        console.log(`Verifying ${contract.name}...`);
        await run("verify:verify", {
            address: contract.address,
            constructorArguments: [],
        });
    }

    console.log("All contracts verified successfully!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });