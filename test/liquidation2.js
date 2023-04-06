const { expect } = require("chai");
const { network, ethers } = require("hardhat");
const { BigNumber, utils }  = require("ethers");
const { writeFile } = require('fs');

describe("Liquidation test for question 2", function () {
  it("Test Liquidation for 2000 USDT", async function () {
    console.log("\nLiquidation for 2000 USDT------------------------------------")
    await network.provider.request({
        method: "hardhat_reset",
        params: [{
          forking: {
            jsonRpcUrl: process.env.ALCHE_API,
            blockNumber: 12489619,
          }
        }]
      });
    
    const gasPrice = 0;
    const debt = 2000;
    const debt_USDT_input = ethers.utils.parseUnits(debt.toString(), 6);
    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
    }));

    const LiquidationOperator = await ethers.getContractFactory("LiquidationOperator2");
    const liquidationOperator = await LiquidationOperator.deploy(overrides = {gasPrice: gasPrice});
    await liquidationOperator.deployed();

    const liquidationTx = await liquidationOperator.operate(debt_USDT_input, (overrides = {gasPrice: gasPrice}));
    const liquidationReceipt = await liquidationTx.wait();

    const liquidationEvents = liquidationReceipt.logs.filter(
        v => v && v.topics && v.address === '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' && Array.isArray(v.topics) && 
        v.topics.length > 3 && v.topics[0] === '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286')

    const expectedLiquidationEvents = liquidationReceipt.logs.filter(v => v.topics[3] === '0x00000000000000000000000059ce4a2ac5bc3f5f225439b2993b86b42f6d3e9f');

    expect(expectedLiquidationEvents.length, "no expected liquidation").to.be.above(0);
    expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(expectedLiquidationEvents.length);

    const afterLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
    }));

    const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
    console.log("Profit", utils.formatEther(profit), "ETH");

    expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    //writeFile('profit.txt', String(utils.formatEther(profit)), function (err) {console.log("failed to write profit.txt: %s", err)});
    console.log("----------------------------------------------------------------")
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it("Test Liquidation for 5000 USDT", async function () {
    console.log("\nLiquidation for 5000 USDT---------------------------------------")
    await network.provider.request({
        method: "hardhat_reset",
        params: [{
          forking: {
            jsonRpcUrl: process.env.ALCHE_API,
            blockNumber: 12489619,
          }
        }]
      });
    
    const gasPrice = 0;
    const debt = 5000;
    const debt_USDT_input = ethers.utils.parseUnits(debt.toString(), 6);
    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
    }));

    const LiquidationOperator = await ethers.getContractFactory("LiquidationOperator2");
    const liquidationOperator = await LiquidationOperator.deploy(overrides = {gasPrice: gasPrice});
    await liquidationOperator.deployed();

    const liquidationTx = await liquidationOperator.operate(debt_USDT_input,(overrides = {gasPrice: gasPrice}));
    const liquidationReceipt = await liquidationTx.wait();

    const liquidationEvents = liquidationReceipt.logs.filter(
        v => v && v.topics && v.address === '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' && Array.isArray(v.topics) && 
        v.topics.length > 3 && v.topics[0] === '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286')

    const expectedLiquidationEvents = liquidationReceipt.logs.filter(v => v.topics[3] === '0x00000000000000000000000059ce4a2ac5bc3f5f225439b2993b86b42f6d3e9f');

    expect(expectedLiquidationEvents.length, "no expected liquidation").to.be.above(0);
    expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(expectedLiquidationEvents.length);

    const afterLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
    }));

    const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
    console.log("Profit", utils.formatEther(profit), "ETH");

    expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    //writeFile('profit.txt', String(utils.formatEther(profit)), function (err) {console.log("failed to write profit.txt: %s", err)});
    console.log("-------------------------------------------------------------------")
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it("Test Liquidation for 10000 USDT", async function () {
    console.log("\nLiquidation for 10000 USDT---------------------------------------")
    await network.provider.request({
        method: "hardhat_reset",
        params: [{
          forking: {
            jsonRpcUrl: process.env.ALCHE_API,
            blockNumber: 12489619,
          }
        }]
      });
    
    const gasPrice = 0;
    const debt = 10000;
    const debt_USDT_input = ethers.utils.parseUnits(debt.toString(),6);
    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
    }));

    const LiquidationOperator = await ethers.getContractFactory("LiquidationOperator2");
    const liquidationOperator = await LiquidationOperator.deploy(overrides = {gasPrice: gasPrice});
    await liquidationOperator.deployed();
    
    const liquidationTx = await liquidationOperator.operate(debt_USDT_input,overrides = {gasPrice: gasPrice});
    const liquidationReceipt = await liquidationTx.wait();
    
    const liquidationEvents = liquidationReceipt.logs.filter(
        v => v && v.topics && v.address === '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9' && Array.isArray(v.topics) && 
        v.topics.length > 3 && v.topics[0] === '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286')

    const expectedLiquidationEvents = liquidationReceipt.logs.filter(v => v.topics[3] === '0x00000000000000000000000059ce4a2ac5bc3f5f225439b2993b86b42f6d3e9f');

    expect(expectedLiquidationEvents.length, "no expected liquidation").to.be.above(0);
    expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(expectedLiquidationEvents.length);

    const afterLiquidationBalance = BigNumber.from(await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
    }));

    const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
    console.log("Profit", utils.formatEther(profit), "ETH");

    expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    //writeFile('profit.txt', String(utils.formatEther(profit)), function (err) {console.log("failed to write profit.txt: %s", err)});
    console.log("-------------------------------------------------------------------")
  });
});
