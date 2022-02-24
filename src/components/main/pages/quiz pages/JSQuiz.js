import React, { useEffect, useContext } from 'react';
import { Leaderboard } from '../../quiz/quiz layout/Leaderboard';
import { UserContext } from '../../../../context/global states/UserState';
import { Question } from '../../quiz/quiz layout/Question';
import { Scores } from '../../quiz/quiz layout/Scores';
import { JSQuizContext } from '../../../../context/quiz states/JSQuizState';
import { Helmet } from 'react-helmet-async';

export const JSQuiz = () => {
  const { setNewDestination } = useContext(UserContext);
  const { getTotalScore } = useContext(JSQuizContext);

  useEffect(() => {
    setNewDestination({
      destination: '/dashboard/quiz/history',
      className: 'fas fa-history',
      title: 'See History',
    });
    getTotalScore();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>JavaScript Quiz - SortCode Quiz</title>
      </Helmet>
      <div className='indicator col-12'>
        <p>
          <i className='fab fa-js-square'></i> Quiz
        </p>
        <div className='scores'>
          <Scores QuizContext={JSQuizContext} />
        </div>
      </div>
      <div className='col-8 questions'>
        <Question QuizContext={JSQuizContext} />
      </div>
      <div className='col-4 leaderboard'>
        <Leaderboard />
      </div>
    </>
  );
};
