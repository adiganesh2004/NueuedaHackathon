// filepath: /fd-kyc-dapp/fd-kyc-dapp/test/FixedDeposit.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FixedDeposit Contract", function () {
    let FixedDeposit;
    let fixedDeposit;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        FixedDeposit = await ethers.getContractFactory("FixedDeposit");
        [owner, addr1, addr2] = await ethers.getSigners();
        fixedDeposit = await FixedDeposit.deploy();
        await fixedDeposit.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await fixedDeposit.owner()).to.equal(owner.address);
        });
    });

    describe("Fixed Deposit Creation", function () {
        it("Should create a fixed deposit", async function () {
            await fixedDeposit.createFD(1000, 12, 5);
            const fd = await fixedDeposit.getFD(0);
            expect(fd.amount).to.equal(1000);
            expect(fd.duration).to.equal(12);
            expect(fd.interestRate).to.equal(5);
        });
    });

    describe("Withdrawal", function () {
        it("Should allow withdrawal after maturity", async function () {
            await fixedDeposit.createFD(1000, 1, 5);
            await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 30]); // Fast forward 30 days
            await fixedDeposit.withdraw(0);
            const fd = await fixedDeposit.getFD(0);
            expect(fd.withdrawn).to.be.true;
        });

        it("Should not allow early withdrawal", async function () {
            await fixedDeposit.createFD(1000, 1, 5);
            await expect(fixedDeposit.withdraw(0)).to.be.revertedWith("Cannot withdraw before maturity");
        });
    });

    describe("Interest Calculation", function () {
        it("Should calculate interest correctly", async function () {
            await fixedDeposit.createFD(1000, 12, 5);
            const interest = await fixedDeposit.calculateInterest(0);
            expect(interest).to.equal(50); // 1000 * 5% for 1 year
        });
    });
});