require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const { mnemonic } = require("./secrets.json");
const mnemonic = process.env["MNEMONIC"].toString().trim();

module.exports = {
  defaultNetwork: "testnet",
  networks: {
    testnet: {
      chainId: 97,
    },
    testnet: {
      url: "https://bsc-testnet.public.blastapi.io", // "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic },
      // accounts: [PRIVATE_KEY],
    },
    opbnb: {
      url: "https://opbnb-testnet-rpc.bnbchain.org/",
      chainId: 5611, // Replace with the correct chainId for the "opbnb" network
      accounts: [PRIVATE_KEY], // Add private keys or mnemonics of accounts to use
      gasPrice: 20000000000,
    },
  },
  solidity: {
    settings: {
      optimizer: {
        enabled: true,
      },
    },
    compilers: [
      {
        version: "0.8.19",
      },
    ],
  },
};
