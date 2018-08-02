const OmniPlatformToken = artifacts.require("OmniPlatformToken");
const TokenFactory = artifacts.require("TokenFactory");

async function getGasPriceForMethod(contract, gasPrice, methodName, ...args) {
  const gasResult = await contract[methodName].estimateGas(...args);
  var gas = Number(gasResult);

  console.log(methodName);
  console.log("gas estimation = " + gas + " units");
  console.log("gas cost estimation = " + gas * gasPrice + " wei");
  console.log(
    "gas cost estimation = " +
      OmniPlatformToken.web3.fromWei(gas * gasPrice, "ether") +
      " ether"
  );
  console.log("\n");
}

function getGasPrice(cb, Contract, methods) {
  OmniPlatformToken.web3.eth.getGasPrice(async function(error, result) {
    var gasPrice = Number(result);
    console.log("Gas Price is " + gasPrice + " wei\n"); // "10000000000000"

    // Get Contract instance
    const contract = await Contract.deployed();
    // Use the keyword 'estimateGas' after the function name to get the gas estimation for this particular function

    for (var i = 0; i < methods.length; i++) {
      await getGasPriceForMethod(contract, gasPrice, methods[i]);
    }

    cb();
  });
}

function main(cb) {
  getGasPrice(cb, OmniPlatformToken, ["totalSupply"]);
  getGasPrice(cb, TokenFactory, ["owner"]);
}

module.exports = main;
