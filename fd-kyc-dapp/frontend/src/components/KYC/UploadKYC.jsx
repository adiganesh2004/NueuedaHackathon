import React, { useState } from 'react';
import { useIPFS } from '../../hooks/useIPFS';
import { useKYC } from '../../contexts/KYCContext';

const UploadKYC = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { uploadKYC } = useKYC();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        try {
            const cid = await uploadKYC(file);
            alert(`KYC document uploaded successfully! CID: ${cid}`);
        } catch (error) {
            console.error("Error uploading KYC document:", error);
            alert("Failed to upload KYC document.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Upload KYC Document</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default UploadKYC;