import React, { useEffect, useState } from 'react';
import { ToursList } from './ToursList';
import { db } from './firebase';
import {
  query,
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import './Tours.css';

export const Tours = () => {
  const [expenses, setExpenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('PLN');
  const [users, setUsers] = useState([{ name: '', isChecked: true }]);

  useEffect(() => {
    const q = query(collection(db, 'expenses'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let expensesArr = [];
      QuerySnapshot.forEach((doc) => {
        expensesArr.push({ ...doc.data(), id: doc.id });
      });
      setExpenses(expensesArr);
    });
    return () => unsubscribe();
  }, []);

  const createExpens = async (e) => {
    e.preventDefault(e);
    if (title === '') {
      alert('Please enter a title expens');
      return;
    }

    if (users[0] === '') {
      alert('Please add at least one user');
      return;
    }

    await addDoc(collection(db, 'expenses'), {
      title: title,
      description: description,
      currency: currency,
      users: users,
    });
    setTitle('');
    setDescription('');
    setCurrency('PLN');
    setUsers(['']);
  };

  const deleteExpens = async (id) => {
    await deleteDoc(doc(db, 'expenses', id));

    const querySnapshot = await getDocs(
      collection(db, 'expenses', id, 'detail')
    );
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  };

  const changeCurrency = (currency) => {
    setCurrency(currency);
  };

  const handleAddUser = () => {
    const lastUser = users[users.length - 1];
    if (lastUser !== '') {
      setUsers([...users, { name: '', isChecked: true }]);
    } else {
      setErrorMessage('Wypełnij puste pole !!!');
    }
  };

  const handleUserChange = (e, i) => {
    const newUser = [...users];
    newUser[i].name = e.target.value;
    setUsers(newUser);
  };

  const handleUserFocus = () => {
    setErrorMessage('');
  };

  return (
    <div className='bg'>
      <div className='container'>
        <h3 className='heading'>Expenses App</h3>
        <form onSubmit={createExpens} className='form'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='title'
            type='text'
            placeholder='Title'
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='description'
            type='text'
            placeholder='Description'
          />
          <select
            className='currnecy'
            onChange={(e) => {
              changeCurrency(e.target.value);
            }}
            value={currency}
          >
            <option value='PLN'>PLN</option>
            <option value='EUR'>EUR</option>
            <option value='GBP'>GBP</option>
            <option value='USD'>USD</option>
          </select>
          <div className='users'>
            {users?.map((user, i) => (
              <input
                key={i}
                className='user'
                type='text'
                value={user.name}
                placeholder='User name'
                onChange={(e) => handleUserChange(e, i)}
                onFocus={handleUserFocus}
              />
            ))}

            <button className='button' type='button' onClick={handleAddUser}>
              New user
            </button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
          <button className='button' type='submit'>
            Add
          </button>
        </form>
        <ul>
          {expenses.map((expens, i) => (
            <ToursList key={i} expens={expens} deleteExpens={deleteExpens} />
          ))}
        </ul>
        {expenses.length < 1 ? null : (
          <p className='count'>{`You have ${expenses.length} expenses`}</p>
        )}
      </div>
    </div>
  );
};
