import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export const Airdrop = ({ seconds, stakingBalance, airdropTokens }) => {
  const [state, setState] = useState({
    time: {},
    seconds: 1,
  });

  useEffect(() => {
    setState({
      time: secondsToTime(seconds),
      seconds: seconds,
    });

    airdropReleaseTokens();
  }, []);

  const startTimer = () => {
    const timer = setInterval(async () => {
      await setState((prev) => {
        if (prev.seconds === 0) {
          clearInterval(timer);
          airdropTokens();
          return {
            seconds: prev.seconds,
            time: secondsToTime(prev.seconds),
          };
        }

        return {
          seconds: prev.seconds - 1,
          time: secondsToTime(prev.seconds - 1),
        };
      });
    }, 1000);
  };

  const airdropReleaseTokens = () => {
    if (stakingBalance >= parseInt(window.web3.utils.toWei('50', 'ether'))) {
      startTimer();
    }
  };

  return (
    <div style={{ color: 'black' }}>
      {state.time.hours}:{state.time.minutes}:{state.time.seconds}
    </div>
  );
};

const secondsToTime = (seconds) => {
  const _hours = Math.floor(seconds / 3600);
  const _minutes = Math.floor((seconds % 3600) / 60);
  const _seconds = Math.ceil((seconds % 3600) % 60);

  return {
    hours: _hours,
    minutes: _minutes,
    seconds: _seconds,
  };
};
