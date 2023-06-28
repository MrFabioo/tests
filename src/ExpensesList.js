import React from 'react';
import { Link } from 'react-router-dom';

export const ExpensesList = ({
  expens: { title, payer, cost, transactionDate },
  id,
  i,
  currency,
}) => {
  return (
    <Link
      to={{
        pathname: `/tours/${id}/expensdetail`,
      }}
      state={{
        id,
        currency,
        // description,
        title,
        cost,
        payer,
        // users,
      }}
      className='expensesElement'
    >
      <div key={i}>
        <h5>{title}</h5>
        <p>Zapłacone przez: {payer}</p>
        <h5>{`${cost} ${currency}`}</h5>
        <p>{transactionDate}</p>
      </div>
    </Link>
  );
};
