import React from 'react';

export const InnerLoading = ({ isScorePage }) => {
  // inline loading
  return (
    <div
      className='loading-indicator'
      style={{ display: `${isScorePage ? 'inline-block' : 'flex'}` }}
    >
      <div className='loading-icons'>
        <p
          style={{ backgroundColor: `${isScorePage ? '#f4f4f4' : '#2e82ff'}` }}
        ></p>
        <p
          style={{ backgroundColor: `${isScorePage ? '#f4f4f4' : '#2e82ff'}` }}
        ></p>
        <p
          style={{ backgroundColor: `${isScorePage ? '#f4f4f4' : '#2e82ff'}` }}
        ></p>
        <p
          style={{ backgroundColor: `${isScorePage ? '#f4f4f4' : '#2e82ff'}` }}
        ></p>
      </div>
    </div>
  );
};
