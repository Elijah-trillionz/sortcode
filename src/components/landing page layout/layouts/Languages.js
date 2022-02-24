import React from 'react';

export const Languages = () => {
  return (
    <div className='languages-container'>
      <h2>Languages/Frameworks</h2>
      <div className='languages-content'>
        <div className='languages'>
          <ul>
            <li>
              <i className='fab fa-js-square'></i>
            </li>
            <li>
              <i className='fab fa-python'></i>
            </li>
            <li>
              <i className='fab fa-html5'></i>
            </li>
            <li>
              <i className='fab fa-css3'></i>
            </li>
            <li>
              <i className='fab fa-java'></i>
            </li>
            <li>
              <i className='fab fa-php'></i>
            </li>
            <li>
              <i className='fas fa-terminal'></i>
            </li>
            <li>
              <i className='fas fa-code-branch'></i>
            </li>
            <li>
              <i className='fas fa-code'></i>
            </li>
          </ul>
        </div>
      </div>
      <a href='/signup' className='action'>
        Get Started
      </a>
    </div>
  );
};
