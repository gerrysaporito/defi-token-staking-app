// SPDX-License-Identifier: NONE
pragma solidity ^0.8.13;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
  address public owner;
  string public name;
  Tether public tether;
  RWD public rwd;

  address[] public stakers;

  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor (RWD _rwd, Tether _tether) {
    name = 'Decentral Bank';
    rwd = _rwd;
    tether = _tether;
    owner = msg.sender;
  }

  function depositTokens(uint _amount) public {
    require(_amount > 0, 'amount cannot be <= 0');

    // Transfer tether tokens to this contract address for staking
    tether.transferFrom(msg.sender, address(this), _amount);

    // Update staking balance
    stakingBalance[msg.sender] += _amount;

    if (!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
    }

    // Update staking balance
    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;
  }

  function issueTokens() public {
    // Require the owner to issue tokens only
    require(msg.sender == owner, 'caller must be the owner');

    for (uint i = 0; i < stakers.length; ++i) {
      address recipient = stakers[i];
      uint balance = stakingBalance[recipient] / 9; // Create percentage incentive for stakers
      if (balance > 0) rwd.transfer(recipient, balance);
    }
  }

  function unstakeTokens() public {
    uint balance = stakingBalance[msg.sender];

    require(balance > 0, 'staking balance >= 0');

    // Transfer the tokens to the specified contract address from our bank
    tether.transfer(msg.sender, balance);

    // Reset staking balance
    stakingBalance[msg.sender] = 0;

    // Update staking balance
    isStaking[msg.sender] = false;
   }
}
