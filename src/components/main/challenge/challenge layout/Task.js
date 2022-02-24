import React, { useContext, useEffect } from 'react';
import { ChallengeContext } from '../../../../context/challenge states/ChallengeState';
import { Loading } from '../../layout/Loading';
import { Helmet } from 'react-helmet-async';
import { ErrorHandler } from '../../layout/ErrorHandler';
import { Redirect } from 'react-router-dom';
import marked from 'marked';

export const Task = ({ codeValue, onChangeCodeValue }) => {
  const {
    tasks,
    index,
    nextTask,
    parentLoading,
    getCurrentTaskId,
    language,
    setLanguage,
    challengeGlobalError,
    staticError,
    newTaskLoading,
  } = useContext(ChallengeContext);

  const getTasks = () => {
    // get current id and send back to the challenge home page
    if (index === undefined) {
      getCurrentTaskId(null);
    } else {
      getCurrentTaskId(tasks[index].id);
    }
  };

  useEffect(() => {
    if (!parentLoading && !challengeGlobalError && !newTaskLoading) {
      getTasks();
    }
    // eslint-disable-next-line
  }, [parentLoading, challengeGlobalError, newTaskLoading]);

  const moveToNextTask = () => {
    document.querySelector('.code-call').classList.add('disabled');
    codeValue('');
    onChangeCodeValue('');
    nextTask();
  };
  const difficultyLvl = localStorage.getItem('difficultyLvl')
    ? localStorage.getItem('difficultyLvl')
    : 'beginners';

  return (
    <>
      <Helmet>
        <title>{`${difficultyLvl
          .substr(0, 1)
          .toUpperCase()}${difficultyLvl.substr(
          1,
          difficultyLvl.length - 2
        )} tasks - SortCode Challenge`}</title>
      </Helmet>
      {parentLoading ? (
        <div className='task load end'>
          <div className='task-first-content'>
            <div className='given-task'>
              <div className='loading-indicator'>
                <Loading />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {staticError && <Redirect push to='/login' />}
          {challengeGlobalError ? (
            <ErrorHandler
              errorMsg={challengeGlobalError.errorMsg}
              statusCode={challengeGlobalError.status}
              context={ChallengeContext}
              from='challenge'
            />
          ) : (
            <>
              {index !== undefined ? (
                <div>
                  <div className='task-content'>
                    <div className='task'>
                      <div className='task-first-content'>
                        <div className='task-heading-wrapper'>
                          <p className='task-heading'>
                            <strong>Task </strong>
                          </p>
                        </div>
                        <div className='given-task'>
                          <p className='task-main-paragraph'>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: marked(tasks[index].task),
                              }}
                            ></span>
                          </p>
                        </div>
                      </div>
                      <div className='task-bottom-props'>
                        <div>
                          <div className='info'>
                            <i className='fas fa-info-circle'></i>
                            <div className='info-content'>
                              <span>
                                Write solutions in the text editor below, when
                                done you can view solutions from others. <br />
                                <b>Note:</b> Going back to previous tasks is not
                                possible in this section. But you can view all
                                attempted or skipped tasks in the history
                                section
                              </span>
                              <div className='after'></div>
                            </div>
                          </div>
                        </div>
                        <div className='source'>
                          <p>
                            by <span>{tasks[index].src}</span>
                          </p>
                        </div>
                      </div>
                      <div className='difficulty-indicator'>
                        <p>{difficultyLvl}</p>
                      </div>
                    </div>
                  </div>

                  <div className='navigate'>
                    <div
                      className='skip-task'
                      onClick={() => {
                        document
                          .querySelector('.code-call')
                          .classList.remove('disabled');
                      }}
                    >
                      <p>
                        <a href='#codes'>Skip Task</a>
                      </p>
                    </div>
                    <div className='next-task' onClick={moveToNextTask}>
                      <p>
                        Next Task
                        <svg id='icon-arrow-right' viewBox='0 0  960 500'>
                          <path
                            d='M3.7,0l-3.7,-3.7c-0.6,-0.6,-1.9,0.6,-1.3,1.3l2.5,2.5l-2.5,2.5c-0.6,0.6,0.6,1.9,1.3,1.3l3.7,-3.7Z'
                            transform='matrix(40.7966 0 0 40.7966 418.578 264.5)'
                          />
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className='task end'>
                    <div className='task-first-content'>
                      <div className='task-heading-wrapper'>
                        <p className='task-heading'>
                          <strong>Yahoo!</strong>
                        </p>
                      </div>
                      <div className='given-task'>
                        <p className='task-main-paragraph'>
                          <span>
                            This is the end of the road for {difficultyLvl}{' '}
                            tasks.
                            <br />
                            You did great getting here. Kudos!
                          </span>
                        </p>
                      </div>
                    </div>
                    <br />
                    <br />
                  </div>
                  <div className='navigate end'>
                    <div className='skip-task'>
                      <p>
                        <a href='/dashboard/tasks/history'>See History</a>
                      </p>
                    </div>
                    <div className='next-task'>
                      <p>
                        <a href='https://www.github.com'>Contribute Tasks</a>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
      <div className='language-name'>
        <div className='tooltip-text'>
          <p>Select language to provide solution in</p>
        </div>
        <p>
          {language} <i className='fas fa-caret-down'></i>
        </p>
        <div className='language-dropdown-container'>
          <ul>
            <li onClick={() => setLanguage('Python')}>Python</li>
            <li onClick={() => setLanguage('PHP')}>PHP</li>
            <li onClick={() => setLanguage('Java')}>Java</li>
            <li onClick={() => setLanguage('C++')}>C++</li>
            <li onClick={() => setLanguage('JS')}>JS</li>
            <li onClick={() => setLanguage('C')}>C</li>
            <li onClick={() => setLanguage('C#')}>C#</li>
            <li onClick={() => setLanguage('Swift')}>Swift</li>
            <li onClick={() => setLanguage('Ruby')}>Ruby</li>
            <li onClick={() => setLanguage('Kotlin')}>Kotlin</li>
            <li onClick={() => setLanguage('Pseudocode')}>Pseudocode</li>
          </ul>
        </div>
      </div>
    </>
  );
};
