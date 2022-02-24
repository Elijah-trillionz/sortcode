import React from 'react';

export const Header = () => {
  const openNav = () => {
    document.querySelector('.nav').classList.add('open-nav');
  };
  const closeNav = () => {
    document.querySelector('.nav').classList.remove('open-nav');
  };

  window.addEventListener('scroll', () => {
    if (window.location.href.indexOf('/dashboard') === -1) {
      if (document.querySelector('html').scrollTop > 40) {
        document.querySelector('.top-content').classList.add('sticky');
      } else {
        document.querySelector('.top-content').classList.remove('sticky');
      }
    }
  });

  return (
    <header className='landing-page-header'>
      <div className='header-container'>
        <div className='top-content'>
          <div className='logo'>
            <svg
              width='364'
              height='400'
              viewBox='0 0 364 400'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              id='logo'
            >
              <path
                d='M181.969 399.945C170.914 399.945 159.863 397.101 150.004 391.417L32.0234 323.382C12.2695 311.992 0 290.753 0 267.953V131.992C0 109.191 12.2695 87.9526 32.0234 76.562L150.004 8.52686C169.723 -2.84424 194.215 -2.84033 213.934 8.52686L331.914 76.562C351.668 87.9526 363.938 109.191 363.938 131.992V267.953C363.938 290.753 351.668 311.992 331.914 323.382L213.934 391.417C204.074 397.101 193.02 399.945 181.969 399.945V399.945ZM181.969 29.9878C176.098 29.9878 170.227 31.4956 164.992 34.5151L47.0078 102.55C36.5156 108.601 30 119.878 30 131.992V267.953C30 280.062 36.5156 291.343 47.0078 297.394L164.992 365.425C175.465 371.464 188.473 371.464 198.945 365.425L316.93 297.394C327.422 291.343 333.938 280.062 333.938 267.953V131.992C333.938 119.882 327.422 108.601 316.93 102.55L198.945 34.5151C193.711 31.4956 187.84 29.9878 181.969 29.9878V29.9878Z'
                fill='#2E82FF'
              />
              <path
                d='M98.7227 264.242C94.4609 264.246 90.2305 262.441 87.2656 258.933C81.9141 252.609 82.6992 243.144 89.0273 237.792L133.723 199.972L89.0273 162.152C82.7031 156.8 81.9141 147.335 87.2656 141.011C92.6133 134.687 102.078 133.898 108.402 139.25L166.633 188.519C170 191.371 171.945 195.558 171.945 199.972C171.945 204.382 170 208.574 166.633 211.421L108.402 260.695C105.586 263.078 102.145 264.242 98.7227 264.242Z'
                fill='#2E82FF'
              />
              <path
                d='M265.223 264.242H194.676C186.391 264.242 179.676 257.527 179.676 249.242C179.676 240.96 186.391 234.242 194.676 234.242H265.223C273.508 234.242 280.223 240.96 280.223 249.242C280.223 257.527 273.508 264.242 265.223 264.242Z'
                fill='#2E82FF'
              />
            </svg>
            <h3>SortCode</h3>
          </div>
          <nav>
            <div className='hamburger' onClick={openNav}>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <div className='nav'>
              <div className='sim'>
                <a href='#limk'>Donate</a>
                <a href='#github'>GitHub</a>
              </div>
              <div className='action-button'>
                <a href='/login' className='login'>
                  <i className='fas fa-door-open mob-only'></i>
                  Login
                </a>
                <a href='/signup' className='signup'>
                  Sign Up
                </a>
              </div>
              <div className='close-btn mob-only' onClick={closeNav}>
                &times;
              </div>
            </div>
          </nav>
        </div>
        <div className='bottom-content'>
          <div className='intro'>
            <i className='fas fa-terminal code-2'></i>
            <h1>Improve with more Code!!</h1>
            <h2>See other's perspective</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. A
              molestiae velit fugiat tempora dolorem reprehenderit cum magnam
              laborum, officiis accusamus!
            </p>
            <a href='/signup' className='action'>
              Get Started
            </a>
          </div>
        </div>
        <div className='svg'>
          <svg
            width='550'
            height='831'
            viewBox='0 0 650 931'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M32.0001 148C-160.75 -199.519 575 -5.00012 928 23.9999L721 891H677C583.5 891 677.442 1012.85 400.5 831C317.5 776.5 360.113 602.496 296.5 584.5C220.5 563 235 514 32.0001 148Z'
              fill='#222222'
            />
          </svg>
        </div>
        {/* <svg
          width='70'
          height='70'
          viewBox='0 0 70 70'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='code-1'
        >
          <path
            d='M27.4167 48.4167L14 35L27.4167 21.5833L23.3333 17.5L5.83334 35L23.3333 52.5L27.4167 48.4167ZM42.5833 48.4167L56 35L42.5833 21.5833L46.6667 17.5L64.1667 35L46.6667 52.5L42.5833 48.4167V48.4167Z'
            fill='#666'
          />
        </svg> */}
      </div>
    </header>
  );
};
