import React from 'react';

export const Staking = () => {
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
            <td>USDT</td>
            <td>RWD</td>
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
              Balance:
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
