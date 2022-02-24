import React from 'react';
import { Options } from './Options';
import marked from 'marked';

export const Questioning = ({ current, QuizContext, ids, index }) => {
  const questInHTML = marked(`${current.quest}?`);
  const questInPlainText = questInHTML.replace(/<(?:.|\n)*?>/gm, '');

  return (
    <>
      <div className='quest'>
        <p className='index'>
          <strong className='quest-p'>Q {index + 1}: </strong>
        </p>
        <p>
          <span
            className='marked'
            dangerouslySetInnerHTML={{
              __html: marked(`${current.quest}?`),
            }}
          ></span>
        </p>
      </div>
      <div className='options'>
        <Options
          options={current.options}
          id={ids}
          ans={current.ans}
          QuizContext={QuizContext}
        />
      </div>
      <div className='bottom-props'>
        <div className='info'>
          <i className='fas fa-info-circle'></i>
          <div className='info-content'>
            <span>
              <b>Info: </b> Green borders indicates a correct answer and red
              indicates a wrong answer. Check the history page to see all
              answers. <br />
              Your score is incremented by 5 if answer is correct.
            </span>
            <div className='after'></div>
          </div>
        </div>

        <div className='source'>
          <p>
            by <span>{current.src}</span>
          </p>
        </div>
      </div>
      <div className='share quiz' title='share to twitter'>
        <a
          href={`https://twitter.com/intent/tweet?text=Hey guys, check out this question%0AQuestion: ${questInPlainText}%0A@SortCode%0Ahttps://sortcode.io/signup`}
          className='twitter-share-button'
          target='_blank'
          rel='noreferrer'
        >
          <i className='fab fa-twitter'></i>
          <span>Tweet</span>
        </a>
      </div>
    </>
  );
};
