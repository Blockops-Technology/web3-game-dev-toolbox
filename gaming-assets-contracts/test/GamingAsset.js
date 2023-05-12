const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("GamingAsset", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployGamingAssetFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const GamingAsset = await ethers.getContractFactory("GamingAsset");
    const gamingAsset = await GamingAsset.deploy("Token Name", "SYM", "testUrl");

    return { owner, otherAccount, gamingAsset };
  }

  describe("Deployment", function () {
    it("Should set the baseUri", async function () {
      const { gamingAsset } = await loadFixture(deployGamingAssetFixture);

      expect(await gamingAsset.baseURL()).to.equal("testUrl");
    });

    it("Should set the right owner", async function () {
      const { gamingAsset, owner } = await loadFixture(deployGamingAssetFixture);

      expect(await gamingAsset.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    it("Should allow anyone to mint an asset", async function () {
      const { otherAccount, gamingAsset } = await loadFixture(deployGamingAssetFixture);

      expect(await gamingAsset.totalSupply()).to.equal(0);
      await gamingAsset.mint(otherAccount.address);
      expect(await gamingAsset.totalSupply()).to.equal(1);
    });

  });
});
