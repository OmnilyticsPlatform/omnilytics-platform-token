const OmniPlatformToken = artifacts.require("./OmniPlatformToken.sol");

const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("OmniPlatformToken", function(addresses) {
  let owner = addresses[0];
  const symbol = "OMN";
  const tokenName = "Omnilytics Platform Token";
  const decimals = 18;
  const cap = 1e27;
  let token;

  it("matches the token details", async function() {
    let instance = await OmniPlatformToken.deployed();
    assert.equal(await instance.symbol(), symbol);
    assert.equal(await instance.name(), tokenName);
    assert.equal(await instance.decimals(), decimals);
    assert.equal(await instance.cap(), cap);
  });
});
