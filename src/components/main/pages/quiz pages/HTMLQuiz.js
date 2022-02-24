import React, { useContext, useEffect } from 'react';
import { Leaderboard } from '../../quiz/quiz layout/Leaderboard';
import { Question } from '../../quiz/quiz layout/Question';
import { Scores } from '../../quiz/quiz layout/Scores';
import { HTMLQuizContext } from '../../../../context/quiz states/HTMLQuizState';
import { UserContext } from '../../../../context/global states/UserState';
import { Helmet } from 'react-helmet-async';

export const HTMLQuiz = () => {
  const { setNewDestination } = useContext(UserContext);
  const { getTotalScore } = useContext(HTMLQuizContext);

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
        <title>HTML Quiz - SortCode Quiz</title>
      </Helmet>
      <div className='indicator col-12'>
        <p>HTML Quiz</p>
        <div className='scores'>
          <Scores QuizContext={HTMLQuizContext} />
        </div>
      </div>
      <div className='col-8 questions'>
        <Question QuizContext={HTMLQuizContext} />
      </div>
      <div className='col-4 leaderboard'>
        <Leaderboard />
      </div>
    </>
  );
};
