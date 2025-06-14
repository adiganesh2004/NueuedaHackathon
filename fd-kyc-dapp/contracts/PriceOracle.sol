// filepath: /fd-kyc-dapp/fd-kyc-dapp/contracts/PriceOracle.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceOracle {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/INR
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0x...); // Replace with the actual address of the price feed
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            , 
            int price, 
            , 
            , 
        ) = priceFeed.latestRoundData();
        return price;
    }
}