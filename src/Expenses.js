import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { db } from './firebase';
import { query, collection, onSnapshot, addDoc } from 'firebase/firestore';
import { ExpensesList } from './ExpensesList';

export const Expenses = () => {
  const location = useLocation();
  const { id, currency, title, users } = location.state;

  const [usersAmount, setUsersAmount] = useState(users);

  const [expensesDetail, setExpensesDetail] = useState([]);

  const [titleDetail, setTitleDetail] = useState('');
  const [costDetail, setCostDetail] = useState(0);
  const [currencyDetail, setCurrencyDetail] = useState(currency);
  const [payerDetail, setPayerDetail] = useState(usersAmount[0].name);
  const [transactionDateDetail, setTransactionDateDetail] = useState(
    new Date().toISOString().substr(0, 10)
  );

  useEffect(() => {
    const q = query(collection(db, `expenses/${id}/detail`));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let expensesArr = [];
      QuerySnapshot.forEach((doc) => {
        expensesArr.push({ ...doc.data(), id: doc.id });
      });
      setExpensesDetail(expensesArr);
    });
    return () => unsubscribe();
  }, [id]);
  console.log(expensesDetail, 'asd')

  const changeCurrencyDetail = (currency) => {
    setCurrencyDetail(currency);
  };

  const changePayerDetail = (payer) => {
    setPayerDetail(payer);
  };

  const handleCheckboxChange = (index) => {
    const updatedUsersAmount = [...usersAmount];
    updatedUsersAmount[index].isChecked = !updatedUsersAmount[index].isChecked;
    setUsersAmount(updatedUsersAmount);
  };

  const calculateCheckedUsers = () => {
    const checkedUsers = usersAmount.filter((user) => user.isChecked);
    const checkedUsersCount = checkedUsers.length;
    const costPerCheckedUser =
      checkedUsersCount > 0 ? costDetail / checkedUsersCount : 0;
    return { checkedUsersCount, costPerCheckedUser };
  };

  const { costPerCheckedUser } = calculateCheckedUsers();
  // const { checkedUsersCount, costPerCheckedUser } = calculateCheckedUsers();

  const handleSubmit = async (e) => {
    e.preventDefault(e);

    if (titleDetail === '') {
      alert('Please enter a title expens');
      return;
    }

    const checkedUserNames = usersAmount
      .filter((user) => user.isChecked)
      .map((user) => user.name);

    try {
      await addDoc(collection(db, `expenses/${id}/detail`), {
        title: titleDetail,
        cost: costDetail,
        currency: currencyDetail,
        payer: payerDetail,
        transactionDate: transactionDateDetail,
        checkedUserNames: checkedUserNames,
      });

      setTitleDetail('');
      setCostDetail(0);
      setTransactionDateDetail(new Date().toISOString().substr(0, 10));

      const resetUsersAmount = usersAmount.map((user) => ({
        ...user,
        isChecked: true,
      }));
      setUsersAmount(resetUsersAmount);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div>
      <div className='title'>
        <h4>{title}</h4>
        <p>
          {usersAmount?.map((user, i) =>
            i === usersAmount.length - 1 ? `${user.name}` : `${user.name}, `
          )}
        </p>
      </div>
      <div className='container'>
        <h3 className='heading'>Nowy wydatek</h3>
        <form className='form' onSubmit={handleSubmit}>
          <input
            className='title'
            type='text'
            placeholder='Title'
            value={titleDetail}
            onChange={(e) => setTitleDetail(e.target.value)}
          />
          <input
            className='cost'
            type='number'
            placeholder='Cost'
            value={costDetail}
            onChange={(e) => setCostDetail(e.target.value)}
          />
          <select
            className='currnecy'
            onChange={(e) => {
              changeCurrencyDetail(e.target.value);
            }}
            value={currencyDetail}
          >
            <option value='PLN'>PLN</option>
            <option value='EUR'>EUR</option>
            <option value='GBP'>GBP</option>
            <option value='USD'>USD</option>
          </select>
          <input
            className='transactionDate'
            type='date'
            value={transactionDateDetail}
            onChange={(e) => setTransactionDateDetail(e.target.value)}
          />
          <div>
            Zapłacone przez:
            <select
              className='payer'
              value={payerDetail}
              onChange={(e) => {
                changePayerDetail(e.target.value);
              }}
            >
              {usersAmount?.map((user, i) => (
                <option key={i} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className='users'>
            {usersAmount?.map((user, i) => (
              <div key={i}>
                <input
                  type='checkbox'
                  checked={user.isChecked}
                  onChange={() => handleCheckboxChange(i)}
                />
                {user.name}
                <input
                  type='number'
                  value={user.isChecked ? costPerCheckedUser : 0}
                  readOnly
                />
                {currencyDetail}
              </div>
            ))}
          </div>
          <button className='button' type='submit'>
            Add
          </button>
        </form>
      </div>
      <div className='expenses'>
        {expensesDetail?.map((expens, i) => (
          <ExpensesList
            key={i}
            expens={expens}
            i={i}
            currency={currency}
            id={id}
            usersAmount={usersAmount}
            idDetail={expens.id}
          />
        ))}
      </div>
      <Link to='/tours'>Back to product</Link>
    </div>
  );
};
