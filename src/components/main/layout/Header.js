import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../../context/global states/UserState';
import { ErrorHandler } from './ErrorHandler';
import { ChallengeContext } from '../../../context/challenge states/ChallengeState';

export const Header = ({ openSideNav }) => {
  const [runningTimer, setRunningTimer] = useState(false);
  const [timeCounter, setTimeCounter] = useState(0);
  const { linkInfo, globalError, staticError } = useContext(UserContext);
  const {
    currentTaskId,
    displaySample,
    taskSample,
    getTasksDetail,
  } = useContext(ChallengeContext);
  const { destination, title, className } = linkInfo;

  let sec = 0,
    min = 0;
  const startTimer = () => {
    if (!runningTimer) {
      document.querySelectorAll('.timer-icon').forEach((value) => {
        value.classList.add('active');
        value.style.pointerEvents = 'none';
      });
      startTiming();
    }
  };

  // process counting
  const startTiming = () => {
    setRunningTimer(true);
    sec++;
    if (sec >= 60) {
      sec = 0;
      min++;
    }
    document.querySelectorAll('.timer-icon').forEach((value) => {
      if (min < 10 && sec < 10) {
        value.querySelector('.timer').innerText = `0${min}:0${sec}`;
      } else if (min < 10 && sec >= 10) {
        value.querySelector('.timer').innerText = `0${min}:${sec}`;
      } else if (min >= 10 && sec < 10) {
        value.querySelector('.timer').innerText = `${min}:0${sec}`;
      } else {
        value.querySelector('.timer').innerText = `${min}:${sec}`;
      }
    });
    const t = setTimeout(startTiming, 1000);
    setTimeCounter(t);
  };

  // stop timer
  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      // end timer on F4
      if (runningTimer && timeCounter) {
        if (event.key === 'F4') {
          clearTimeout(timeCounter);
          // eslint-disable-next-line
          setRunningTimer(false);
        }
      }
    });
  }, [runningTimer, timeCounter]);

  if (/tasks\/history/gi.test(window.location.href)) {
    document.querySelectorAll('.challenge-only').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('#mini-menu').forEach((value) => {
      value.style.display = 'block';
    });
    document.querySelectorAll('#history').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('.level').forEach((value) => {
      value.style.display = 'block';
    });
  } else if (
    /tasks\/code/gi.test(window.location.href) ||
    /tasks\/leaderboard/gi.test(window.location.href)
  ) {
    document.querySelectorAll('.challenge-only').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('.level').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('#mini-menu').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('#history').forEach((value) => {
      value.style.display = 'block';
    });
  } else if (/tasks-upvoted/gi.test(window.location.href)) {
    document.querySelectorAll('.challenge-only').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('.level').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('#mini-menu').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('#history').forEach((value) => {
      value.style.display = 'block';
    });
  } else if (/tasks/gi.test(window.location.href)) {
    document.querySelectorAll('.challenge-only').forEach((value) => {
      // two exists, one for mobile and desktop
      value.style.display = 'block';
    });
    document.querySelectorAll('#mini-menu').forEach((value) => {
      // only one mini-menu, just avoiding react from rendering null
      value.style.display = 'block';
    });
    document.querySelectorAll('#history').forEach((value) => {
      // only one mini-menu, just avoiding react from rendering null
      value.style.display = 'none';
    });
    document.querySelectorAll('.level').forEach((value) => {
      value.style.display = 'block';
    });
  } else {
    document.querySelectorAll('.challenge-only').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('.level').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('#mini-menu').forEach((value) => {
      value.style.display = 'none';
    });
    document.querySelectorAll('#history').forEach((value) => {
      value.style.display = 'block';
    });
  }

  const openMiniMenu = () => {
    document.getElementById('mini-menu').classList.toggle('open');
  };

  const displayTaskSample = () => {
    if (taskSample) {
      return displaySample(currentTaskId, true); // cancel it
    }

    return displaySample(currentTaskId, false); // display it
  };

  const openDifficultyLevelModal = () => {
    document.querySelector('.difficulty-lvl-modal').classList.toggle('active');
  };

  const filterUserTasks = (lvl) => {
    localStorage.setItem('difficultyLvl', lvl);

    getTasksDetail();
  };

  return (
    <header>
      <>
        {globalError && (
          <ErrorHandler
            errorMsg={globalError.errorMsg}
            statusCode={globalError.status}
            context={UserContext}
            from='global'
          />
        )}
        {staticError && <Redirect push to='/login' />}
      </>
      <h2>
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
        SortCode
      </h2>
      <div className='desktop-sponsor'>
        <div
          className='timer-container sample challenge-only'
          onClick={() => displayTaskSample()}
        >
          <p className='header-icon'>
            <svg
              version='1.1'
              id='Capa_1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='46.079px'
              height='46.079px'
              viewBox='0 0 46.079 46.079'
            >
              <g>
                <g>
                  <path
                    d='M39.1,24.563c0-2.29-1.855-4.143-4.145-4.143h-7.334V13.06c0-2.289-1.868-4.145-4.156-4.145
			c-2.288,0-4.156,1.855-4.156,4.145v7.362h-7.371c-2.289,0-4.146,1.867-4.146,4.156s1.856,4.155,4.146,4.155h7.371v7.33
			c0,2.289,1.867,4.145,4.156,4.145c2.289,0,4.156-1.855,4.156-4.145v-7.358l7.338,0.003C37.247,28.708,39.1,26.852,39.1,24.563z'
                  />
                  <path
                    d='M2.487,14.938c1.372,0,2.487-1.111,2.487-2.483V4.976h7.43c1.372,0,2.483-1.083,2.483-2.455
			c0-1.371-1.111-2.454-2.483-2.454H2.473C1.101,0.066,0,1.152,0,2.524v9.931C0,13.827,1.116,14.938,2.487,14.938z'
                  />
                  <path
                    d='M43.591,31.126c-1.372,0-2.487,1.112-2.487,2.483v7.429h-7.422c-1.371,0-2.482,1.116-2.482,2.487s1.111,2.486,2.482,2.486
			h9.932c1.371,0,2.466-1.101,2.466-2.472V33.61C46.078,32.239,44.962,31.126,43.591,31.126z'
                  />
                  <path
                    d='M12.465,41.104H5.04v-7.435c0-1.371-1.116-2.481-2.487-2.481c-1.372,0-2.487,1.11-2.487,2.481v9.933
			c0,1.371,1.097,2.477,2.468,2.477h9.931c1.372,0,2.483-1.116,2.483-2.487C14.948,42.221,13.836,41.104,12.465,41.104z'
                  />
                  <path
                    d='M33.62,4.976h7.418v7.419c0,1.371,1.116,2.482,2.487,2.482s2.486-1.111,2.486-2.482V2.462C46.012,1.091,44.923,0,43.551,0
			h-9.932c-1.371,0-2.482,1.116-2.482,2.487C31.137,3.858,32.249,4.976,33.62,4.976z'
                  />
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </p>
          <div className='tooltip'>
            <span className='tooltip-text'>See Task Sample</span>
          </div>
        </div>
        <div className='timer-container timer-icon challenge-only'>
          <p className='header-icon' id='timer' onClick={() => startTimer()}>
            <i className='fa fa-clock'></i>
            <span className='timer'>00:00</span>
          </p>
          <div className='tooltip long'>
            <span className='tooltip-text'>
              Click to Start
              <br />
              F4 to End
            </span>
          </div>
        </div>
        <div className='timer-container level'>
          <p className='header-icon'>
            <svg
              version='1.1'
              id='Capa_1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 512 512'
            >
              <g transform='translate(1 1)'>
                <g>
                  <g>
                    <path
                      d='M105.667,343.021V20.333C105.667,8.551,96.115-1,84.333-1C72.551-1,63,8.551,63,20.333v322.688
				c-36.807,9.472-64,42.88-64,82.645C-1,472.798,37.202,511,84.333,511s85.333-38.202,85.333-85.333
				C169.667,385.902,142.473,352.493,105.667,343.021z M84.333,468.333c-23.567,0-42.667-19.099-42.667-42.667
				S60.766,383,84.333,383S127,402.099,127,425.667S107.901,468.333,84.333,468.333z'
                    />
                    <path
                      d='M511,84.333C511,37.202,472.798-1,425.667-1s-85.333,38.202-85.333,85.333c0,39.765,27.193,73.173,64,82.645v322.688
				c0,11.782,9.551,21.333,21.333,21.333S447,501.449,447,489.667V166.979C483.807,157.507,511,124.098,511,84.333z M425.667,127
				C402.099,127,383,107.901,383,84.333s19.099-42.667,42.667-42.667s42.667,19.099,42.667,42.667S449.234,127,425.667,127z'
                    />
                    <path
                      d='M276.333,172.355V20.333C276.333,8.551,266.782-1,255-1s-21.333,9.551-21.333,21.333v152.021
				c-36.807,9.472-64,42.88-64,82.645s27.193,73.173,64,82.645v152.021c0,11.782,9.551,21.333,21.333,21.333
				s21.333-9.551,21.333-21.333V337.645c36.807-9.472,64-42.88,64-82.645S313.14,181.827,276.333,172.355z M255,297.667
				c-23.567,0-42.667-19.099-42.667-42.667s19.099-42.667,42.667-42.667s42.667,19.099,42.667,42.667S278.567,297.667,255,297.667z'
                    />
                  </g>
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </p>
          <div className='tooltip longer'>
            <span className='tooltip-text'>
              <span onClick={() => filterUserTasks('beginners')}>Beginner</span>
              <span onClick={() => filterUserTasks('intermediates')}>
                Intermediate
              </span>
              <span onClick={() => filterUserTasks('experts')}>Expert</span>
            </span>
          </div>
        </div>
        <div>
          <a
            href='https://opencollective.com/sortcodeio'
            target='_blank'
            rel='noreferrer'
            className='sponsor'
          >
            <span> Donate</span>
            <svg
              version='1.1'
              id='Layer_1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 712 512'
            >
              <g>
                <g>
                  <path
                    d='M377.146,0.709C375.909,0.235,374.625,0,373.334,0c-2.341-0.001-4.677,0.767-6.583,2.271
			c-0.375,0.302-39.729,30.917-71.292,40.896c-7.5,2.365-18.063,5.313-30.188,8.708c-57.896,16.188-107.146,30.917-123.479,47.25
			c-18.215,18.215-30.176,89.999-34.029,116.426C46.788,225.3,0,277.653,0,341.334c0,70.583,57.417,128,128,128
			s128-56.958,128-127.542c0-15.505-2.965-30.628-8.499-45.151c18.984-10.654,38.482-18.049,52.186-19.359
			c2.979-0.281,5.813-0.406,8.604-0.542c15.396-0.719,31.333-1.458,60.646-22.781c15.75-11.448,24.813-26.396,34.417-42.208
			c13.167-21.75,26.813-44.229,60.667-63.854c3.292-1.906,5.313-5.427,5.313-9.229C469.334,37.167,378.063,1.063,377.146,0.709z
			 M128,448.459c-58.813,0-106.667-47.854-106.667-106.667S69.188,235.125,128,235.125c11.629,0,23.115,2.094,34.053,5.777
			c-8.508,6.656-16.991,14.608-23.919,23.122C136.935,259.444,132.959,256,128,256c-5.896,0-10.667,4.771-10.667,10.667v11.206
			c-18.046,2.615-32,18.036-32,36.794c0,20.583,16.75,37.333,37.333,37.333h10.667c8.813,0,16,7.177,16,16c0,8.823-7.188,16-16,16
			H96c-5.896,0-10.667,4.771-10.667,10.667c0,5.896,4.771,10.667,10.667,10.667h21.333v10.667c0,5.896,4.771,10.667,10.667,10.667
			c5.896,0,10.667-4.771,10.667-10.667v-11.206c18.046-2.615,32-18.036,32-36.794c0-20.583-16.75-37.333-37.333-37.333h-10.667
			c-8.813,0-16-7.177-16-16s7.188-16,16-16h0.495c0.27,6.961,2.926,13.171,7.964,18.208c9.771,9.76,22.125,13.688,35.313,13.688
			c21.161,0,44.445-10.147,62.648-22.518c3.693,10.918,5.581,22.225,5.581,33.747C234.667,400.605,186.813,448.459,128,448.459z
			 M385.104,200.688c-8.813,14.531-16.417,27.083-28.708,36.021c-24.146,17.563-35.167,18.073-49.104,18.719
			c-3.125,0.146-6.292,0.302-9.646,0.625c-21.604,2.052-52.896,15.333-79.708,33.833c-23.813,16.469-56.438,27.198-71.729,11.906
			c-1.25-1.25-2.292-2.938-1.521-6.76c3.396-16.708,34.479-43.677,51.312-50.479c20.229-8.167,68.542-30.281,80.521-59.135
			c1.354-3.281,1-7.042-0.979-10c-7.104-10.667-18.229-15.531-26.333-19.094c-2.479-1.083-5.75-2.344-5.771-2.396
			c-3.021-4.385-8.854-5.823-13.542-3.469c-6.5,3.25-23.854,8.25-30,9.906c-3.021,0.813-5.542,2.917-6.875,5.75l-25.591,54.158
			c-12.195-3.949-24.923-6.216-37.822-6.38c5.99-38.84,17.167-89.583,27.267-99.684c13.708-13.698,76.583-31.281,114.146-41.792
			c12.375-3.469,23.188-6.49,30.854-8.917c28.333-8.938,60.458-31.375,72.833-40.51c17.042,8.406,70.271,40.167,73.167,109.719
			C413.167,154.407,397.667,179.959,385.104,200.688z M189.104,224.323l21.125-44.688c5.75-1.635,15.375-4.5,22.875-7.375
			c2.271,1.292,4.813,2.406,7.542,3.594c4.396,1.938,9.229,4.052,12.979,7.01C242.5,198.459,213.229,214.469,189.104,224.323z'
                  />
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </a>
          <div className='menu-icon' onClick={() => openSideNav()}>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </div>
        </div>
      </div>
      <div className='mobile-menu'>
        <div className='timer-container timer-icon challenge-only'>
          <p
            className='header-icon'
            id='timer'
            title='Start Timer'
            onClick={() => {
              startTimer();
              setRunningTimer(true);
            }}
          >
            <i className='fa fa-clock'></i>
            <span className='timer'>00:00</span>
          </p>
          <div className='tooltip'>
            <span className='tooltip-text'>
              Click to Start
              <br />
              F4 to End
            </span>
          </div>
        </div>
        <div className='menu-icon' onClick={() => openSideNav()}>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
      </div>
      <p id='history' title={title}>
        <Link to={destination}>
          <i className={className}></i>
          <samp className='desktop-only'>{title}</samp>
        </Link>
      </p>
      <div id='mini-menu' onClick={openMiniMenu}>
        <div className='mini-hamburger'>
          <div></div>
          <div></div>
        </div>
        <div className='mini-menu-items'>
          <span
            title='Task Sample'
            className='challenge-only'
            onClick={() => displayTaskSample()}
          >
            <svg
              version='1.1'
              id='Capa_1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='46.079px'
              height='46.079px'
              viewBox='0 0 46.079 46.079'
            >
              <g>
                <g>
                  <path
                    d='M39.1,24.563c0-2.29-1.855-4.143-4.145-4.143h-7.334V13.06c0-2.289-1.868-4.145-4.156-4.145
			c-2.288,0-4.156,1.855-4.156,4.145v7.362h-7.371c-2.289,0-4.146,1.867-4.146,4.156s1.856,4.155,4.146,4.155h7.371v7.33
			c0,2.289,1.867,4.145,4.156,4.145c2.289,0,4.156-1.855,4.156-4.145v-7.358l7.338,0.003C37.247,28.708,39.1,26.852,39.1,24.563z'
                  />
                  <path
                    d='M2.487,14.938c1.372,0,2.487-1.111,2.487-2.483V4.976h7.43c1.372,0,2.483-1.083,2.483-2.455
			c0-1.371-1.111-2.454-2.483-2.454H2.473C1.101,0.066,0,1.152,0,2.524v9.931C0,13.827,1.116,14.938,2.487,14.938z'
                  />
                  <path
                    d='M43.591,31.126c-1.372,0-2.487,1.112-2.487,2.483v7.429h-7.422c-1.371,0-2.482,1.116-2.482,2.487s1.111,2.486,2.482,2.486
			h9.932c1.371,0,2.466-1.101,2.466-2.472V33.61C46.078,32.239,44.962,31.126,43.591,31.126z'
                  />
                  <path
                    d='M12.465,41.104H5.04v-7.435c0-1.371-1.116-2.481-2.487-2.481c-1.372,0-2.487,1.11-2.487,2.481v9.933
			c0,1.371,1.097,2.477,2.468,2.477h9.931c1.372,0,2.483-1.116,2.483-2.487C14.948,42.221,13.836,41.104,12.465,41.104z'
                  />
                  <path
                    d='M33.62,4.976h7.418v7.419c0,1.371,1.116,2.482,2.487,2.482s2.486-1.111,2.486-2.482V2.462C46.012,1.091,44.923,0,43.551,0
			h-9.932c-1.371,0-2.482,1.116-2.482,2.487C31.137,3.858,32.249,4.976,33.62,4.976z'
                  />
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </span>
          <span title='Difficulty Level' onClick={openDifficultyLevelModal}>
            <svg
              version='1.1'
              id='Capa_1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 512 512'
            >
              <g transform='translate(1 1)'>
                <g>
                  <g>
                    <path
                      d='M105.667,343.021V20.333C105.667,8.551,96.115-1,84.333-1C72.551-1,63,8.551,63,20.333v322.688
				c-36.807,9.472-64,42.88-64,82.645C-1,472.798,37.202,511,84.333,511s85.333-38.202,85.333-85.333
				C169.667,385.902,142.473,352.493,105.667,343.021z M84.333,468.333c-23.567,0-42.667-19.099-42.667-42.667
				S60.766,383,84.333,383S127,402.099,127,425.667S107.901,468.333,84.333,468.333z'
                    />
                    <path
                      d='M511,84.333C511,37.202,472.798-1,425.667-1s-85.333,38.202-85.333,85.333c0,39.765,27.193,73.173,64,82.645v322.688
				c0,11.782,9.551,21.333,21.333,21.333S447,501.449,447,489.667V166.979C483.807,157.507,511,124.098,511,84.333z M425.667,127
				C402.099,127,383,107.901,383,84.333s19.099-42.667,42.667-42.667s42.667,19.099,42.667,42.667S449.234,127,425.667,127z'
                    />
                    <path
                      d='M276.333,172.355V20.333C276.333,8.551,266.782-1,255-1s-21.333,9.551-21.333,21.333v152.021
				c-36.807,9.472-64,42.88-64,82.645s27.193,73.173,64,82.645v152.021c0,11.782,9.551,21.333,21.333,21.333
				s21.333-9.551,21.333-21.333V337.645c36.807-9.472,64-42.88,64-82.645S313.14,181.827,276.333,172.355z M255,297.667
				c-23.567,0-42.667-19.099-42.667-42.667s19.099-42.667,42.667-42.667s42.667,19.099,42.667,42.667S278.567,297.667,255,297.667z'
                    />
                  </g>
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </span>
          <Link to={destination}>
            <i className={className} title='history'></i>
          </Link>
        </div>
      </div>
      <div className='difficulty-lvl-modal'>
        <div>
          <span onClick={() => filterUserTasks('beginners')}>Beginner</span>
          <span onClick={() => filterUserTasks('intermediates')}>
            Intermediate
          </span>
          <span onClick={() => filterUserTasks('experts')}>Expert</span>
        </div>
      </div>
    </header>
  );
};
