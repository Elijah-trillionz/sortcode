import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/global states/UserState';
import { Helmet } from 'react-helmet-async';
import { Loading } from '../layout/Loading';
import { ChallengeContext } from '../../../context/challenge states/ChallengeState';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { currentUser, childLoading } = useContext(UserContext);
  const { taskSolutions, childLoading: taskLoading } =
    useContext(ChallengeContext);

  const [questionsModule, setQuestionsModule] = useState({});
  const [tasksModule, setTasksModule] = useState({});
  const [upvotesModule, setUpvotesModule] = useState({
    totalUpvotes: 0,
    highestTaskUpvotes: 0,
    tasksUpvoted: 0,
    highestTaskUpvotesId: 0,
  });

  useEffect(() => {
    if (currentUser) {
      const questionsFailed =
        (currentUser.questionsAnswered * 5 - currentUser.score) / 5;
      const questionsGotten = currentUser.score / 5;

      setQuestionsModule({
        questionsAttempted: currentUser.questionsAnswered,
        questionsFailed,
        questionsGotten,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.tasks) {
      const tasksAttempted = currentUser.tasks.reduce((total, value) => {
        return total + value;
      });
      const tasksSkipped = tasksAttempted - currentUser.numOfTasksDone;

      setTasksModule({
        tasksAttempted,
        tasksSkipped,
        tasksSolved: currentUser.numOfTasksDone,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && taskSolutions.length >= 1 && currentUser.hearts) {
      const userTaskSolutions = taskSolutions.filter((taskSolution) => {
        return taskSolution.userId === currentUser.id;
      });

      const userTaskUpvotesIndex = userTaskSolutions.map((solution, index) => {
        return `${solution.upvotes}.${index}`;
      });

      const highestTaskUpvotesIndexSorted = Math.max(
        ...userTaskUpvotesIndex
      ).toString();
      const highestTaskUpvotesIndex = highestTaskUpvotesIndexSorted.substr(
        highestTaskUpvotesIndexSorted.indexOf('.') + 1
      );

      const userTaskUpvotes = userTaskSolutions.map((solution) => {
        return solution.upvotes;
      });

      const highestTaskUpvotes = Math.max(...userTaskUpvotes).toString();

      setUpvotesModule({
        totalUpvotes: currentUser.upvotes,
        highestTaskUpvotes: highestTaskUpvotes,
        tasksUpvoted: currentUser.hearts.length,
        highestTaskUpvotesId:
          taskSolutions[+highestTaskUpvotesIndex].taskId &&
          taskSolutions[+highestTaskUpvotesIndex].taskId,
      });
    }
  }, [currentUser, taskSolutions]);

  const logUserOut = () => {
    const date = new Date(1970, 1, 1);
    const authProvider = localStorage.getItem('auth_provider');
    if (authProvider === 'github') {
      document.cookie = `_github_token_=; expires=${date.toUTCString()}; path=/`;
    } else {
      document.cookie = `_discord_token_=; expires=${date.toUTCString()}; path=/`;
    }

    localStorage.removeItem('state');
    localStorage.removeItem('auth_provider');
  };

  return (
    <>
      <Helmet>
        <title>SortCode - Your Profile Stats</title>
      </Helmet>
      {childLoading ? (
        <div className='loading-indicator'>
          <Loading />
        </div>
      ) : (
        <div className='profile-container'>
          <div className='header'>
            <h2>My Dashboard</h2>
          </div>
          <section>
            <h4>Quiz</h4>
            <div className='section'>
              <div className='card'>
                <div className='icon'>
                  <i className='fab fa-angellist'></i>
                </div>
                <div className='description'>
                  <p>Questions Attempted</p>
                  <h2>{questionsModule.questionsAttempted}</h2>
                </div>
              </div>
              <div className='card'>
                <div className='icon'>
                  <i className='fas fa-exclamation-triangle failed'></i>
                </div>
                <div className='description'>
                  <p>Questions Failed</p>
                  <h2>{questionsModule.questionsFailed}</h2>
                </div>
              </div>
              <div className='card'>
                <div className='icon'>
                  <i className='fas fa-check-double correct'></i>
                </div>
                <div className='description'>
                  <p>Questions Gotten</p>
                  <h2>{questionsModule.questionsGotten}</h2>
                </div>
              </div>
            </div>
          </section>
          <section>
            <h4>Challenge</h4>
            <div className='section color'>
              <div className='card'>
                <div className='icon'>
                  <i className='fab fa-angellist'></i>
                </div>
                <div className='description'>
                  <p>Tasks Attempted</p>
                  <h2>{tasksModule.tasksAttempted}</h2>
                </div>
              </div>
              <div className='card'>
                <div className='icon'>
                  <i className='fas fa-forward failed'></i>
                </div>
                <div className='description'>
                  <p>Tasks Skipped</p>
                  <h2>{tasksModule.tasksSkipped}</h2>
                </div>
              </div>
              <div className='card'>
                <div className='icon'>
                  <i className='fas fa-tasks correct'></i>
                </div>
                <div className='description'>
                  <p>Tasks Solved</p>
                  <h2>{tasksModule.tasksSolved}</h2>
                </div>
              </div>
            </div>
          </section>
          <section>
            <h4>Upvotes</h4>
            <div className='section'>
              <div className='card'>
                <div className='icon'>
                  <i className='fas fa-thumbs-up'></i>
                </div>
                <div className='description'>
                  <p>Total Upvotes</p>
                  <h2>{upvotesModule.totalUpvotes}</h2>
                </div>
              </div>
              <div className='card'>
                <div className='icon'>
                  <i className='fas fa-award boss'></i>
                </div>
                <div className='description'>
                  <p>
                    <Link
                      to={`/dashboard/tasks/code/${upvotesModule.highestTaskUpvotesId}#your-code`}
                    >
                      Hisghest Task Upvote
                      <i className='fas fa-link'></i>
                    </Link>
                  </p>
                  <h2>
                    {taskLoading ? (
                      <Loading />
                    ) : (
                      upvotesModule.highestTaskUpvotes
                    )}
                  </h2>
                </div>
              </div>
              <div className='card'>
                <div className='icon'>
                  <i className='far fa-thumbs-up correct'></i>
                </div>
                <div className='description'>
                  <p>
                    <Link to='/dashboard/tasks-upvoted'>
                      Task Solutions Upvoted
                      <i className='fas fa-link'></i>
                    </Link>
                  </p>
                  <h2>{upvotesModule.tasksUpvoted}</h2>
                </div>
              </div>
            </div>
          </section>
          <section>
            <h4>Scores</h4>
            <div className='section diff color'>
              <div className='card'>
                <div className='icon'>
                  <i className='fab fa-angellist'></i>
                </div>
                <div className='description'>
                  <p>Total Score</p>
                  <h2>{currentUser.score}</h2>
                </div>
              </div>
            </div>
          </section>
          <section className='sponsor'>
            <h2>Enjoying SortCode?</h2>
            {/* next feature, indicate sponsorers */}
            <div className='sponsorer-section'>
              <div>
                <div className='avatar'>
                  <img
                    src={currentUser.avatar_url}
                    alt={`${currentUser.username} avatar`}
                  />
                  <i className='fas fa-crown'></i>
                </div>
                <div className='message'>
                  <h3>Sponsor SortCode with your donations</h3>
                  <p>
                    With $5 a month, You could make a lot of impact in SortCode.
                  </p>
                  <p>
                    You can also make a one-time donation.{' '}
                    <a
                      href='https://opencollective.com/sortcodeio'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Learn more.
                    </a>
                  </p>
                  <a
                    href='https://opencollective.com/sortcodeio'
                    target='_blank'
                    rel='noreferrer'
                    className='button'
                  >
                    Donate
                  </a>
                  <a
                    href='/login'
                    className='logout button'
                    onClick={logUserOut}
                  >
                    <i className='fas fa-sign-out-alt'></i>
                    Log out
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
