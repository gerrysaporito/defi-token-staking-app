import React from 'react';
import { Staking } from './Staking';

export const Main = (props) => {
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: '600px', minHeight: '100vm' }}
        >
          <Staking {...props} />
        </main>
      </div>
    </div>
  );
};
