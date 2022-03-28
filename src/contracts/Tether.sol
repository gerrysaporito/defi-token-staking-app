// SPDX-License-Identifier: NONE
pragma solidity ^0.8.13;

contract Tether {
  string public name;
  string public symbol;
  uint public totalSupply;
  uint public decimals;

  constructor() {
    name = 'Mock Tether Token';
    symbol = 'mUSDT';
    totalSupply = 1000000000000000000000000;
    decimals = 18;
  }

  // modifier restricted() {
  //   if (msg.sender == owner) _;
  // }

  // function set_completed(uint completed) public restricted {
  //   last_completed_migration = completed;
  // }

  // function upgrade(address new_address) public restricted {
  //   Migrations upgraded = Migrations(new_address);
  //   upgraded.set_completed(last_completed_migration);
  // }
}
