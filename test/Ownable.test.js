import EVMRevert from "./helpers/EVMRevert";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const OmniPlatformToken = artifacts.require("OmniPlatformToken");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("OmniPlatformToken Ownable", function(accounts) {
  beforeEach(async function() {
    this.ownable = await OmniPlatformToken.new({ from: accounts[0] });
  });

  describe("as an ownable", function() {
    it("should have an owner", async function() {
      let owner = await this.ownable.owner();
      owner.should.not.eq(ZERO_ADDRESS);
    });

    it("changes owner after transfer", async function() {
      let other = accounts[1];
      await this.ownable.transferOwnership(other);
      let owner = await this.ownable.owner();

      owner.should.eq(other);
    });

    it("should prevent non-owners from transfering", async function() {
      const other = accounts[2];
      const owner = await this.ownable.owner.call();
      owner.should.not.eq(other);
      await this.ownable
        .transferOwnership(other, { from: other })
        .should.be.rejectedWith(EVMRevert);
    });

    it("should guard ownership against stuck state", async function() {
      let originalOwner = await this.ownable.owner();
      await this.ownable
        .transferOwnership(null, { from: originalOwner })
        .should.be.rejectedWith(EVMRevert);
    });
  });
});
