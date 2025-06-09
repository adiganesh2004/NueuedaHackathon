import React, { useEffect, useState, useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import { KYCContext } from '../../contexts/KYCContext';
import { getFixedDeposits } from '../../services/ipfs';

const FDList = () => {
    const { account } = useContext(Web3Context);
    const { kycData } = useContext(KYCContext);
    const [fixedDeposits, setFixedDeposits] = useState([]);

    useEffect(() => {
        const fetchFixedDeposits = async () => {
            if (account && kycData) {
                const deposits = await getFixedDeposits(account);
                setFixedDeposits(deposits);
            }
        };

        fetchFixedDeposits();
    }, [account, kycData]);

    return (
        <div>
            <h2>Your Fixed Deposits</h2>
            {fixedDeposits.length === 0 ? (
                <p>No fixed deposits found.</p>
            ) : (
                <ul>
                    {fixedDeposits.map((fd, index) => (
                        <li key={index}>
                            <p>Amount: {fd.amount}</p>
                            <p>Duration: {fd.duration} months</p>
                            <p>Interest Rate: {fd.interestRate}%</p>
                            <p>Maturity Date: {fd.maturityDate}</p>
                            <p>Accrued Interest: {fd.accruedInterest}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FDList;