const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  const INITIAL_SUPPLY = ethers.parseUnits("1000000000", 18); // 1B token with 18 decimals
  const toUnits = (value) => ethers.parseUnits(value.toString(), 18);

  let owner, addr1, addr2, token;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy();
    await token.waitForDeployment();
  });

  describe("Deployment", function () {
    it("sets owner and total supply correctly", async function () {
      expect(await token.getAddress()).to.be.properAddress;

      const ownerAddress = await token.owner();
      expect(ownerAddress).to.equal(owner.address);
      expect(ownerAddress).to.not.equal(ethers.ZeroAddress);

      const totalSupply = await token.totalSupply();
      const ownerBalance = await token.balanceOf(owner.address);
      expect(totalSupply).to.equal(INITIAL_SUPPLY);
      expect(ownerBalance).to.equal(INITIAL_SUPPLY);
    });
  });

  describe("transfer", function () {
    it("Transfer from owner and update balance", async function () {
      const amount = toUnits(1000);

      await expect(token.transfer(addr1.address, amount))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, addr1.address, amount);

      expect(await token.balanceOf(addr1.address)).to.equal(amount);
      expect(await token.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - amount);
    });

    it("reverts when transferring more then balance", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      const tooMuch = ownerBalance + 1n;

      await expect(
        token.transfer(addr1.address, tooMuch)
      ).to.be.reverted;
    });
  });

  describe("Approve and allowance", function () {
    it("sets allowance with approve", async function () {
      const amount = toUnits(500);

      await expect(token.approve(addr1.address, amount))
        .to.emit(token, "Approval")
        .withArgs(owner.address, addr1.address, amount);

      expect(
        await token.allowance(owner.address, addr1.address)
      ).to.equal(amount);
    });

    it("uses transferFrom and reduces allowance", async function () {
      const amount = toUnits(800);

      await token.approve(addr1.address, amount);

      await expect(
        token.connect(addr1).transferFrom(owner.address, addr2.address, amount)
      )
        .to.emit(token, "Transfer")
        .withArgs(owner.address, addr2.address, amount);

      expect(
        await token.allowance(owner.address, addr1.address)
      ).to.equal(0n);

      expect(await token.balanceOf(owner.address)).to.equal(
        INITIAL_SUPPLY - amount
      );
      expect(await token.balanceOf(addr2.address)).to.equal(amount);
    });

    it("revert transfer without approval", async function () {
      const amount = toUnits(100);
      await expect(
        token.connect(addr1).transferFrom(owner.address, addr2.address, amount)
      ).to.be.reverted;
    });
  });

  describe("Edge cases", function () {
    it("keep total supply equal to sum of balance", async function () {
      const amount1 = toUnits(1000);
      const amount2 = toUnits(2000);

      await token.transfer(addr1.address, amount1);
      await token.transfer(addr2.address, amount2);

      const ownerBalance = await token.balanceOf(owner.address);
      const addr1Balance = await token.balanceOf(addr1.address);
      const addr2Balance = await token.balanceOf(addr2.address);

      const sumOfBalance = ownerBalance + addr1Balance + addr2Balance;
      const totalSupply = await token.totalSupply();

      expect(sumOfBalance).to.equal(totalSupply);
    });
  });

  describe("Increase/Decrease Allowance", function () {
    it("increaseAllowance works correctly", async function () {
      const amount = toUnits(100);
      await token.increaseAllowance(addr1.address, amount);
      expect(await token.allowance(owner.address, addr1.address)).to.equal(amount);
    });

    it("decreaseAllowance works correctly", async function () {
      const initial = toUnits(200);
      await token.increaseAllowance(addr1.address, initial);
      await token.decreaseAllowance(addr1.address, toUnits(50));
      expect(await token.allowance(owner.address, addr1.address)).to.equal(toUnits(150));
    });

    it("cannot decrease below zero", async function () {
      await expect(token.decreaseAllowance(addr1.address, toUnits(10)))
        .to.be.revertedWith("ERC20: decreased allowance below zero");
    });
  });

});