import React, { useContext } from 'react';

export const Options = ({ options, id, ans, QuizContext }) => {
  const alphabets = ['A', 'B', 'C', 'D'];
  let correctAns = false;

  const { nextQuestion, incrementScore } = useContext(QuizContext);

  let limit = false;

  // check if answer is correct
  const checkAnswer = (e) => {
    const yourAns = e.target.innerText.substr(4);
    const optionsList = document.querySelectorAll('.options-list');
    if (yourAns === ans.toString()) {
      e.target.classList.add('correct');
      optionsList.forEach((optionList) => {
        optionList.classList.add('incorrect');
      });
      correctAns = true;
    } else {
      optionsList.forEach((optionList) => {
        optionList.classList.add('incorrect');
        if (optionList.innerText.substr(4) === ans.toString()) {
          optionList.classList.add('correct');
        }
      });
    }

    optionsList.forEach((optionList) => {
      optionList.addEventListener('click', () => {
        nextQuestion();
        if (correctAns) {
          // increment score by 5 and save
          incrementScore();
        }
      });
    });
  };

  const optionItems = options.map((option, index) => {
    if (option.length > 12) {
      limit = true;
    }
    return (
      <li
        className='options-list'
        key={id[index]}
        onClick={checkAnswer}
        style={{
          padding: `${!limit ? '1.1em 1.2em' : '0.8em 1.1em'}`,
          borderRadius: `${!limit ? '14px' : '9px'}`,
        }}
      >
        <b className='alph'>{alphabets[index]}: </b>
        <p className='alph'>{option}</p>
      </li>
    );
  });

  return (
    <div className='options-container'>
      <ul
        style={{
          gridTemplateColumns: `${!limit ? '1fr 1fr' : '1fr'}`,
        }}
      >
        {optionItems}
      </ul>
    </div>
  );
};
