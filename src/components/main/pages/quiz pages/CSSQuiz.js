import React, { useContext, useEffect } from 'react';
import { Leaderboard } from '../../quiz/quiz layout/Leaderboard';
import { Question } from '../../quiz/quiz layout/Question';
import { Scores } from '../../quiz/quiz layout/Scores';
import { CSSQuizContext } from '../../../../context/quiz states/CSSQuizState';
import { UserContext } from '../../../../context/global states/UserState';
import { Helmet } from 'react-helmet-async';

export const CSSQuiz = () => {
  const { setNewDestination } = useContext(UserContext);
  const { getTotalScore } = useContext(CSSQuizContext);

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
        <title>CSS Quiz - SortCode Quiz</title>
      </Helmet>
      <div className='indicator col-12'>
        <p>CSS Quiz</p>
        <div className='scores'>
          <Scores QuizContext={CSSQuizContext} />
        </div>
      </div>
      <div className='col-8 questions'>
        <Question QuizContext={CSSQuizContext} />
      </div>
      <div className='col-4 leaderboard'>
        <Leaderboard />
      </div>
    </>
  );
};
