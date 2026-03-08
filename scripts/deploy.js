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
