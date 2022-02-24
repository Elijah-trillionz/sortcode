import React, { useContext } from 'react';
import { UserContext } from '../../../../context/global states/UserState';
import { Loading } from '../../layout/Loading';
import { Link } from 'react-router-dom';

export const Leaderboard = () => {
  const {
    users,
    parentLoading,
    globalError,
    getUsers,
    currentUser,
  } = useContext(UserContext);

  // sort scores by highest
  users.sort((a, b) => b.score - a.score);

  // filter 5 user's scores
  const usersListWithLimit = users.slice(0, 5);

  // print username, and scores to leaderboards
  const usersToElements = usersListWithLimit.map((user, index) => {
    const { id, username, score } = user;

    return (
      <tr
        key={id}
        className={`${currentUser.username === username && 'active-user'}`}
      >
        <td>{index + 1}</td>
        <td>@{username}</td>
        <td className='score'>{score}</td>
      </tr>
    );
  });

  const emptyList = (
    <tr className='empty'>
      <td style={{ width: '100%' }}>Leaderboard is currently empty.</td>
    </tr>
  );

  const errorElement = (
    <tr className='empty'>
      <td className='error' style={{ width: '100%', textAlign: 'center' }}>
        <i className='fas fa-exclamation-triangle'></i> Unable to load
        leaderboard due to a server error!
      </td>
    </tr>
  );

  const refreshLeaderboard = () => {
    getUsers();
  };

  return (
    <div className='leaderboard-content'>
      <div className='leaderboard-header'>
        <div className='refresh'>
          <i
            className='fas fa-redo'
            title='Refresh leaderboard'
            onClick={refreshLeaderboard}
          ></i>
        </div>
        <h2>Leaderboard</h2>
        <div className='info'>
          <i className='fas fa-info-circle'></i>
          <div
            className='info-content'
            style={{ left: 'unset', right: '-180%' }}
          >
            <span>The leaderboard shows users with highest scores.</span>
            <div className='after' style={{ left: 'unset', right: '5%' }}></div>
          </div>
        </div>
      </div>
      {parentLoading ? (
        <div className='loading-indicator'>
          <Loading />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Total Scores</th>
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
      )}
      <Link to='/dashboard/quiz/leaderboard' className='link-to-leaderboard'>
        See all
      </Link>
    </div>
  );
};
