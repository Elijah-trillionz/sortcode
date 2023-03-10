import React, { useContext, useEffect } from 'react';
import { ChallengeContext } from '../../../../../context/challenge states/ChallengeState';
import { UserContext } from '../../../../../context/global states/UserState';
import { Loading } from '../../../layout/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { marked } from "marked";

export const JSTaskHistory = () => {
  const {
    tasks,
    index: lastJSIndex,
    parentLoading,
    challengeGlobalError,
  } = useContext(ChallengeContext);
  const { setNewDestination } = useContext(UserContext);

  useEffect(() => {
    setNewDestination({
      destination: '/dashboard/tasks',
      className: 'fas fa-code',
      title: 'Tasks',
    });

    // eslint-disable-next-line
  }, []);

  const formattedIndex = lastJSIndex === undefined ? tasks.length : lastJSIndex;

  // ?making sure the index is not beyond the max length of tasks
  const generatedIndex =
    formattedIndex === tasks.length + 1 ? tasks.length : formattedIndex;

  const answeredTasks = [];

  // provide all attempted questions to the above array
  for (let i = 0; i < generatedIndex; i++) {
    answeredTasks.push(tasks[i]);
  }

  // useEffect(() => {
  //   console.log(tasks);
  // }, [tasks]);

  const answeredList = answeredTasks.map((task) => {
    return (
      <li key={task.id}>
        <span
          className='marked'
          dangerouslySetInnerHTML={{
            __html: marked(`${task.task}?`),
          }}
        ></span>
        <p>
          <Link
            to={`/dashboard/tasks/code/${task.id}`}
            className='history-open-nav'
          >
            See all solutions
          </Link>
          <i>
            <strong>Source:</strong> <a href={task.srcURL}>{task.src}</a>
          </i>
        </p>
      </li>
    );
  });

  const difficultyLvl = localStorage.getItem('difficultyLvl')
    ? localStorage.getItem('difficultyLvl')
    : 'beginners';

  const emptyList = (
    <div className='empty'>
      <p>Oops! History is empty</p>
      <p>You have not attempted any "{difficultyLvl}" tasks yet.</p>
      <Link to='/dashboard/challenge'>Get started</Link>
    </div>
  );

  const errorElement = (
    <div className='empty'>
      <p>Oops! There has been an error</p>
      <p className='error'>
        <i className='fas fa-exclamation-triangle'></i>{' '}
        {challengeGlobalError.errorMsg}
      </p>
    </div>
  );

  return (
    <div className='history-section'>
      <Helmet>
        <title>Challenge History - SortCode Challenge</title>
      </Helmet>
      <h2>Task History</h2>
      <span className='notice'>
        The following tasks has been attempted by you.
      </span>
      <div>
        <div className='selection'>
          <p className='history-lang'>{difficultyLvl}</p>
        </div>
        <div className='history-list'>
          {parentLoading ? (
            <div className='loading-indicator'>
              <Loading />
            </div>
          ) : (
            <ol>
              {challengeGlobalError.errorMsg
                ? errorElement
                : generatedIndex > 0
                ? answeredList
                : emptyList}
            </ol>
          )}
        </div>
      </div>
      <div className='other'></div>
      {/* <div className='code-nav-container'>{element}</div> */}
    </div>
  );
};
