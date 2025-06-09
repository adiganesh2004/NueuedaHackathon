// filepath: /fd-kyc-dapp/fd-kyc-dapp/contracts/FixedDeposit.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FixedDeposit {
    struct Deposit {
        address user;
        uint256 amount;
        uint256 duration;
        uint256 interestRate;
        uint256 depositTime;
        uint256 maturityDate;
        uint256 balance;
        uint256 accruedInterest;
        bool isWithdrawn;
    }

    mapping(address => Deposit[]) public deposits;

    event DepositCreated(address indexed user, uint256 amount, uint256 duration, uint256 interestRate, uint256 maturityDate);
    event DepositWithdrawn(address indexed user, uint256 amount, uint256 interest);

    function createDeposit(uint256 _amount, uint256 _duration, uint256 _interestRate) external {
        require(_amount > 0, "Deposit amount must be greater than zero");
        require(_duration > 0, "Duration must be greater than zero");
        require(_interestRate > 0, "Interest rate must be greater than zero");

        uint256 maturityDate = block.timestamp + (_duration * 30 days);
        deposits[msg.sender].push(Deposit({
            user: msg.sender,
            amount: _amount,
            duration: _duration,
            interestRate: _interestRate,
            depositTime: block.timestamp,
            maturityDate: maturityDate,
            balance: _amount,
            accruedInterest: 0,
            isWithdrawn: false
        }));

        emit DepositCreated(msg.sender, _amount, _duration, _interestRate, maturityDate);
    }

    function withdrawDeposit(uint256 index) external {
        Deposit storage deposit = deposits[msg.sender][index];
        require(block.timestamp >= deposit.maturityDate, "Deposit is not matured yet");
        require(!deposit.isWithdrawn, "Deposit already withdrawn");

        deposit.isWithdrawn = true;
        deposit.accruedInterest = (deposit.amount * deposit.interestRate * deposit.duration) / 100;
        uint256 totalAmount = deposit.amount + deposit.accruedInterest;

        emit DepositWithdrawn(msg.sender, deposit.amount, deposit.accruedInterest);

        // Transfer the total amount to the user (this requires the contract to hold the funds)
        payable(msg.sender).transfer(totalAmount);
    }

    function earlyWithdrawal(uint256 index) external {
        Deposit storage deposit = deposits[msg.sender][index];
        require(block.timestamp < deposit.maturityDate, "Deposit has matured");
        require(!deposit.isWithdrawn, "Deposit already withdrawn");

        deposit.isWithdrawn = true;
        uint256 penalty = (deposit.amount * deposit.interestRate) / 100; // Example penalty calculation
        uint256 totalAmount = deposit.amount - penalty;

        emit DepositWithdrawn(msg.sender, deposit.amount, 0);

        // Transfer the total amount to the user (this requires the contract to hold the funds)
        payable(msg.sender).transfer(totalAmount);
    }

    // Function to receive Ether
    receive() external payable {}
}