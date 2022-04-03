import React from 'react';
import tetherImg from '../tether.png';

export const Staking = (props) => {
  const {
    // account,
    // tether,
    // rwd,
    // decentralBank,
    tetherBalance,
    rwdBalance,
    stakingBalance,
  } = props;

  return (
    <div id="content" className="mt-3">
      <table className="table text-muted text-center">
        <thead>
          <tr style={{ color: 'black' }}>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: 'black' }}>
            <td>{window.web3.utils.fromWei(stakingBalance, 'Ether')}USDT</td>
            <td>{window.web3.utils.fromWei(rwdBalance, 'Ether')}RWD</td>
          </tr>
        </tbody>
      </table>

      <div className="card mb-2" style={{ opacity: '0.9' }}>
        <form className="mb-3">
          <div style={{ borderSpacing: '0 1rem' }}>
            <label className="float-left" style={{ marginLeft: '15px' }}>
              <b>Stake Tokens</b>
            </label>
            <span className="float-right" style={{ marginRight: '8px' }}>
              Balance: {window.web3.utils.fromWei(tetherBalance, 'Ether')}
            </span>
            <div className="input-group mb-4">
              <input type="text" placeholder="0" required />
              <div className="input-group-open">
                <div className="input-group-text">
                  <img src={tetherImg} alt="tether" height="32" />
                  &nbsp;&nbsp;&nbsp;USDT
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block">
              DEPOSIT
            </button>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              WITHDRAW
            </button>
            <div className="card-body text-center" style={{ color: 'blue' }}>
              Airdrop
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
