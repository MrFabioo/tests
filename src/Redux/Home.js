import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {
  const username = useSelector((state) => state.user.value.username);
  return <h1>THIS IS THE HOME PAGE {username}</h1>;
};
