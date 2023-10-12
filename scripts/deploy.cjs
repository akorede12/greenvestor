// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// import hre from "hardhat";
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const GreenVestor = await hre.ethers.deployContract(
    "greenVestor" /*, {
    gasPrice: ethers.parseUnits("1000000000", "wei"),
    gas: 2000000000,
  }*/
  );
  await GreenVestor.waitForDeployment();

  console.log(
    "greenVestor contract deployed to:",
    await GreenVestor.getAddress()
  );

  fs.writeFileSync(
    "./config.js",
    `
  export const GreenVestor_address = "${await GreenVestor.getAddress()}"
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
