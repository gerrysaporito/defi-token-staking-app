// SPDX-License-Identifier: NONE
pragma solidity ^0.8.13;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
  address public owner;
  string public name;
  Tether public tether;
  RWD public rwd;

  constructor (RWD _rwd, Tether _tether) {
    name = 'Decentral Bank';
    rwd = _rwd;
    tether = _tether;
  }
}
