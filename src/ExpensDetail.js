import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from './firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';

export const ExpensDetail = ({ id_detail }) => {
  const location = useLocation();
  const { id } = location.state;
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `expenses/${id}/detail/${id_detail}`));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let expensesArr = [];
      QuerySnapshot.forEach((doc) => {
        expensesArr.push({ ...doc.data(), id: doc.id });
      });
      setExpenses(expensesArr);
    });
    return () => unsubscribe();
  }, []);

  console.log(expenses);
  return (
    <div>
      {id}
      {id_detail}
    </div>
  );
};
