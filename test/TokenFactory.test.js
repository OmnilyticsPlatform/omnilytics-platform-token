import EVMRevert from "./helpers/EVMRevert";
const TokenFactory = artifacts.require("TokenFactory");
const OmniPlatformToken = artifacts.require("OmniPlatformToken");

const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("TokenFactory", function([_, owner, multisigWallet]) {
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  beforeEach(async function() {
    this.tokenFactory = await TokenFactory.new({ from: owner });
  });

  describe("correct ownership", function() {
    it("should be correct owner", async function() {
      const factoryOwner = await this.tokenFactory.owner();
      assert.equal(factoryOwner, owner);
    });
  });

  describe("create", function() {
    it("should fail if address 0x0", async function() {
      await this.tokenFactory
        .create(ZERO_ADDRESS, { from: owner })
        .should.be.rejectedWith(EVMRevert);
    });

    it("should fail if address of self", async function() {
      await this.tokenFactory
        .create(this.tokenFactory.address, { from: owner })
        .should.be.rejectedWith(EVMRevert);
    });

    it("should fail if not owner", async function() {
      await this.tokenFactory
        .create(this.tokenFactory.address, { from: multisigWallet })
        .should.be.rejectedWith(EVMRevert);
    });

    it("should create successfully", async function() {
      const { logs } = await this.tokenFactory.create(multisigWallet, {
        from: owner
      });
      logs.length.should.equal(1);
      logs[0].event.should.equal("ContractInstantiation");
      logs[0].args.contractAddress.should.be.a("string");
      const tokenAddress = logs[0].args.contractAddress;

      const tokenAddressStored = await this.tokenFactory.contracts(0);
      tokenAddressStored.should.be.equal(tokenAddress);

      const token = await OmniPlatformToken.at(tokenAddress);
      const tokenOwner = await token.owner();
      tokenOwner.should.equal(multisigWallet);
    });
  });
});
