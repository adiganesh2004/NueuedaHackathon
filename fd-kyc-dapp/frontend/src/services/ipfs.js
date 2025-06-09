import { create } from 'ipfs-http-client';

const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

export const uploadToIPFS = async (file) => {
    try {
        const added = await ipfs.add(file);
        return added.path; // Return the CID of the uploaded file
    } catch (error) {
        console.error("Error uploading file to IPFS:", error);
        throw error;
    }
};

export const fetchFromIPFS = async (cid) => {
    try {
        const stream = ipfs.cat(cid);
        let data = '';

        for await (const chunk of stream) {
            data += chunk.toString(); // Concatenate the chunks to form the complete data
        }

        return data; // Return the retrieved data
    } catch (error) {
        console.error("Error fetching file from IPFS:", error);
        throw error;
    }
};