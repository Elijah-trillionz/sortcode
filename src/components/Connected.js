import React from 'react';
// NOT NEEDED NOW
export const Connected = () => {
  return (
    <div>
      <div className='info-fil' title='Errors Or Success Indicator'>
        <div
          className='indicator-icon'
          style={{
            backgroundColor: 'red',
          }}
        >
          <i className='fa fa-exclamation-triangle'></i>
          Seems like you are offline.
        </div>
      </div>
    </div>
  );
};
