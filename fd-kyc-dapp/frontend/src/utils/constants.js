export const API_URL = "https://api.example.com"; // Replace with your actual API URL
export const IPFS_URL = "https://ipfs.infura.io/ipfs/"; // IPFS gateway URL
export const CHAINLINK_ORACLE_ADDRESS = "0xYourChainlinkOracleAddress"; // Replace with your Chainlink Oracle address
export const KYC_VAULT_ADDRESS = "0xYourKYCVaultAddress"; // Replace with your KYC Vault contract address
export const FIXED_DEPOSIT_ADDRESS = "0xYourFixedDepositAddress"; // Replace with your Fixed Deposit contract address

export const SUPPORTED_CURRENCIES = ["INR", "USD", "EUR"]; // Supported currencies for deposits
export const DEFAULT_INTEREST_RATE = 5; // Default interest rate for fixed deposits
export const MIN_DEPOSIT_AMOUNT = 1000; // Minimum deposit amount in INR
export const MAX_DEPOSIT_DURATION = 60; // Maximum deposit duration in months

export const ERROR_MESSAGES = {
    INVALID_AMOUNT: "Please enter a valid deposit amount.",
    INVALID_DURATION: "Please enter a valid duration in months.",
    KYC_NOT_UPLOADED: "Please upload your KYC documents before creating a fixed deposit.",
};