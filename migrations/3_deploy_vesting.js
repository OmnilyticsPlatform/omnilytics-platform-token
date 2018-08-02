var TokenVesting = artifacts.require("./TokenVesting.sol");

module.exports = function(deployer, network, accounts) {
  const [_, owner, beneficiary1, beneficiary2] = accounts;
  deployer.deploy(
    TokenVesting,
    "0x4B43DC3d49476Dfc4F49151dD72E9FEE07cCb9De",
    1541814715683,
    0,
    100,
    true
  );
  deployer.deploy(
    TokenVesting,
    "0x4B43DC3d49476Dfc4F49151dD72E9FEE07cCb9De",
    1541814715683,
    0,
    100,
    true
  );
};
