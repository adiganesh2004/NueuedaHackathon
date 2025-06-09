// filepath: /fd-kyc-dapp/fd-kyc-dapp/contracts/KYCVault.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KYCVault {
    struct KYCRecord {
        string cid; // IPFS CID of the KYC document
        address owner; // Wallet address of the user
        bool isVerified; // Verification status
    }

    mapping(address => KYCRecord) private kycRecords;

    event KYCUploaded(address indexed user, string cid);
    event KYCVerified(address indexed user);
    event KYCRevoked(address indexed user);

    modifier onlyOwner() {
        require(msg.sender == kycRecords[msg.sender].owner, "Not the KYC owner");
        _;
    }

    function uploadKYC(string memory _cid) external {
        require(bytes(_cid).length > 0, "CID cannot be empty");
        kycRecords[msg.sender] = KYCRecord(_cid, msg.sender, false);
        emit KYCUploaded(msg.sender, _cid);
    }

    function verifyKYC(address _user) external {
        require(kycRecords[_user].owner != address(0), "KYC record does not exist");
        kycRecords[_user].isVerified = true;
        emit KYCVerified(_user);
    }

    function revokeKYC() external onlyOwner {
        delete kycRecords[msg.sender];
        emit KYCRevoked(msg.sender);
    }

    function getKYCRecord(address _user) external view returns (string memory cid, bool isVerified) {
        KYCRecord memory record = kycRecords[_user];
        return (record.cid, record.isVerified);
    }
}