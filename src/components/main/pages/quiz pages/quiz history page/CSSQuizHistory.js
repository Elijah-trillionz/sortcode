import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CSSQuizContext } from '../../../../../context/quiz states/CSSQuizState';
import { Loading } from '../../../layout/Loading';
import marked from 'marked';

export const CSSQuizHistory = () => {
  const {
    questions,
    index: lastCSSIndex,
    parentLoading,
    quizError,
  } = useContext(CSSQuizContext);

  const generatedIndex =
    lastCSSIndex === questions.length + 1 ? questions.length : lastCSSIndex;

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
      <p>You have not attempted any css questions in the CSS Quiz section.</p>
      <Link to='/dashboard/quiz/css'>Get started</Link>
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
    <div>
      <div className='selection'>
        {/* eslint-disable-next-line */}
        <a className='history-lang' name='css' href='#'>
          CSS
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
  );
};
