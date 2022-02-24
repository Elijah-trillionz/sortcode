import React from 'react';

export const Alert = ({ title, message }) => {
  setTimeout(() => {
    document.querySelector('.alert-modal').classList.add('active');
  }, 1000);

  return (
    <div className='alert-modal col-12'>
      <div className='alert-modal-container'>
        <div className='alert-header'>
          <p>{title}</p>
        </div>
        <div className='alert-message'>
          <p>{message}</p>
        </div>
        <div
          className='close-alert'
          onClick={() => {
            document.querySelector('.alert-modal').classList.remove('active');
          }}
        >
          <p>&times;</p>
        </div>
      </div>
    </div>
  );
};
