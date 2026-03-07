// require("dotenv").config();
// const hre = require("hardhat");
// const { ethers } = hre;

// async function main() {
//     try {
//         const { PRIVATE_KEY, RPC_URL } = process.env;

//         if (!PRIVATE_KEY) {
//             throw new Error("Missing PRIVATE_KEY in environment variables.");
//         }
//         if (!RPC_URL) {
//             throw new Error("Missing RPC_URL in environment variables.");
//         }

//         const provider = new ethers.JsonRpcProvider(RPC_URL);
//         const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

//         const network = await provider.getNetwork();

//         console.log(`Deploying MyToken to chainId ${network.chainId}`);
//         console.log(`Deployer Address ${wallet.address}`);



//         const balance = await provider.getBalance(wallet.address);
//         const balanceEth = ethers.formatEther(balance);
//         console.log("Account balance in ETH:", balanceEth.toString());


//         const MyToken = await ethers.getContractFactory("MyToken", wallet);
//         const token = await MyToken.deploy();

//         await token.waitForDeployment();

//         const contractAddress = await token.getAddress();
//         console.log(`MyToken contract address: ${contractAddress}`);
//     } catch (error) {
//         console.error("Deployment failed:", error);
//         process.exitCode = 1;
//     }
// }

// main();


// require("dotenv").config();
// const hre = require("hardhat");
// const { ethers } = hre;

// async function main() {
//     try {
//         const { PRIVATE_KEY, RPC_URL } = process.env;

//         if (!PRIVATE_KEY) throw new Error("Missing PRIVATE_KEY in environment variables.");
//         if (!RPC_URL) throw new Error("Missing RPC_URL in environment variables.");

//         // Provider & Wallet তৈরি
//         const provider = new ethers.JsonRpcProvider(RPC_URL);
//         const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

//         // নেটওয়ার্ক ইনফো
//         const network = await provider.getNetwork();
//         console.log(`Deploying MyToken to chainId ${network.chainId} with deployer ${wallet.address}`);

//         // ব্যালান্স চেক (v6 compliant)
//         const balance = await provider.getBalance(wallet.address);
//         console.log("Account balance in ETH:", ethers.formatEther(balance));

//         // কন্ট্রাক্ট ফ্যাক্টরি & ডিপ্লয়
//         const MyToken = await ethers.getContractFactory("MyToken", wallet);
//         const token = await MyToken.deploy();

//         await token.waitForDeployment();

//         console.log(`MyToken deployed at address: ${token.target}`);

//     } catch (error) {
//         console.error("Deployment failed:", error);
//         process.exitCode = 1;
//     }
// }

// main();



const hre = require("hardhat");


async function main() {

    const { ethers, network } = hre;

    const [deployer] = await ethers.getSigners();

    const { chainId } = await deployer.provider.getNetwork();

    console.log(`Network: ${network.name} (ChainId ${chainId})`);
    console.log(`Deployer: ${deployer.address}`);

    // Contract Factory
    const MyToken = await ethers.getContractFactory("MyToken");

    // Deploy Contract
    const token = await MyToken.deploy();

    await token.waitForDeployment();

    const contractAddress = await token.getAddress();
    const deploymentTx = token.deploymentTransaction();
    const txHash = deploymentTx ? deploymentTx.hash : "N/A";

    // Total Supply
    const totalSupply = await token.totalSupply();
    const totalSupplyFormatted = ethers.formatUnits(totalSupply, 18);

    console.log("Contract Address:", contractAddress);
    console.log("Deployment Tx:", txHash);
    console.log("Total Supply:", totalSupplyFormatted);

}

main().catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
});
