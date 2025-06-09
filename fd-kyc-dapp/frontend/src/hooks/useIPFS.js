import { useState } from 'react';
import { create } from 'ipfs-http-client';

const ipfsClient = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

const useIPFS = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const uploadToIPFS = async (file) => {
        setLoading(true);
        setError(null);
        try {
            const added = await ipfsClient.add(file);
            return added.path; // Return the CID of the uploaded file
        } catch (err) {
            setError(err);
            console.error('Error uploading file to IPFS:', err);
        } finally {
            setLoading(false);
        }
    };

    return { uploadToIPFS, loading, error };
};

export default useIPFS;