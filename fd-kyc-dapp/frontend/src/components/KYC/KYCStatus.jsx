import React, { useContext, useEffect, useState } from 'react';
import { KYCContext } from '../../contexts/KYCContext';

const KYCStatus = () => {
    const { kycStatus, fetchKYCStatus } = useContext(KYCContext);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const getStatus = async () => {
            const currentStatus = await fetchKYCStatus();
            setStatus(currentStatus);
        };

        getStatus();
    }, [fetchKYCStatus]);

    return (
        <div className="kyc-status">
            <h2>KYC Status</h2>
            <p>{status ? `Your KYC status is: ${status}` : 'Fetching KYC status...'}</p>
        </div>
    );
};

export default KYCStatus;