pragma solidity 0.4.21;

import "./lib/SafeMath.sol";
import "./lib/CappedToken.sol";
import "./lib/PausableToken.sol";

contract OmniPlatformToken is CappedToken, PausableToken {
  string public constant name = "Omnilytics Platform Token";
  string public constant symbol = "OMN";
  uint8 public constant decimals = 18;
  uint256 public constant cap = 1e27; // 1 billion * 10**18

  function OmniPlatformToken() CappedToken(cap) public {
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    // prevent token transfers to the contract address itself
    require(_to != address(this));
    return super.transfer(_to, _value);
  }
}