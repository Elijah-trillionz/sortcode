import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/global states/UserState';
import { Loading } from './Loading';
import { InnerLoading } from './InnerLoading';
import { Link } from 'react-router-dom';

export const SideNav = ({ closeSideNav }) => {
  const { currentUser, childLoading } = useContext(UserContext);
  const [signedInUsername, setSignedInUsername] = useState('');

  const openAccordion = (e) => {
    e.target.parentElement.lastElementChild.classList.toggle('open');
    e.target.firstChild.lastChild.lastChild.classList.toggle('active');
  };

  // generate user logo with first letter of name
  useEffect(() => {
    if (!childLoading && currentUser.username) {
      setSignedInUsername(currentUser.username);
    }
  }, [childLoading, currentUser]);

  return (
    <>
      <div className='aside'>
        <div className='mobile-device'>
          <div className='profile'>
            <a href='/dashboard/profile' onClick={closeSideNav}>
              <div className='avatar'>
                {!currentUser.avatar_url ? (
                  <div className='loading-indicator'>
                    <Loading />
                  </div>
                ) : (
                  <img
                    src={currentUser.avatar_url}
                    alt={`${currentUser.username} avatar`}
                  />
                )}
              </div>

              {!signedInUsername ? (
                <InnerLoading />
              ) : (
                <p className='username'>@{signedInUsername}</p>
              )}
            </a>
          </div>
          <ul className='top-list'>
            <li className='top-li'>
              <div onClick={openAccordion}>
                {/* eslint-disable-next-line */}
                <a style={{ pointerEvents: 'none' }} className='top-link'>
                  <svg
                    version='1.1'
                    id='Capa_1'
                    x='0px'
                    y='0px'
                    viewBox='0 0 712 512'
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d='M447.716,97.794L297.207,10.993c-25.416-14.658-56.997-14.657-82.414,0L64.285,97.794
				C38.819,112.479,23,139.866,23,169.266v173.467c0,29.4,15.819,56.787,41.284,71.472l150.509,86.801
				c25.421,14.661,57.001,14.656,82.414,0l150.508-86.801C473.181,399.52,489,372.133,489,342.733V169.266
				C489,139.867,473.181,112.48,447.716,97.794z M449,342.733c0,15.144-8.148,29.251-21.266,36.815l-150.509,86.801
				c-13.093,7.552-29.358,7.552-42.451,0L84.265,379.548C71.148,371.983,63,357.877,63,342.733V169.266
				c0-15.143,8.148-29.25,21.266-36.814l150.508-86.801c13.094-7.552,29.364-7.549,42.452,0l150.509,86.8
				C440.852,140.016,449,154.122,449,169.266V342.733z'
                          />
                          <path
                            d='M236.994,240.729l-74.281-62.863c-8.431-7.136-21.052-6.085-28.187,2.349c-7.135,8.434-6.083,21.055,2.349,28.191
				L193.113,256l-56.238,47.593c-8.432,7.136-9.483,19.757-2.349,28.191c7.152,8.452,19.776,9.467,28.187,2.348l74.281-62.863
				C246.444,263.272,246.417,248.704,236.994,240.729z'
                          />
                          <path
                            d='M362.206,298.859h-89.995c-11.046,0-20,8.955-20,20.003c0,11.048,8.954,20.003,20,20.003h89.995
				c11.045,0,20-8.955,20-20.003C382.206,307.814,373.252,298.859,362.206,298.859z'
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

                  <span>
                    {' '}
                    Challenge
                    <svg
                      id='icon-angle-down'
                      className='icon'
                      viewBox='0 0 21 32'
                    >
                      <path
                        className='path1'
                        d='M19.196 13.143q0 0.232-0.179 0.411l-8.321 8.321q-0.179 0.179-0.411 0.179t-0.411-0.179l-8.321-8.321q-0.179-0.179-0.179-0.411t0.179-0.411l0.893-0.893q0.179-0.179 0.411-0.179t0.411 0.179l7.018 7.018 7.018-7.018q0.179-0.179 0.411-0.179t0.411 0.179l0.893 0.893q0.179 0.179 0.179 0.411z'
                      ></path>
                    </svg>
                  </span>
                </a>
              </div>

              <ul className='accordion-content inner'>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/tasks'>
                    Tasks
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeSideNav}
                    to='/dashboard/tasks/leaderboard'
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/tasks/history'>
                    History
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/tasks-upvoted'>
                    Bookmarks
                  </Link>
                </li>
              </ul>
            </li>
            <li className='top-li'>
              <div onClick={openAccordion}>
                {/* eslint-disable-next-line */}
                <a style={{ pointerEvents: 'none' }} className='top-link'>
                  <i className='far fa-lightbulb'></i>
                  <span>
                    {' '}
                    Quiz
                    <svg
                      id='icon-angle-down'
                      className='icon'
                      viewBox='0 0 21 32'
                    >
                      <path
                        className='path1'
                        d='M19.196 13.143q0 0.232-0.179 0.411l-8.321 8.321q-0.179 0.179-0.411 0.179t-0.411-0.179l-8.321-8.321q-0.179-0.179-0.179-0.411t0.179-0.411l0.893-0.893q0.179-0.179 0.411-0.179t0.411 0.179l7.018 7.018 7.018-7.018q0.179-0.179 0.411-0.179t0.411 0.179l0.893 0.893q0.179 0.179 0.179 0.411z'
                      ></path>
                    </svg>
                  </span>
                </a>
              </div>
              <ul className='accordion-content inner'>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/quiz/js'>
                    JavaScript
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/quiz/html'>
                    HTML
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/quiz/css'>
                    CSS
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/quiz/leaderboard'>
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/quiz/history'>
                    History
                  </Link>
                </li>
              </ul>
            </li>
            {/* <li className='spec'>Daily Exercises</li>
          <br /> */}
            <li className='top-li'>
              <a href='/example.com' className='top-link'>
                <i className='far fa-star'></i>
                <span> Star this project</span>
              </a>
            </li>
            <li className='top-li'>
              <div onClick={openAccordion}>
                {/* eslint-disable-next-line */}
                <a style={{ pointerEvents: 'none' }} className='top-link'>
                  <svg
                    id='Layer_1'
                    height='512'
                    viewBox='0 0 712 512'
                    width='512'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g>
                      <path d='m367.988 512.021c-16.528 0-32.916-2.922-48.941-8.744-70.598-25.646-136.128-67.416-189.508-120.795s-95.15-118.91-120.795-189.508c-8.241-22.688-10.673-46.108-7.226-69.612 3.229-22.016 11.757-43.389 24.663-61.809 12.963-18.501 30.245-33.889 49.977-44.5 21.042-11.315 44.009-17.053 68.265-17.053 7.544 0 14.064 5.271 15.645 12.647l25.114 117.199c1.137 5.307-.494 10.829-4.331 14.667l-42.913 42.912c40.482 80.486 106.17 146.174 186.656 186.656l42.912-42.913c3.838-3.837 9.361-5.466 14.667-4.331l117.199 25.114c7.377 1.581 12.647 8.101 12.647 15.645 0 24.256-5.738 47.224-17.054 68.266-10.611 19.732-25.999 37.014-44.5 49.977-18.419 12.906-39.792 21.434-61.809 24.663-6.899 1.013-13.797 1.518-20.668 1.519zm-236.349-479.321c-31.995 3.532-60.393 20.302-79.251 47.217-21.206 30.265-26.151 67.49-13.567 102.132 49.304 135.726 155.425 241.847 291.151 291.151 34.641 12.584 71.866 7.64 102.132-13.567 26.915-18.858 43.685-47.256 47.217-79.251l-95.341-20.43-44.816 44.816c-4.769 4.769-12.015 6.036-18.117 3.168-95.19-44.72-172.242-121.772-216.962-216.962-2.867-6.103-1.601-13.349 3.168-18.117l44.816-44.816z' />
                    </g>
                  </svg>
                  <span>
                    {' '}
                    Contact
                    <svg
                      id='icon-angle-down'
                      className='icon'
                      viewBox='0 0 21 32'
                    >
                      <path
                        className='path1'
                        d='M19.196 13.143q0 0.232-0.179 0.411l-8.321 8.321q-0.179 0.179-0.411 0.179t-0.411-0.179l-8.321-8.321q-0.179-0.179-0.179-0.411t0.179-0.411l0.893-0.893q0.179-0.179 0.411-0.179t0.411 0.179l7.018 7.018 7.018-7.018q0.179-0.179 0.411-0.179t0.411 0.179l0.893 0.893q0.179 0.179 0.179 0.411z'
                      ></path>
                    </svg>
                  </span>
                </a>
              </div>
              <ul className='accordion-content'>
                <li>
                  <a href='/example.com'>About Us</a>
                </li>
                <li>
                  <a href='/example.com'>Contact Us</a>
                </li>
                <li>
                  <a href='/example.com'>Report a Bug</a>
                </li>
              </ul>
            </li>
            <li className='spec top-li'>
              <a
                href='https://opencollective.com/sortcodeio'
                onClick={closeSideNav}
                className='top-link'
                target='_blank'
                rel='noreferrer'
              >
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

                <span> Donate</span>
              </a>
            </li>
            <li className='spec top-li'>
              <a href='/s' className='top-link'>
                <svg
                  id='light'
                  height='512'
                  viewBox='0 0 35 24'
                  width='512'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='m4.5 24c-.064 0-.129-.013-.191-.038-.187-.077-.309-.26-.309-.462v-4.5h-1.5c-1.378 0-2.5-1.121-2.5-2.5v-14c0-1.379 1.122-2.5 2.5-2.5h19c1.378 0 2.5 1.121 2.5 2.5v14c0 1.379-1.122 2.5-2.5 2.5h-11.793l-4.854 4.854c-.095.095-.223.146-.353.146zm-2-23c-.827 0-1.5.673-1.5 1.5v14c0 .827.673 1.5 1.5 1.5h2c.276 0 .5.224.5.5v3.793l4.146-4.146c.094-.094.221-.147.354-.147h12c.827 0 1.5-.673 1.5-1.5v-14c0-.827-.673-1.5-1.5-1.5z' />
                  <path d='m13 15h-2c-.481 0-1-.369-1-1.18v-1.32c0-.586-.253-1.122-.676-1.434-1.169-.86-1.851-2.237-1.823-3.682.045-2.381 2.034-4.349 4.433-4.384 1.198.006 2.37.443 3.236 1.298.857.846 1.33 1.973 1.33 3.175 0 1.402-.675 2.741-1.806 3.581-.435.323-.694.866-.694 1.453v1.493c0 .552-.449 1-1 1zm-1.001-11c-.017 0-.034 0-.051 0-1.833.027-3.412 1.586-3.447 3.404-.022 1.12.507 2.188 1.416 2.857.678.5 1.083 1.337 1.083 2.239v1.32c0 .149.036.198.036.198l1.964-.018v-1.493c0-.901.41-1.744 1.097-2.256.892-.662 1.403-1.675 1.403-2.778 0-.932-.367-1.807-1.033-2.463-.661-.653-1.536-1.01-2.468-1.01z' />
                  <path d='m13.5 13h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3c.276 0 .5.224.5.5s-.224.5-.5.5z' />
                </svg>
                <span> Submit Quiz || Tasks</span>
              </a>
            </li>
          </ul>
        </div>
        <div className='desktop-view col-2'>
          <div className='profile'>
            <a href='/dashboard/profile' onClick={closeSideNav}>
              <div className='avatar'>
                {!currentUser.avatar_url ? (
                  <div className='loading-indicator'>
                    <Loading />
                  </div>
                ) : (
                  <img
                    src={currentUser.avatar_url}
                    alt={`${currentUser.username} avatar`}
                  />
                )}
              </div>

              {!signedInUsername ? (
                <InnerLoading />
              ) : (
                <p className='username'>@{signedInUsername}</p>
              )}
            </a>
          </div>
          <ul className='top-list'>
            <li className='dropdown'>
              {/* eslint-disable-next-line */}
              <a className='top-link'>
                <svg
                  version='1.1'
                  id='Capa_1'
                  x='0px'
                  y='0px'
                  viewBox='0 0 712 512'
                >
                  <g>
                    <g>
                      <g>
                        <path
                          d='M447.716,97.794L297.207,10.993c-25.416-14.658-56.997-14.657-82.414,0L64.285,97.794
				C38.819,112.479,23,139.866,23,169.266v173.467c0,29.4,15.819,56.787,41.284,71.472l150.509,86.801
				c25.421,14.661,57.001,14.656,82.414,0l150.508-86.801C473.181,399.52,489,372.133,489,342.733V169.266
				C489,139.867,473.181,112.48,447.716,97.794z M449,342.733c0,15.144-8.148,29.251-21.266,36.815l-150.509,86.801
				c-13.093,7.552-29.358,7.552-42.451,0L84.265,379.548C71.148,371.983,63,357.877,63,342.733V169.266
				c0-15.143,8.148-29.25,21.266-36.814l150.508-86.801c13.094-7.552,29.364-7.549,42.452,0l150.509,86.8
				C440.852,140.016,449,154.122,449,169.266V342.733z'
                        />
                        <path
                          d='M236.994,240.729l-74.281-62.863c-8.431-7.136-21.052-6.085-28.187,2.349c-7.135,8.434-6.083,21.055,2.349,28.191
				L193.113,256l-56.238,47.593c-8.432,7.136-9.483,19.757-2.349,28.191c7.152,8.452,19.776,9.467,28.187,2.348l74.281-62.863
				C246.444,263.272,246.417,248.704,236.994,240.729z'
                        />
                        <path
                          d='M362.206,298.859h-89.995c-11.046,0-20,8.955-20,20.003c0,11.048,8.954,20.003,20,20.003h89.995
				c11.045,0,20-8.955,20-20.003C382.206,307.814,373.252,298.859,362.206,298.859z'
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
                <span> Challenge</span>
              </a>
              <ul className='dropdown-content'>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/tasks'>
                    Tasks
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeSideNav}
                    to='/dashboard/tasks/leaderboard'
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/tasks/history'>
                    History
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/tasks-upvoted'>
                    Bookmarks
                  </Link>
                </li>
              </ul>
            </li>
            <li className='dropdown'>
              {/* eslint-disable-next-line */}
              <a className='top-link'>
                <i className='far fa-lightbulb'></i>
                <span> Quiz</span>
              </a>
              <ul className='dropdown-content'>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/quiz/js'>
                    JavaScript
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/quiz/html'>
                    HTML
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/quiz/css'>
                    CSS
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/quiz/leaderboard'>
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link onClick={closeSideNav} to='/dashboard/quiz/history'>
                    History
                  </Link>
                </li>
              </ul>
            </li>
            {/* <li>
            <a href='/example.com'>Daily Exercises</a>
          </li> */}
            <li>
              <a href='/example.com' className='top-link'>
                <i className='far fa-star'></i>
                <span> Star this project</span>
              </a>
            </li>
            <li className='dropdown'>
              {/* eslint-disable-next-line */}
              <a className='top-link'>
                <svg
                  id='Layer_1'
                  height='512'
                  viewBox='0 0 712 512'
                  width='512'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g>
                    <path d='m367.988 512.021c-16.528 0-32.916-2.922-48.941-8.744-70.598-25.646-136.128-67.416-189.508-120.795s-95.15-118.91-120.795-189.508c-8.241-22.688-10.673-46.108-7.226-69.612 3.229-22.016 11.757-43.389 24.663-61.809 12.963-18.501 30.245-33.889 49.977-44.5 21.042-11.315 44.009-17.053 68.265-17.053 7.544 0 14.064 5.271 15.645 12.647l25.114 117.199c1.137 5.307-.494 10.829-4.331 14.667l-42.913 42.912c40.482 80.486 106.17 146.174 186.656 186.656l42.912-42.913c3.838-3.837 9.361-5.466 14.667-4.331l117.199 25.114c7.377 1.581 12.647 8.101 12.647 15.645 0 24.256-5.738 47.224-17.054 68.266-10.611 19.732-25.999 37.014-44.5 49.977-18.419 12.906-39.792 21.434-61.809 24.663-6.899 1.013-13.797 1.518-20.668 1.519zm-236.349-479.321c-31.995 3.532-60.393 20.302-79.251 47.217-21.206 30.265-26.151 67.49-13.567 102.132 49.304 135.726 155.425 241.847 291.151 291.151 34.641 12.584 71.866 7.64 102.132-13.567 26.915-18.858 43.685-47.256 47.217-79.251l-95.341-20.43-44.816 44.816c-4.769 4.769-12.015 6.036-18.117 3.168-95.19-44.72-172.242-121.772-216.962-216.962-2.867-6.103-1.601-13.349 3.168-18.117l44.816-44.816z' />
                  </g>
                </svg>
                <span> Contact</span>
              </a>
              <ul className='dropdown-content'>
                <li>
                  <a href='/example.com'>About Us</a>
                </li>
                <li>
                  <a href='/example.com'>Contact Us</a>
                </li>
                <li>
                  <a href='/example.com'>Report a Bug</a>
                </li>
              </ul>
            </li>
            {/* <li>
            <a href='/example.com'>Sponsor on GitHub</a>
          </li> */}
            <li>
              <a href='/example.com' className='top-link'>
                <svg
                  id='light'
                  height='512'
                  viewBox='0 0 35 24'
                  width='512'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='m4.5 24c-.064 0-.129-.013-.191-.038-.187-.077-.309-.26-.309-.462v-4.5h-1.5c-1.378 0-2.5-1.121-2.5-2.5v-14c0-1.379 1.122-2.5 2.5-2.5h19c1.378 0 2.5 1.121 2.5 2.5v14c0 1.379-1.122 2.5-2.5 2.5h-11.793l-4.854 4.854c-.095.095-.223.146-.353.146zm-2-23c-.827 0-1.5.673-1.5 1.5v14c0 .827.673 1.5 1.5 1.5h2c.276 0 .5.224.5.5v3.793l4.146-4.146c.094-.094.221-.147.354-.147h12c.827 0 1.5-.673 1.5-1.5v-14c0-.827-.673-1.5-1.5-1.5z' />
                  <path d='m13 15h-2c-.481 0-1-.369-1-1.18v-1.32c0-.586-.253-1.122-.676-1.434-1.169-.86-1.851-2.237-1.823-3.682.045-2.381 2.034-4.349 4.433-4.384 1.198.006 2.37.443 3.236 1.298.857.846 1.33 1.973 1.33 3.175 0 1.402-.675 2.741-1.806 3.581-.435.323-.694.866-.694 1.453v1.493c0 .552-.449 1-1 1zm-1.001-11c-.017 0-.034 0-.051 0-1.833.027-3.412 1.586-3.447 3.404-.022 1.12.507 2.188 1.416 2.857.678.5 1.083 1.337 1.083 2.239v1.32c0 .149.036.198.036.198l1.964-.018v-1.493c0-.901.41-1.744 1.097-2.256.892-.662 1.403-1.675 1.403-2.778 0-.932-.367-1.807-1.033-2.463-.661-.653-1.536-1.01-2.468-1.01z' />
                  <path d='m13.5 13h-3c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3c.276 0 .5.224.5.5s-.224.5-.5.5z' />
                </svg>
                <span> Submit Quiz || Challenge</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
