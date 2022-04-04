import React from 'react';
import tetherImg from '../tether.png';

export const Staking = (props) => {
  const {
    tetherBalance,
    rwdBalance,
    stakingBalance,
    stakeTokens,
    unstakeTokens,
    setUpdated,
  } = props;

  const [amount, setAmount] = React.useState(0);

  const onChange = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const onStakeSubmit = async (e) => {
    e.preventDefault();
    const weiAmount = await window.web3.utils.toWei(amount.toString(), 'Ether');
    await stakeTokens(weiAmount);
    await setUpdated((prev) => !prev);
  };

  const onUnstakeSubmit = async (e) => {
    e.preventDefault();
    const weiAmount = await window.web3.utils.toWei(amount.toString(), 'Ether');
    await unstakeTokens(weiAmount);
    await setUpdated((prev) => !prev);
  };

  return (
    <div id="content" className="mt-3">
      <table className="table text-muted text-center">
        <thead>
          <tr style={{ color: 'white' }}>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: 'white' }}>
            <td>{window.web3.utils.fromWei(stakingBalance, 'Ether')}USDT</td>
            <td>{window.web3.utils.fromWei(rwdBalance, 'Ether')}RWD</td>
          </tr>
        </tbody>
      </table>

      <div className="card mb-2" style={{ opacity: '0.9' }}>
        <form className="mb-3" onSubmit={onStakeSubmit}>
          <div style={{ borderSpacing: '0 1rem' }}>
            <label className="float-left" style={{ marginLeft: '15px' }}>
              <b>Stake Tokens</b>
            </label>
            <span className="float-right" style={{ marginRight: '8px' }}>
              Balance: {window.web3.utils.fromWei(tetherBalance, 'Ether')}
            </span>
            <div className="input-group mb-4">
              <input
                type="text"
                placeholder="0"
                value={amount}
                onChange={onChange}
                required
              />
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
            <button
              type="submit"
              onClick={onUnstakeSubmit}
              className="btn btn-primary btn-lg btn-block"
            >
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
