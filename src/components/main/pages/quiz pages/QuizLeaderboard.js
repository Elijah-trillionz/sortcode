import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserContext } from '../../../../context/global states/UserState';
import { Loading } from '../../layout/Loading';

export const LeaderboardComponent = () => {
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
      destination: '/dashboard/quiz/js',
      className: 'fas fa-question-circle',
      title: 'Back To Quiz',
    });
    getUsers();
    // eslint-disable-next-line
  }, []);

  // sort scores by highest
  users.sort((a, b) => b.score - a.score);

  // print username, and scores to leaderboards
  const usersToElements = users.map((user, index) => {
    const {
      id,
      username,
      avatar_url,
      fullname,
      score,
      questionsAnswered,
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
          <i className='far fa-check-circle'></i>
          <span>{score}</span>
        </td>
        <td className='solved'>
          <i className='fas fa-tasks'></i>
          {questionsAnswered}
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
    <div className='leaderboard-component-container'>
      <Helmet>
        <title>Quiz Leaderboard - SortCode Quiz</title>
      </Helmet>
      <div className='leaderboard-header-a'>
        <h2>Quiz Leaderboard</h2>
        <div className='info'>
          <i className='fas fa-info-circle'></i>
          <div
            className='info-content'
            style={{ left: 'unset', right: '-180%' }}
          >
            <span>
              This leaderboard shows users scores and number of quiz solved by
              them.
            </span>
            <div className='after' style={{ left: 'unset', right: '5%' }}></div>
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
                  <span>Total Scores</span>
                </th>
                <th>
                  <span>Questions Answered</span>
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
  );
};
