// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();

// module.exports = {
//   solidity: "0.8.24",
//   networks: {
//     sepolia: {
//       url: process.env.ALCHEMY_RPC_URL,
//       accounts: [process.env.PRIVATE_KEY]
//     }
//   }
// };


// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();

// module.exports = {
//   defaultNetwork: "hardhat",
//   solidity: {
//     version: "0.8.28",
//     settings: { optimizer: { enabled: true, runs: 200 } }
//   },

//   gasReporter: {
//     enabled: true,
//     currency: "USD",
//   },

//   networks: {
//     hardhat: { chainId: 31337 },
//     sepolia: {
//       url: process.env.RPC_URL,
//       accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
//     }
//   },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY || ""
//   }
// };


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






// require("dotenv").config();
// require("@nomicfoundation/hardhat-toolbox"); //
// require("hardhat-gas-reporter");

// const {
//   PRIVATE_KEY,
//   SEPOLIA_RPC_URL,
//   MAINNET_RPC_URL,
//   BSC_TESTNET_RPC_URL,
//   BSC_MAINNET_RPC_URL,
//   ETHERSCAN_API_KEY,
//   BSCSCAN_API_KEY,
// } = process.env;

// module.exports = {
//   solidity: {
//     version: "0.8.28",
//     settings: {
//       optimizer: { enabled: true, runs: 500 },  // gas 200-1000 can be use not more then 1000.
//     },
//   },
//   defaultNetwork: "hardhat",
//   networks: {
//     hardhat: {},
//     sepolia: {
//       url: SEPOLIA_RPC_URL || "",
//       accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
//     },
//     mainnet: {
//       url: MAINNET_RPC_URL || "",
//       accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
//     },
//     bscTestnet: {
//       url: BSC_TESTNET_RPC_URL || "",
//       chainId: 97,
//       accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
//     },
//     bsc: {
//       url: BSC_MAINNET_RPC_URL || "",
//       chainId: 56,
//       accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
//     },
//   },
//   gasReporter: {
//     enabled: true,
//     currency: "USD",
//     showMethodSig: true,
//     coinmarketcap: null,
//   },

//   etherscan: {
//   apiKey: process.env.ETHERSCAN_API_KEY || "",  // single key for mainnet & testnet Sepolia
//   },

//   bscscan: {
//   apiKey: process.env.BSCSCAN_API_KEY || "",  // single key for mainnet & Testnet
//   },

// };