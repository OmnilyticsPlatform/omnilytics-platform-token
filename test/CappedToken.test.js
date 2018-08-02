import shouldBehaveLikeMintableToken from "./MintableToken.behaviour";
import shouldBehaveLikeCappedToken from "./CappedToken.behaviour";

var OmniPlatformToken = artifacts.require("OmniPlatformToken");

const decimals = 18;
const _cap = 1e27;

contract("OmniPlatformToken Capped", function([owner, anotherAccount]) {
  beforeEach(async function() {
    this.token = await OmniPlatformToken.new({ from: owner });
  });

  shouldBehaveLikeCappedToken([owner, anotherAccount, owner, _cap]);

  shouldBehaveLikeMintableToken([owner, anotherAccount, owner]);
});
