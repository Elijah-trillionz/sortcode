import React from 'react';

export const Loading = ({ independent }) => {
  // external loading
  return (
    <>
      <div
        className='loading-container'
        style={independent && styles.loadingContainer}
      >
        <div className='login-loader'>
          {/* <div className='inner-loading'></div> */}
        </div>
      </div>
    </>
  );
};

const styles = {
  // loadingContainer: {
  //   position: 'fixed',
  //   top: '4%',
  //   left: '50%',
  //   transform: 'translate(-50%, 0%)',
  //   zIndex: '999',
  // },
};
