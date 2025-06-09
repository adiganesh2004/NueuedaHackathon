import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import KYCVault from '../../contracts/KYCVault.json';
import FixedDeposit from '../../contracts/FixedDeposit.json';
import PriceOracle from '../../contracts/PriceOracle.json';

const useContract = (contractName, signer) => {
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const loadContract = async () => {
            let contractAddress;
            switch (contractName) {
                case 'KYCVault':
                    contractAddress = process.env.REACT_APP_KYC_VAULT_ADDRESS;
                    setContract(new ethers.Contract(contractAddress, KYCVault.abi, signer));
                    break;
                case 'FixedDeposit':
                    contractAddress = process.env.REACT_APP_FIXED_DEPOSIT_ADDRESS;
                    setContract(new ethers.Contract(contractAddress, FixedDeposit.abi, signer));
                    break;
                case 'PriceOracle':
                    contractAddress = process.env.REACT_APP_PRICE_ORACLE_ADDRESS;
                    setContract(new ethers.Contract(contractAddress, PriceOracle.abi, signer));
                    break;
                default:
                    console.error('Invalid contract name');
            }
        };

        if (signer) {
            loadContract();
        }
    }, [contractName, signer]);

    return contract;
};

export default useContract;