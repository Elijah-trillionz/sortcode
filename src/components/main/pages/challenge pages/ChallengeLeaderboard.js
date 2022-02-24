import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserContext } from '../../../../context/global states/UserState';
import { Header } from '../../layout/Header';
import { Loading } from '../../layout/Loading';

export const Leaderboard = () => {
  const {
    users,
    parentLoading,
    globalError,
    getUsers,
    setNewDestination,
    currentUser,
  } = useContext(UserContext);

  useEffect(() => {
    setNewDestination({
      destination: '/dashboard/tasks',
      className: 'fas fa-code',
      title: 'Tasks',
    });
    getUsers();
    // eslint-disable-next-line
  }, []);

  // sort upvotes by highest
  users.sort((a, b) => b.upvotes - a.upvotes);

  // print username, and upvotes to leaderboards
  const usersToElements = users.map((user, index) => {
    const {
      id,
      username,
      avatar_url,
      fullname,
      upvotes,
      numOfTasksDone,
      dateJoined,
    } = user;

    return (
      <tr
        key={id}
        className={`${currentUser.username === username && 'active-user'}`}
      >
        <td>{index + 1}</td>
        <td className='user-name'>
          <span className='avatar'>
            <img src={avatar_url} alt={`${username} avatar`} />
          </span>
          <span>
            <span className='fullname'>
              {fullname}
              {index === 0 && <i className='fas fa-trophy hon'></i>}
              {index === 1 && <i className='fas fa-award hon'></i>}
              {index === 2 && <i className='fas fa-award hon'></i>}
            </span>
            <span className='username in-table'>@{username}</span>
          </span>
        </td>
        <td className='upvote'>
          <i className='far fa-thumbs-up'></i>
          <span>{upvotes}</span>
        </td>
        <td className='solved'>
          <i className='fas fa-tasks'></i>
          {numOfTasksDone}
        </td>
        <td className='joined'>
          <i className='fas fa-calendar'></i>
          {dateJoined}
        </td>
      </tr>
    );
  });

  const emptyList = (
    <tr className='empty'>
      <td>Leaderboard is currently empty.</td>
    </tr>
  );

  const errorElement = (
    <tr className='empty'>
      <td className='error'>
        <i className='fas fa-exclamation-triangle'></i> Unable to load
        leaderboard due to a server error!
      </td>
    </tr>
  );

  return (
    <>
      <Helmet>
        <title>Challenge Leaderboard - SortCode Challenge</title>
      </Helmet>
      <div style={{ display: 'none' }}>
        <Header />
      </div>
      <div className='leaderboard-component-container'>
        <div className='leaderboard-header-a'>
          <h2>Task Leaderboard</h2>
          <div className='info'>
            <i className='fas fa-info-circle'></i>
            <div
              className='info-content'
              style={{ left: 'unset', right: '-180%' }}
            >
              <span>
                This leaderboard shows users upvotes and number of tasks
                attempted by them.
              </span>
              <div
                className='after'
                style={{ left: 'unset', right: '5%' }}
              ></div>
            </div>
          </div>
        </div>
        {parentLoading ? (
          <div className='loading-indicator'>
            <Loading />
          </div>
        ) : (
          <div className='table'>
            <table>
              <thead>
                <tr>
                  <th>
                    <span>#</span>
                  </th>
                  <th>
                    <span>Username</span>
                  </th>
                  <th>
                    <span>Upvotes</span>
                  </th>
                  <th>
                    <span>Tasks Solved</span>
                  </th>
                  <th>
                    <span>Date Joined</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {globalError
                  ? errorElement
                  : users.length >= 1
                  ? usersToElements
                  : emptyList}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
