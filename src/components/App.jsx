import React from 'react';
import { Navbar } from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import RWD from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import { Main } from './Main';

const App = () => {
  const [state, setState] = React.useState({
    account: '',
    tether: {},
    rwd: {},
    decentralBank: {},
    tetherBalance: '0',
    rwdBalance: '0',
    stakingBalance: '0',
  });
  const [loading, setLoading] = React.useState(true);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) window.web3 = new Web3(window.web3.currentProvider);
    else window.alert('No ethereum browser detected.');
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const account = (await web3.eth.getAccounts())[0];

    await setState((prevState) => ({ ...prevState, account: account }));

    // Load tether contract
    const networkId = await new web3.eth.net.getId();
    const tetherData = Tether.networks[networkId];

    if (tetherData) {
      const tether = await new web3.eth.Contract(
        Tether.abi,
        tetherData.address
      );
      await setState((prevState) => ({ ...prevState, tether }));

      let tetherBalance = await tether.methods.balanceOf(account).call();
      setState((prevState) => ({
        ...prevState,
        tetherBalance: tetherBalance.toString(),
      }));
    } else
      console.error(
        'Error: Tether Contract not deployed - no detected network.'
      );

    // Load rwd contract
    const rwdData = RWD.networks[networkId];
    if (rwdData) {
      const rwd = await new web3.eth.Contract(RWD.abi, rwdData.address);
      await setState((prevState) => ({ ...prevState, rwd }));

      let rwdBalance = await rwd.methods.balanceOf(account).call();
      setState((prevState) => ({
        ...prevState,
        rwdBalance: rwdBalance.toString(),
      }));
    } else
      console.error('Error: RWD Contract not deployed - no detected network.');

    // Load decentralbank contract
    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      const decentralBank = await new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );
      await setState((prevState) => ({ ...prevState, decentralBank }));

      let stakingBalance = await decentralBank.methods
        .stakingBalance(account)
        .call();
      setState((prevState) => ({
        ...prevState,
        stakingBalance: stakingBalance.toString(),
      }));
    } else
      console.error(
        'Error: DecentralBank Contract not deployed - no detected network.'
      );
  };

  const loadData = async () => {
    try {
      await loadWeb3();
      await loadBlockchainData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Navbar
        account={state.account}
        onClick={loadData}
        loading={loading}
        setLoading={setLoading}
      />
      {loading ? (
        <p id="loader" className="text-center" style={{ margin: '30px' }}>
          Connect Wallet...
        </p>
      ) : (
        <Main {...state} />
      )}
    </div>
  );
};

export default App;
