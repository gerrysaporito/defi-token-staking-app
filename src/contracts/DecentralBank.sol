// SPDX-License-Identifier: NONE
pragma solidity ^0.8.13;

contract DecentralBank {
  address public owner;
  string public name;

  constructor () {
    name = 'Decentral Bank';
  }
}
