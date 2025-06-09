import React, { useContext } from 'react';
import { Web3Context } from '../contexts/Web3Context';

const WalletConnect = () => {
    const { connectWallet, currentAccount } = useContext(Web3Context);

    return (
        <div className="wallet-connect">
            {currentAccount ? (
                <p>Connected: {currentAccount}</p>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;