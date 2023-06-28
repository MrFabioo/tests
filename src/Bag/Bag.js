import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  query,
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

export const Bag = () => {
  const [bag, setBag] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'bag'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let expensesArr = [];
      QuerySnapshot.forEach((doc) => {
        expensesArr.push({ ...doc.data(), id: doc.id });
      });
      setBag(expensesArr);
    });
    return () => unsubscribe();
  }, []);

  const createExpens = async (e) => {
    e.preventDefault(e);
    if (name === '') {
      alert('Please enter a title expens');
      return;
    }

    await addDoc(collection(db, 'bag'), {
      name: name,
    });
    setName('');
  };

  return (
    <div>
      <form onSubmit={createExpens} className='form'>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='name'
          type='text'
          placeholder='Name'
        />
        <button className='button' type='submit'>
          Add
        </button>
      </form>
      {bag?.map((item, i) => (
        <div key={i}>{item.name}</div>
        //   <ExpensesList
        //     key={i}
        //     expens={expens}
        //     i={i}
        //     currency={currency}
        //     id={id}
        //     usersAmount={usersAmount}
        //   />
      ))}
    </div>
  );
};
