import React, { useContext } from 'react';
import { InnerLoading } from '../../layout/InnerLoading';
// import { Loading } from '../../layout/Loading';

export const Scores = ({ QuizContext }) => {
  const { currentScore, score, isIncremented, childLoading } = useContext(
    QuizContext
  );

  return (
    <div className='scoresheet'>
      <span>Score: </span>
      {childLoading ? (
        <InnerLoading isScorePage={true} />
      ) : (
        <b> {!isIncremented ? currentScore : score}</b>
      )}
    </div>
  );
};
