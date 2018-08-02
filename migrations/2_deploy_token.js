var TokenVesting = artifacts.require("./TokenVesting.sol");
var OmniPlatformToken = artifacts.require("./OmniPlatformToken.sol");

module.exports = function(deployer, network, accounts) {
  const [_, owner, beneficiary] = accounts;
  deployer.deploy(OmniPlatformToken);
};
