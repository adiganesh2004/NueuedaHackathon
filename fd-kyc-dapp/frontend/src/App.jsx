import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CreateFD from './components/FixedDeposit/CreateFD';
import WithdrawFD from './components/FixedDeposit/WithdrawFD';
import FDList from './components/FixedDeposit/FDList';
import UploadKYC from './components/KYC/UploadKYC';
import KYCStatus from './components/KYC/KYCStatus';
import ManageAccess from './components/KYC/ManageAccess';
import WalletConnect from './components/WalletConnect';
import { Web3Provider } from './contexts/Web3Context';
import { KYCProvider } from './contexts/KYCContext';
import './assets/styles.css';

const App = () => {
  return (
    <Web3Provider>
      <KYCProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/create-fd" component={CreateFD} />
            <Route path="/withdraw-fd" component={WithdrawFD} />
            <Route path="/fd-list" component={FDList} />
            <Route path="/upload-kyc" component={UploadKYC} />
            <Route path="/kyc-status" component={KYCStatus} />
            <Route path="/manage-access" component={ManageAccess} />
            <Route path="/wallet-connect" component={WalletConnect} />
          </Switch>
        </Router>
      </KYCProvider>
    </Web3Provider>
  );
};

export default App;