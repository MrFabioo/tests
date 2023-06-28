import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { db } from './firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';

export const ExpensDetail = () => {
  const location = useLocation();
  const { id } = location.state;
  const [expenses, setExpenses] = useState([]);

  const {idDetail} = useParams();

  useEffect(() => {
    const q = query(collection(db, `expenses/${id}/detail/`));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let expensesArr = [];
      QuerySnapshot.forEach((doc) => {
        expensesArr.push({ ...doc.data(), id: doc.id });
      });
      setExpenses(expensesArr);
    });
    return () => unsubscribe();
  }, []);

  const {id: idTest, cost, currency, payer} = expenses.filter(expense => expense.id === idDetail)

  console.log(idTest)

  console.log(expenses)


  return (
    <div>
      {id}
      {}
    </div>
  );
};
