import React, { useContext, useEffect } from 'react';
import { CodePreview } from '../../challenge/challenge layout/CodePreview';
import { ChallengeContext } from '../../../../context/challenge states/ChallengeState';
import { UserContext } from '../../../../context/global states/UserState';
import { Loading } from '../../layout/Loading';
import { VotesTemplate } from '../../challenge/challenge layout/VotesTemplate';
import { invokeExistingUpvotes } from '../../challenge/middleware/invokeExistingUpvotes';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import marked from 'marked';

export const AllCodesPage = () => {
  const { currentUser, getUser, upvoteData, setNewDestination } = useContext(
    UserContext
  );
  const {
    taskSolutions,
    allTaskSolutions,
    challengeError,
    childLoading,
    setChallengeError,
    tasks,
    parentLoading,
  } = useContext(ChallengeContext);

  const { id: currentTaskId } = useParams();

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

  // filter all solutions to a task except the current signed in user's solution
  // ?to be displayed on both history and challenge page
  const thisTaskSolutions = taskSolutions.filter((taskSolution) => {
    return taskSolution.taskId === currentTaskId;
  });

  // sort upvotes raw by highest
  thisTaskSolutions.sort((a, b) => b.upvotes - a.upvotes);

  const codePreviewElement = thisTaskSolutions.map((thisTaskSolution) => {
    const { username, code, upvotes, id, language, userId } = thisTaskSolution;
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

  // if there are no solutions to a task we say:
  // ?to be displayed in both history and challenge page
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

  // refresh task solutions
  const refreshSolutions = () => {
    allTaskSolutions('all');
    getUser();
  };

  useEffect(() => {
    refreshSolutions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!childLoading && currentUser.username) {
      invokeExistingUpvotes(currentUser);
    }
  }, [childLoading, currentUser]);

  const toggleFilterNav = () => {
    document.querySelector('.filter-language').classList.toggle('open');
  };

  // the given task
  const givenTask = tasks.filter((task) => {
    return task.id === currentTaskId;
  })[0];

  const taskInHTML = marked(
    givenTask ? givenTask.task : '404. Task was not found'
  );
  const taskInPlainText = taskInHTML.replace(/<(?:.|\n)*?>/gm, '');

  return (
    <div className='code-nav-content'>
      <Helmet>
        <title>Task Solutions - SortCode Challenge</title>
      </Helmet>
      <div className='header-content'>
        {parentLoading ? (
          <div className='loading-indicator'>
            <Loading />
          </div>
        ) : (
          <div className='code-preview-content preview-task'>
            <div>
              <h3>Task:</h3>
              <p
                className='marked'
                dangerouslySetInnerHTML={{
                  __html: marked(
                    givenTask ? givenTask.task : '404. Task was not found'
                  ),
                }}
              ></p>
            </div>
            <div className='share' title='share to twitter'>
              <a
                href={`https://twitter.com/intent/tweet?text=Hey guys, check out this task%0ATask: ${
                  taskInPlainText && taskInPlainText
                }%0A@SortCode%0Ahttps://sortcode.io/signup`}
                className='twitter-share-button'
                target='_blank'
                rel='noreferrer'
              >
                <i className='fab fa-twitter'></i>
                <span>Tweet</span>
              </a>
            </div>
          </div>
        )}
      </div>
      <div className='body-content'>
        <div className='body-content-header'>
          <h4>Solutions</h4>
          <div className='filter-container'>
            <i
              className='fas fa-redo'
              title='Refresh Task Solutions'
              onClick={refreshSolutions}
            ></i>
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
        ) : thisTaskSolutions.length !== 0 ? (
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
