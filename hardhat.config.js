require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  defaultNetwork: "hardhat",

  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  gasReporter: {
    enabled: true,
    currency: "USD",
    token: "BNB"
  },

  networks: {
    hardhat: {
      chainId: 31337
    },

    bscTestnet: {
      url: process.env.BSC_TESTNET_RPC,
      chainId: 97,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },

  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY || ""
  }

};






