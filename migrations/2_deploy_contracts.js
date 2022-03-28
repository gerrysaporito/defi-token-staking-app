const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
  // Deploy mock Tether contract
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  // Deploy mock reward token contract
  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  // Deploy Decentral Bank contract
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decentralBank = await DecentralBank.deployed();

  // Transfer all RWD tokens to Decentral Bank
  await rwd.transfer(decentralBank.address, '1000000000000000000000000'); // Taken from rwd contract
  await tether.transfer(accounts[1], '100000000000000000000'); // Taken from rwd contract
};

/*
===== TRUFFLE CONSOLE =====
tether = await Tether.deployed();
accounts = await web3.eth.getAccounts();
balance = await tether.balanceOf(accounts[1]);
convertBalance = web3.utils.fromWei(balance);
*/
