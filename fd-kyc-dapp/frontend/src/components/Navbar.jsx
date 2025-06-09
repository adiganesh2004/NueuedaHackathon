import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <h1>FD & KYC Vault</h1>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/create-fd">Create Fixed Deposit</Link>
                </li>
                <li>
                    <Link to="/withdraw-fd">Withdraw Fixed Deposit</Link>
                </li>
                <li>
                    <Link to="/upload-kyc">Upload KYC</Link>
                </li>
                <li>
                    <Link to="/kyc-status">KYC Status</Link>
                </li>
                <li>
                    <Link to="/manage-access">Manage Access</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;