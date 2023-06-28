import React from 'react';
import { Link } from 'react-router-dom';

export const ToursList = ({
  expens: { id, currency, description, title, users },
  deleteExpens,
  i,
}) => {
  return (
    <div key={i}>
      <Link
        to={{
          pathname: `/tours/${id}`,
        }}
        state={{
          id,
          currency,
          description,
          title,
          users,
        }}
        className='expensesElement'
      >
        <li className='li'>
          <div className='row'>
            <h4 className='text'>{title}</h4>
            <p className='description'>{description}</p>
            <p className='currency'>{currency}</p>
            <ul>
              {users.map((user, i) => (
                <li key={i}>{user.name}</li>
              ))}
            </ul>
          </div>
        </li>
      </Link>
      <button onClick={() => deleteExpens(id)}>Delete</button>
    </div>
  );
};
