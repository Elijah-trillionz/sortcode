import React, { useContext, useEffect } from 'react';
import { ChallengeContext } from '../../../../context/challenge states/ChallengeState';

export const CodeEditor = ({
  codeValue,
  onChangeCodeValue,
  initialUserCodeValue,
}) => {
  const {
    addTaskSolution,
    index,
    allTaskSolutions,
    privLoading,
    language,
    parentLoading,
    currentTaskId,
  } = useContext(ChallengeContext);

  const handleValues = (e) => {
    onChangeCodeValue(e.target.value);
  };

  const sendToDB = (txtValue) => {
    // id to be added by the database and used to differentiate the solutions
    const formattedLanguage =
      language.toLowerCase() === 'c#' ? 'csharp' : language.toLowerCase();
    const codeSolution = {
      taskId: currentTaskId,
      code: txtValue,
      language: formattedLanguage,
    };
    addTaskSolution(codeSolution);
  };

  useEffect(() => {
    if (!privLoading) {
      allTaskSolutions('all');
    }
    // eslint-disable-next-line
  }, [privLoading]);

  const submitInput = (e) => {
    e.preventDefault();
    const userCodeValue = e.target.firstElementChild.value;
    if (userCodeValue) {
      if (
        /[A-Z]/g.test(userCodeValue) ||
        /[a-z]/g.test(userCodeValue) ||
        /[0-9]/g.test(userCodeValue)
      ) {
        codeValue(userCodeValue);
        document.querySelector('.code-call').classList.remove('disabled');
        sendToDB(userCodeValue);
      }
    } else {
      return;
    }
  };

  return (
    <>
      {!parentLoading && (
        <div className='code-editor-content'>
          {index !== undefined && (
            <form name='code-editor' onSubmit={submitInput}>
              <textarea
                placeholder={`Enter solution in ${language} lang here...`}
                autoCapitalize='off'
                autoCorrect='off'
                autoComplete='off'
                value={initialUserCodeValue}
                onChange={handleValues}
              ></textarea>
              <input type='submit' value='Done' name='submit' />
            </form>
          )}
        </div>
      )}
    </>
  );
};
