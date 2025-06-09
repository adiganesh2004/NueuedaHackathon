import React, { createContext, useState, useEffect } from 'react';
import { fetchKYCStatus, uploadKYCDocument, manageAccess } from '../services/ipfs';

export const KYCContext = createContext();

export const KYCProvider = ({ children }) => {
    const [kycDocuments, setKycDocuments] = useState([]);
    const [kycStatus, setKycStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadDocument = async (document) => {
        setLoading(true);
        try {
            const cid = await uploadKYCDocument(document);
            setKycDocuments((prev) => [...prev, { document, cid }]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchStatus = async () => {
        setLoading(true);
        try {
            const status = await fetchKYCStatus();
            setKycStatus(status);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const manageDocumentAccess = async (cid, accessList) => {
        setLoading(true);
        try {
            await manageAccess(cid, accessList);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    return (
        <KYCContext.Provider value={{ kycDocuments, kycStatus, loading, error, uploadDocument, manageDocumentAccess }}>
            {children}
        </KYCContext.Provider>
    );
};