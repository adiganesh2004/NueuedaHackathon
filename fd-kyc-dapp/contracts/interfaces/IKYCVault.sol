// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IKYCVault {
    function uploadKYC(string memory documentCID) external;
    function getKYC(address user) external view returns (string memory);
    function grantAccess(address dApp) external;
    function revokeAccess(address dApp) external;
    function isAccessGranted(address dApp) external view returns (bool);
}