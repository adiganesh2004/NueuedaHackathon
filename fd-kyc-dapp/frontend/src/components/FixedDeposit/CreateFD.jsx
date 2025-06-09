import React, { useState } from 'react';
import { useWeb3 } from '../../contexts/Web3Context';
import { createFixedDeposit } from '../../services/fixedDepositService';

const CreateFD = () => {
    const { account } = useWeb3();
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createFixedDeposit(account, amount, duration, interestRate);
            alert('Fixed Deposit created successfully!');
        } catch (err) {
            setError('Failed to create Fixed Deposit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Fixed Deposit</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Deposit Amount (INR):</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Duration (months):</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Interest Rate (%):</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create FD'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default CreateFD;