import assertRevert from "./helpers/assertRevert";
const OmniPlatformToken = artifacts.require("OmniPlatformToken");

const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract("OmniPlatformToken BasicToken", function(
  [_, owner, recipient, anotherAccount]
) {
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const mintAmount = 1000;

  beforeEach(async function() {
    this.token = await OmniPlatformToken.new({ from: owner });
  });

  describe("balanceOf", function() {
    describe("when the requested account has no tokens", function() {
      it("returns zero", async function() {
        const balance = await this.token.balanceOf(anotherAccount);

        assert.equal(balance, 0);
      });
    });

    describe("when the requested account has some tokens", function() {
      it("returns the balance of account", async function() {
        await this.token.mint(owner, mintAmount, {
          from: owner
        });
        const balance = await this.token.balanceOf(owner);
        assert.equal(balance, mintAmount);
      });
    });
  });

  describe("transfer", function() {
    describe("when the recipient is the contract address", function() {
      describe("when the sender does not have enough balance", function() {
        const amount = 101;
        it("reverts", async function() {
          await assertRevert(
            this.token.transfer(this.token.address, amount, {
              from: anotherAccount
            })
          );
        });
      });

      describe("when the sender has enough balance", function() {
        const amount = 100;
        it("it reverts", async function() {
          await assertRevert(
            this.token.transfer(this.token.address, amount, { from: owner })
          );
        });
      });
    });

    describe("when the recipient is not the zero address", function() {
      const to = recipient;
      const sender = anotherAccount;

      describe("when the sender does not have enough balance", function() {
        const amount = 100;
        it("reverts", async function() {
          await assertRevert(this.token.transfer(to, amount, { from: sender }));
        });
      });

      describe("when the sender has enough balance", function() {
        const amount = 100;

        it("transfers the requested amount", async function() {
          let senderBalance = await this.token.balanceOf(sender);
          assert.equal(senderBalance, 0);

          await this.token.mint(sender, 100, { from: owner });
          await this.token.transfer(to, amount, { from: sender });

          const recipientBalance = await this.token.balanceOf(to);
          assert.equal(recipientBalance, amount);

          senderBalance = await this.token.balanceOf(sender);
          assert.equal(senderBalance, 0);
        });

        it("emits a transfer event", async function() {
          await this.token.mint(sender, 100, { from: owner });

          const { logs } = await this.token.transfer(to, amount, {
            from: sender
          });

          assert.equal(logs.length, 1);
          assert.equal(logs[0].event, "Transfer");
          assert.equal(logs[0].args.from, sender);
          assert.equal(logs[0].args.to, to);
          assert(logs[0].args.value.eq(amount));
        });
      });
    });

    describe("when the recipient is the zero address", function() {
      const to = ZERO_ADDRESS;

      it("reverts", async function() {
        await assertRevert(this.token.transfer(to, 100, { from: owner }));
      });
    });
  });
});
