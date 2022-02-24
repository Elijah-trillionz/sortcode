import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const ErrorHandler = ({ errorMsg, statusCode }) => {
  const [redirect, setRedirect] = useState(false);

  if (statusCode === 401) {
    setTimeout(() => {
      setRedirect(true);
    }, 3000);
  }

  return (
    <div className='handler'>
      {redirect && <Redirect push to='/login' />}
      <div className='error-handler'>
        <p>
          <i className='fas fa-exclamation-triangle'></i>
          {errorMsg}
        </p>
      </div>
    </div>
  );
};
