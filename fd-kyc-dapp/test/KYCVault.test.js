// filepath: /fd-kyc-dapp/fd-kyc-dapp/test/KYCVault.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KYCVault", function () {
    let KYCContract;
    let kycVault;
    let owner;
    let user;

    beforeEach(async function () {
        KYCContract = await ethers.getContractFactory("KYCVault");
        [owner, user] = await ethers.getSigners();
        kycVault = await KYCContract.deploy();
        await kycVault.deployed();
    });

    it("should allow user to upload KYC documents", async function () {
        const documentCID = "QmExampleCID123";
        await kycVault.connect(user).uploadKYC(documentCID);
        
        const kycData = await kycVault.getKYC(user.address);
        expect(kycData.cid).to.equal(documentCID);
        expect(kycData.owner).to.equal(user.address);
    });

    it("should not allow non-owner to access KYC documents", async function () {
        const documentCID = "QmExampleCID123";
        await kycVault.connect(user).uploadKYC(documentCID);
        
        await expect(kycVault.connect(owner).getKYC(user.address)).to.be.revertedWith("Not authorized");
    });

    it("should allow owner to retrieve their KYC document", async function () {
        const documentCID = "QmExampleCID123";
        await kycVault.connect(user).uploadKYC(documentCID);
        
        const kycData = await kycVault.connect(user).getKYC(user.address);
        expect(kycData.cid).to.equal(documentCID);
    });

    it("should not allow KYC document modification after upload", async function () {
        const documentCID = "QmExampleCID123";
        await kycVault.connect(user).uploadKYC(documentCID);
        
        await expect(kycVault.connect(user).uploadKYC("QmNewCID456")).to.be.revertedWith("KYC record is immutable");
    });
});