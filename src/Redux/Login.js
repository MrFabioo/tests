import React, { useState } from 'react';
import { login, logout } from './store';
import { useDispatch, useSelector } from 'react-redux';

export const Login = () => {
  const [newUserName, setNewUserName] = useState('');

  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.value.username);
  return (
    <h1>
      {username}
      <input onChange={(e) => setNewUserName(e.target.value)} />
      <button onClick={() => dispatch(login({ username: newUserName }))}>
        Submit Login
      </button>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </h1>
  );
};
