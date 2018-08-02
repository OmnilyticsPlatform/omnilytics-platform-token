var abi = require("ethereumjs-abi");

const contracts = {
  OmniPlatformToken: {
    types: [],
    args: []
  },
  TokenVesting: {
    types: ["address", "uint256", "uint256", "uint256", "bool"],
    args: [
      "0x4B43DC3d49476Dfc4F49151dD72E9FEE07cCb9De",
      1541814715683,
      0,
      100,
      true
    ]
  }
};

function main(cb) {
  let [nodeBin, truffleCmd, execCmd, scriptName, contractName] = process.argv;
  const contract = artifacts.require(contractName);
  // console.log(contract.bytecode);
  contracts[contractName];
  const foundContract = contracts[contractName];
  const encodedParams = abi
    .rawEncode(foundContract.types, foundContract.args)
    .slice(2);
  console.log(contract.bytecode + encodedParams.toString("hex"));
  process.exit();
}

module.exports = main;
