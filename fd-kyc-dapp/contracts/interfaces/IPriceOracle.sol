// filepath: /fd-kyc-dapp/fd-kyc-dapp/contracts/interfaces/IPriceOracle.sol
pragma solidity ^0.8.0;

interface IPriceOracle {
    function getLatestPrice() external view returns (uint256);
}