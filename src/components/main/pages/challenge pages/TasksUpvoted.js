import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChallengeContext } from '../../../../context/challenge states/ChallengeState';
import { UserContext } from '../../../../context/global states/UserState';
import { VotesTemplate } from '../../challenge/challenge layout/VotesTemplate';
import { CodePreview } from '../../challenge/challenge layout/CodePreview';
import { Loading } from '../../layout/Loading';
import { invokeExistingUpvotes } from '../../challenge/middleware/invokeExistingUpvotes';

export const TasksUpvoted = () => {
  const { currentUser, upvoteData, getUser, setNewDestination } = useContext(
    UserContext
  );
  const {
    taskSolutions,
    allTaskSolutions,
    challengeError,
    childLoading,
    setChallengeError,
  } = useContext(ChallengeContext);
  const [userTaskSolutions, setUserTaskSolutions] = useState([]);

  useEffect(() => {
    setNewDestination({
      destination: '/dashboard/tasks',
      className: 'fas fa-code',
      title: 'Tasks',
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!childLoading && currentUser.hearts) {
      if (upvoteData.numOfUpvotesToday >= 4) {
        document.querySelectorAll('.user-code').forEach((upvoteElement) => {
          const upvoteChildElement = upvoteElement.querySelector('svg');
          if (!upvoteChildElement.classList.contains('alt')) {
            upvoteElement.classList.add('disabled-voting');
          }
        });
      } else {
        document.querySelectorAll('.user-code').forEach((upvoteElement) => {
          const upvoteChildElement = upvoteElement.querySelector('svg');
          if (!upvoteChildElement.classList.contains('alt')) {
            upvoteElement.classList.remove('disabled-voting');
          }
        });
      }

      if (currentUser.hearts.length >= 40) {
        document.querySelectorAll('.user-code').forEach((upvoteElement) => {
          const upvoteChildElement = upvoteElement.querySelector('svg');
          if (!upvoteChildElement.classList.contains('alt')) {
            upvoteElement.classList.add('disabled-voting');
          }
        });
      }
    }
  }, [upvoteData, childLoading, currentUser]);

  useEffect(() => {
    if (currentUser.hearts && taskSolutions) {
      const solutions = [];
      taskSolutions.forEach((solution) => {
        currentUser.hearts.forEach((likes) => {
          if (solution.id === likes) {
            solutions.push(solution);
          }
        });
      });

      setUserTaskSolutions(solutions);
    }
  }, [taskSolutions, currentUser]);

  // sort upvotes raw by highest
  userTaskSolutions.sort((a, b) => b.upvotes - a.upvotes);

  const codePreviewElement = userTaskSolutions.map((userTaskSolution) => {
    const { username, code, upvotes, id, language, userId } = userTaskSolution;

    let author, name;
    if (userId === currentUser.id) {
      author = 'Your Code';
      name = 'your-code';
    } else {
      author = username;
      name = username;
    }
    return (
      // fill out each task's dom element id with their respective object id
      // eslint-disable-next-line
      <a className={'user-code'} name={name} key={id} id={`t${id}`}>
        <VotesTemplate currentUpvotes={upvotes} />
        <CodePreview
          previewing={false}
          author={author}
          otherLang={language}
          otherCode={code}
        />
      </a>
    );
  });
  const emptyList = (
    <div className='empty'>
      <p>
        Oops! There are no codes to view from others for this task in language.
        Come back later.
      </p>
    </div>
  );

  const errorElement = (
    <div className='empty'>
      <p>Oops! There has been an error</p>
      <p className='error'>
        <i className='fas fa-exclamation-triangle'></i> {challengeError}
      </p>
      <span className='error-remedy'>
        <i className='fas fa-cogs'></i> If this error persists, please notify
        us.
      </span>
    </div>
  );

  const filterCheckedIcons = (e) => {
    const checkedLanguage =
      e.target.innerText.toLowerCase().trim() === 'c#'
        ? 'csharp'
        : e.target.innerText.toLowerCase().trim();

    allTaskSolutions(checkedLanguage);
    toggleFilterNav();
    if (challengeError) {
      setChallengeError(false);
    }
  };

  const toggleFilterNav = () => {
    document.querySelector('.filter-language').classList.toggle('open');
  };

  useEffect(() => {
    allTaskSolutions('all');
    getUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!childLoading && currentUser.username) {
      invokeExistingUpvotes(currentUser);
    }
  }, [childLoading, currentUser]);

  return (
    <div className='code-nav-content'>
      <Helmet>
        <title>Your Upvoted Task solutions - SortCode</title>
      </Helmet>
      <div className='body-content'>
        <div className='body-content-header'>
          <h4>All your upvotes</h4>
          <div className='filter-container'>
            <div className='filter-icon'>
              <i className='fas fa-filter' onClick={toggleFilterNav}></i>
            </div>
          </div>
        </div>
        {childLoading ? (
          <div className='loading-indicator'>
            <Loading />
          </div>
        ) : challengeError ? (
          errorElement
        ) : userTaskSolutions.length >= 1 ? (
          codePreviewElement
        ) : (
          emptyList
        )}
        <div className='filter-language'>
          <div className='filter-content'>
            <p>
              Your preferrable language for solutions!
              <i className='fas fa-times-circle' onClick={toggleFilterNav}></i>
            </p>
            <ul id='filterList'>
              <li onClick={filterCheckedIcons}>JS</li>
              <li onClick={filterCheckedIcons}>PHP</li>
              <li onClick={filterCheckedIcons}>Python</li>
              <li onClick={filterCheckedIcons}>Java</li>
              <li onClick={filterCheckedIcons}>C++</li>
              <li onClick={filterCheckedIcons}>C#</li>
              <li onClick={filterCheckedIcons}>Swift</li>
              <li onClick={filterCheckedIcons}>Ruby</li>
              <li onClick={filterCheckedIcons}>Kotlin</li>
              <li onClick={filterCheckedIcons}>Pseudocode</li>
              <li onClick={filterCheckedIcons}>C</li>
              <li onClick={filterCheckedIcons}>All</li>
            </ul>
            <p className='special' onClick={toggleFilterNav}>
              {/* eslint-disable-next-line */}
              <a href='#your-code'>Your Code</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
