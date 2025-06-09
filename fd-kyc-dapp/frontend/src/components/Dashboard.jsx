import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../contexts/Web3Context';
import { KYCContext } from '../contexts/KYCContext';
import FDList from './FixedDeposit/FDList';
import KYCStatus from './KYC/KYCStatus';

const Dashboard = () => {
    const { account } = useContext(Web3Context);
    const { kycStatus } = useContext(KYCContext);
    const [fixedDeposits, setFixedDeposits] = useState([]);

    useEffect(() => {
        // Fetch user's fixed deposits from the blockchain
        const fetchFixedDeposits = async () => {
            // Logic to fetch fixed deposits based on the user's account
            // This is a placeholder for the actual implementation
            const deposits = await getFixedDeposits(account);
            setFixedDeposits(deposits);
        };

        if (account) {
            fetchFixedDeposits();
        }
    }, [account]);

    return (
        <div className="dashboard">
            <h1>Welcome to Your Dashboard</h1>
            <KYCStatus status={kycStatus} />
            <h2>Your Fixed Deposits</h2>
            <FDList deposits={fixedDeposits} />
        </div>
    );
};

export default Dashboard;