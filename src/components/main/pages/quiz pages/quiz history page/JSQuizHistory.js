import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../../../context/global states/UserState';
import { JSQuizContext } from '../../../../../context/quiz states/JSQuizState';
import { HTMLQuizHistory } from './HTMLQuizHistory';
import { Loading } from '../../../layout/Loading';
import { Link } from 'react-router-dom';
import { CSSQuizHistory } from './CSSQuizHistory';
import { Helmet } from 'react-helmet-async';
import marked from 'marked';

export const JSQuizHistory = () => {
  const {
    questions,
    index: lastJSIndex,
    parentLoading,
    quizError,
  } = useContext(JSQuizContext);
  const { setNewDestination } = useContext(UserContext);

  useEffect(() => {
    setNewDestination({
      destination: '/dashboard/quiz/js',
      className: 'fas fa-question-circle',
      title: 'Back To Quiz',
    });
    // eslint-disable-next-line
  }, []);

  const generatedIndex =
    lastJSIndex >= questions.length + 1 ? questions.length : lastJSIndex;

  const answeredQuestions = [];
  for (let i = 0; i < generatedIndex; i++) {
    answeredQuestions.push(questions[i]);
  }
  const answeredList = answeredQuestions.map((question) => {
    return (
      <li key={question.id}>
        <span
          className='marked'
          dangerouslySetInnerHTML={{
            __html: marked(`${question.quest}?`),
          }}
        ></span>
        <p>
          <span className='history-ans'>Ans: {question.ans}</span>
          <i>
            <strong>Source:</strong>{' '}
            <a href={question.srcURL}>{question.src}</a>
          </i>
        </p>
      </li>
    );
  });

  const emptyList = (
    <div className='empty'>
      <p>Oops! History is empty</p>
      <p>
        You have not attempted any javascript questions in the JS Quiz section.
      </p>
      <Link to='/dashboard/quiz/js'>Get started</Link>
    </div>
  );

  const errorElement = (
    <div className='empty'>
      <p>Oops! There has been an error</p>
      <p className='error'>
        <i className='fas fa-exclamation-triangle'></i> {quizError}
      </p>
    </div>
  );

  return (
    <div className='history-section'>
      <Helmet>
        <title>Quiz History - HTML | CSS | JavaScript - SortCode Quiz</title>
      </Helmet>
      <h2>Quiz History</h2>
      <span className='notice'>
        The following questions has been attempted by you, and with it are the
        answers to each questions. Corrections are welcomed.
      </span>
      <div className='language-navigation'>
        <ul>
          {/* eslint-disable-next-line */}
          <li>
            <a href='#javascript'>#javascript</a>
          </li>
          {/* eslint-disable-next-line */}
          <li>
            <a href='#html'>#html</a>
          </li>
          {/* eslint-disable-next-line */}
          <li>
            <a href='#css'>#css</a>
          </li>
        </ul>
      </div>
      <div>
        <div className='selection'>
          {/* eslint-disable-next-line */}
          <a name='javascript' className='history-lang' href='#'>
            Javascript
          </a>
        </div>
        <div className='history-list'>
          {parentLoading ? (
            <div className='loading-indicator'>
              <Loading />
            </div>
          ) : (
            <ol>
              {quizError
                ? errorElement
                : generatedIndex > 0
                ? answeredList
                : emptyList}
            </ol>
          )}
        </div>
      </div>
      <div className='other'>
        <HTMLQuizHistory />
        <CSSQuizHistory />
      </div>
    </div>
  );
};
