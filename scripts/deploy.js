const hre = require("hardhat");

async function main() {
  
  const Assessment = await hre.ethers.getContractFactory("ColorMarket");
  const assessment = await Assessment.deploy( {
    gasLimit: 500000,
  });

  console.log(`A contract deployed to ${assessment.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
