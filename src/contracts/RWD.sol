// SPDX-License-Identifier: NONE
pragma solidity ^0.8.13;

contract RWD {
  string public name;
  string public symbol;
  uint public totalSupply;
  uint public decimals;

  event Transfer (
    address indexed _from,
    address indexed _to,
    uint _value
  );

  event Approval (
    address indexed _owner,
    address indexed _spender,
    uint _value
  );

  mapping(
    address => uint256
  ) public balanceOf;

  mapping(
    address => mapping(
      address => uint256
    )
  ) public allowance;

  constructor() {
    name = 'Reward Token';
    symbol = 'RWD';
    totalSupply = 1000000000000000000000000;
    decimals = 18;
    balanceOf[msg.sender] = totalSupply;
  }

  /*
   * Transfer funds from one wallet to another.
   * Origin wallet must have enough funds to complete the transfer.
   */
  function transfer(address _to, uint256 _value) public returns (bool success) {
    // Check if sender has enough funds to transfer amount
    require(balanceOf[msg.sender] >= _value);

    // Transaction between wallets
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  /*
   * Allow 3rd party dapps to make a transaction on a wallet's behalf.
   * Allows a 3rd party dapp to put a deposit for a wallet.
   *
   * msg.sender = 3rd party
   */
  function approve(address _spender, uint256 _value) public returns (bool success) {
    allowance[msg.sender][_spender] = _value;

    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  /*
   * Allow 3rd party dapps to make a transaction on a wallet's behalf.
   * Allows a 3rd party dapps to accept a transaction if it's approved for the wallets.
   * 3rd party dapp must ensure that origin wallet must have enough funds to complete the transfer.
   *
   * msg.sender = 3rd party
   */
  function transferFrom (address _from, address _to, uint256 _value) public returns (bool success) {
    // Check if sender has enough funds to transfer amount
    require(balanceOf[msg.sender] >= _value);
    require(allowance[msg.sender][_from] >= _value);

    // Transaction between wallets
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[msg.sender][_from] -= _value;

    emit Transfer(_from, _to, _value);
    return true;
  }
}
