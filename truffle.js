require("babel-register");
require("babel-polyfill");

var secrets = require("./secrets.js");
var HDWalletProvider = require("truffle-hdwallet-provider");
const LedgerWalletProvider = require("truffle-ledger-provider");
const INFURA_APIKEY = secrets.infura_apikey; // set your Infura API key
const INFURA_APIURL = `https://rinkeby.infura.io/v3/${INFURA_APIKEY}`;
const ledgerOptions = {
  networkId: 4,
  accountsOffset: 0
};

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777 // Match any network id
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01 // <-- Use this low gas price
    },
    rinkeby: {
      provider: new LedgerWalletProvider(ledgerOptions, INFURA_APIURL),
      // provider: function() {
      //   return new HDWalletProvider(secrets.mnemonic, INFURA_APIURL);
      // },
      network_id: 4,
      gas: 1161543,
      gasPrice: 1000000000
    }
  }
};
