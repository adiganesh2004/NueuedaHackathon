import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import PriceOracle from '../contracts/PriceOracle.json'; // Adjust the path as necessary

const useOracle = () => {
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(process.env.REACT_APP_PRICE_ORACLE_ADDRESS, PriceOracle.abi, provider);
                const fetchedPrice = await contract.getLatestPrice(); // Assuming getLatestPrice is a function in your PriceOracle contract
                setPrice(ethers.utils.formatUnits(fetchedPrice, 'ether')); // Adjust based on your contract's return value
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrice();
    }, []);

    return { price, loading, error };
};

export default useOracle;