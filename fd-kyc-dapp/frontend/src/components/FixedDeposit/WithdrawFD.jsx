import React, { useState, useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import { KYCContext } from '../../contexts/KYCContext';
import { useContract } from '../../hooks/useContract';

const WithdrawFD = () => {
    const { account } = useContext(Web3Context);
    const { getFDDetails, withdrawFD } = useContract();
    const [fdId, setFdId] = useState('');
    const [message, setMessage] = useState('');

    const handleWithdraw = async () => {
        try {
            const fdDetails = await getFDDetails(fdId);
            if (fdDetails.maturityDate <= Date.now()) {
                await withdrawFD(fdId);
                setMessage('Withdrawal successful!');
            } else {
                setMessage('FD is not yet matured.');
            }
        } catch (error) {
            setMessage('Error during withdrawal: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Withdraw Fixed Deposit</h2>
            <input
                type="text"
                placeholder="Enter FD ID"
                value={fdId}
                onChange={(e) => setFdId(e.target.value)}
            />
            <button onClick={handleWithdraw}>Withdraw</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default WithdrawFD;