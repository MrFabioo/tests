import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <div>
      <Link to='/'> HOME </Link>
      <Link to='/tours'> Tours </Link>
      <Link to='/redux'> Redux </Link>
      <Link to='/bag'> Bag </Link>
    </div>
  );
};
