<<<<<<< HEAD
# ERC20 Standard  Token

A fully tested ERC20 token smart contract built with Hardhat, supporting multi-network deployment on Ethereum and BNB Chain. Includes standard ERC20 features, ownership control, and scripts for deployment, verification, and testing.


Features:
- ERC20 Standard: transfer, approve, allowance, balanceOf
- Ownable: transferOwnership, renounceOwnership
- Fixed supply, no mint/burn/pause
- Multi-network deploy (Ethereum + BSC)




---

# Prerequisites

•⁠  ⁠*Node.js* LTS (v18 or v20 recommended)
•⁠  ⁠*npm* (comes with Node.js)

Check versions:

⁠ bash
node -v
npm -v
 ⁠

---

# Project Structure

| Path                       | Purpose                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⁠ contracts/MyERC20.sol ⁠ | ERC20 token contract (OpenZeppelin ERC20 + Ownable)                                                                                                  |
| ⁠ scripts/deploy.js ⁠        | Deployment script; deploys MyERC20 using Hardhat Test                                                                                           |
| ⁠ test.js ⁠  | Mocha/Chai tests: deployment, transfers, approve/allowance, edge cases                                                                               |
| ⁠ hardhat.config.js ⁠        | Hardhat config: networks (Hardhat, BSC Testnet, BSC Mainnet; Ethereum Sepolia/mainnet can be added), Solidity 0.8.28, optimizer, BSCScan / Etherscan |
| ⁠ package.json ⁠             | Project metadata, scripts (⁠ test ⁠, ⁠ deploy ⁠), dependency list                                                                                        |
| ⁠ package-lock.json ⁠        | Locked dependency versions for reproducible installs                                                                                                 |
| ⁠ .env ⁠                     | Local env vars (private key, RPC URLs, BSCScan/Etherscan API keys). Not committed; see ⁠ .gitignore ⁠                                                  |
| ⁠ .gitignore ⁠               | Ignores ⁠ node_modules ⁠, ⁠ .env ⁠, ⁠ cache ⁠, ⁠ artifacts ⁠, coverage, etc.                                                                                 |

---

# Dependencies (from package.json)

All dependencies are declared in ⁠ package.json ⁠. ⁠ package-lock.json ⁠ pins exact versions so everyone gets the same dependency tree.

| Package                            | Type          | Purpose                                                    |
| ---------------------------------- | ------------- | ---------------------------------------------------------- |
| ⁠ @openzeppelin/contracts ⁠          | dependency    | ERC20 and Ownable implementations used by ⁠ MyERC20.sol ⁠ |
| ⁠ hardhat ⁠                          | devDependency | Build and test framework                                   |
| ⁠ @nomicfoundation/hardhat-toolbox ⁠ | devDependency | Ethers v6, Chai matchers, other Hardhat plugins            |
|                                    |               |                                                            |
| ⁠ dotenv ⁠                           | devDependency | Loads ⁠ .env ⁠ variables into ⁠ process.env ⁠                  |
| ⁠ hardhat-gas-reporter ⁠             | devDependency | Gas usage report during test execution                     |

You do not install these individually. A single install step installs everything.

---

# Install from Zero

### 1. Clone and enter the project

⁠ bash
git clone <your-repo-url> My_ERC20
cd My_ERC20
 ⁠

---

### 2. Install all dependencies

⁠ bash
npm install
 ⁠

This installs both dependencies and devDependencies from ⁠ package.json ⁠.

For reproducible installs (recommended for CI):

⁠ bash
npm ci
 ⁠

---

# Environment Variables

Create a ⁠ .env ⁠ file in the project root.

| Variable          | Required | Description                                             |
| ----------------- | -------- | ------------------------------------------------------- |
| ⁠ PRIVATE_KEY ⁠     | Yes      | Deployer wallet private key (*include the 0x prefix*) |
| ⁠ BSC_TESTNET_RPC ⁠ | Yes      | BSC Testnet RPC URL                                     |
| ⁠ BSC_MAINNET_RPC ⁠ | Optional | BSC Mainnet RPC URL                                     |
| ⁠ BSCSCAN_API_KEY ⁠ | Optional | BSCScan API key for contract verification               |

If Ethereum networks are added:

| Variable            | Required | Description          |
| ------------------- | -------- | -------------------- |
| ⁠ SEPOLIA_RPC_URL ⁠   | Optional | Ethereum Sepolia RPC |
| ⁠ MAINNET_RPC_URL ⁠   | Optional | Ethereum Mainnet RPC |
| ⁠ ETHERSCAN_API_KEY ⁠ | Optional | Etherscan API key    |

Example ⁠ .env ⁠:

⁠ env
PRIVATE_KEY=0xYourPrivateKeyHere
BSC_TESTNET_RPC=https://bsc-testnet.publicnode.com
BSC_MAINNET_RPC=https://bsc-dataseed.binance.org
BSCSCAN_API_KEY=YourBscScanApiKey
ETHERSCAN_API_KEY=YourEtherscanApiKey
 ⁠

---

# Compile

⁠ bash
npx hardhat compile
 ⁠

Artifacts will be generated in:


artifacts/
cache/


---

# Test

Run the full test suite:
⁠ bash
npx hardhat test
 ⁠

Tests are located in:


test/test.js


They cover:

•⁠  ⁠deployment
•⁠  ⁠token transfers
•⁠  ⁠approve / allowance
•⁠  ⁠supply invariants

---

# Run Tests with Gas Report

Enable the plugin in ⁠ hardhat.config.js ⁠:

⁠ javascript
require("hardhat-gas-reporter");
 ⁠

Add configuration:

⁠ javascript
gasReporter: {
  enabled: process.env.REPORT_GAS === "true",
  currency: "USD"
}
 ⁠

Run tests normally:

⁠ bash
npm hardhat test
 ⁠

Or with gas reporting:

⁠ bash
REPORT_GAS=true npx hardhat test
 ⁠

---

# Deploy

Deploy to *ETH Testnet*:
---
 bash
npm run deploy
 ⁠

or

⁠ bash
npx hardhat run scripts/deploy.js --network sepolia
 ⁠

Deploy to *BSC Mainnet*:

⁠ bash
npx hardhat run scripts/deploy.js --network mainnet


Deploy to *BSC Testnet*:
---
⁠ bash
npm run deploy
 ⁠

or

⁠ bash
npx hardhat run scripts/deploy.js --network bscTestnet
 ⁠

Deploy to *BSC Mainnet*:

⁠ bash
npx hardhat run scripts/deploy.js --network bscMainnet
 ⁠

---

### Deploy to Local Hardhat Node

Start a node:

⁠ bash
npx hardhat node
 ⁠

Then deploy in another terminal:

⁠ bash
npx hardhat run scripts/deploy.js --network localhost
 ⁠

The deploy script logs:

•⁠  ⁠Network name + ChainId
•⁠  Deployer wallet address
•⁠  Contract address
•⁠  ⁠Deployment transaction hash 
•⁠  ⁠Token total supply

---

# Verify Contract on BSCScan

Verification publishes your source code so BSCScan can validate the bytecode and expose the *Read / Write Contract* interface.

### Step 1 — Get API Key

Create an API key from:

https://bscscan.com/myapikey

---

### Step 2 — Add to ⁠ .env ⁠


BSCSCAN_API_KEY=YourApiKey


---

### Step 3 — Verify

BSC Testnet:

⁠ bash
npx hardhat verify --network bscTestnet DEPLOYED_CONTRACT_ADDRESS
 ⁠

Example:

⁠ bash
npx hardhat verify --network bscTestnet 0x1234567890abcde5nh5j45336mn65mn566m56b
 ⁠

BSC Mainnet:

⁠ bash
npx hardhat verify --network bscMainnet DEPLOYED_CONTRACT_ADDRESS
 ⁠

---

# Verify on Etherscan (Ethereum)

If Ethereum networks are configured in ⁠ hardhat.config.js ⁠:

⁠ bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
 ⁠

or

⁠ bash
npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS
 ⁠

MyERC20 has *no constructor arguments*, so no extra parameters are needed.

---

# Security

•⁠  ⁠This contract uses *widely used and audited OpenZeppelin implementations*.

•⁠  ⁠The design is intentionally minimal:

  * fixed supply
  * no minting after deployment
  * no pause
  * no blacklist
  * no transaction fees

•⁠  ⁠This project *has not been formally audited* by a third-party security firm.

For production deployments consider:

•⁠  ⁠professional smart contract audit
•⁠  ⁠multisig ownership
•⁠  ⁠hardware wallet deployment

---

# License

•⁠  ⁠*Smart Contract (*⁠ contracts/MyERC20.sol ⁠*)*: MIT
•⁠  ⁠*Project Repository*: ISC (see ⁠ package.json ⁠)

---

# Disclaimer

This project is provided for *educational and reference purposes only*.

The authors and contributors:

•⁠  ⁠do not provide financial advice
•⁠  ⁠do not guarantee security or correctness
•⁠  ⁠are not responsible for losses resulting from the use of this code

Use this software and any deployed contracts *at your own risk*.
=======
# MyToken
A secure and customizable ERC20 token smart contract for the Ethereum blockchain.
>>>>>>> 9e5a268b50299df77a69105c537507d221fbf6ff
