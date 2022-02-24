import React, { useContext } from 'react';
import { Questioning } from './Questioning';
import { Loading } from '../../layout/Loading';
import { ErrorHandler } from '../../layout/ErrorHandler';
import { Redirect } from 'react-router-dom';

export const Question = ({ QuizContext }) => {
  const {
    questions,
    index,
    parentLoading,
    quizError,
    quizGlobalError,
    staticError,
  } = useContext(QuizContext);

  // generate ids for keys
  const uuidv100 = () => {
    const letter = 'abcdefghijklmnopqrstuvwxyz';
    const uuidArray = `${letter}1234567890123456789123456789$&#@*£€¥%${letter.toUpperCase()}`.split(
      ''
    );
    const uuids = [];
    for (let i = 0; i < 10; i++) {
      uuids.push(uuidArray[Math.floor(Math.random() * uuidArray.length)]);
    }
    return uuids;
  };

  let current, ids;
  const getQuestions = () => {
    if (!parentLoading) {
      ids = [
        uuidv100().join(''),
        uuidv100().join(''),
        uuidv100().join(''),
        uuidv100().join(''),
      ];
      return (current = index < questions.length ? questions[index] : 'done');
    }
  };
  getQuestions();

  // links
  const redirectLink = (link) => {
    window.location = link;
  };

  return (
    <div className='questions-container'>
      {quizError ? (
        <div className='error questions'>
          <i className='fas fa-exclamation-triangle'></i> {quizError}
        </div>
      ) : (
        <>
          {parentLoading ? (
            <div className='loading-indicator'>
              <Loading />
            </div>
          ) : (
            <>
              {quizGlobalError && (
                <ErrorHandler
                  errorMsg={quizGlobalError.errorMsg}
                  statusCode={quizGlobalError.status}
                  context={QuizContext}
                  from='quiz'
                />
              )}
              {staticError && <Redirect push to='/login' />}
              {current !== 'done' ? (
                <Questioning
                  index={index}
                  ids={ids}
                  current={current}
                  QuizContext={QuizContext}
                />
              ) : (
                <div className='done'>
                  <h3>Yahoo! You completed all questions.</h3>
                  <div className='options'>
                    <ul>
                      <li
                        className='options-list'
                        key={1}
                        onClick={() =>
                          redirectLink(
                            'https://www.twitter.com/elijahtrillionz'
                          )
                        }
                      >
                        <b className='alph'>A: </b>
                        <p className='alph'>Contribute questions</p>
                      </li>
                      <li
                        className='options-list'
                        key={2}
                        onClick={() => redirectLink('/dashboard/quiz/history')}
                      >
                        <b className='alph'>B: </b>
                        <p className='alph'>See your history</p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
