import React, { useContext, useState } from 'react';
import { KYCContext } from '../../contexts/KYCContext';

const ManageAccess = () => {
    const { kycData, updateAccess } = useContext(KYCContext);
    const [address, setAddress] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);

    const handleAccessChange = (e) => {
        setAccessGranted(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAccess(address, accessGranted);
        setAddress('');
        setAccessGranted(false);
    };

    return (
        <div>
            <h2>Manage KYC Access</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Wallet Address:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Grant Access:
                        <input
                            type="checkbox"
                            checked={accessGranted}
                            onChange={handleAccessChange}
                        />
                    </label>
                </div>
                <button type="submit">Update Access</button>
            </form>
            <h3>Current Access List</h3>
            <ul>
                {kycData.map((entry, index) => (
                    <li key={index}>
                        {entry.address} - {entry.access ? 'Granted' : 'Denied'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageAccess;