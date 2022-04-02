import React from 'react';
import BANK from '../bank.png';

export const Navbar = ({ account, onClick, loading, setLoading }) => {
  const _onClick = async (e) => {
    e.preventDefault();
    await onClick();
    await setLoading(false);
  };

  return (
    <nav
      className="navbar navbar-dark fixed-top shadow p-0"
      style={{ backgroundColor: 'black', height: '50px' }}
    >
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        style={{ color: 'white' }}
        href="/"
      >
        <img
          src={BANK}
          width="50"
          height="30"
          className="d-inline-block align-top"
          alt="Bank logo"
        />
        &nbsp; DAPP Yield Staking (Decentralied Banking)
      </a>
      <ul className="navbar-nav px-3">
        {loading ? (
          <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
            <button onClick={_onClick}>Connect Wallet</button>
          </li>
        ) : (
          <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
            <small className="" style={{ color: 'white' }}>
              ACCOUNT NUMBER: {account}
            </small>
          </li>
        )}
      </ul>
    </nav>
  );
};
