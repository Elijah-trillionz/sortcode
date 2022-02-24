import React, { useContext, useEffect } from 'react';
import { ChallengeContext } from '../../../../context/challenge states/ChallengeState';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../context/global states/UserState';
import prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-kotlin';

export const CodePreview = ({
  previewing,
  author,
  otherCode,
  userCode,
  otherLang,
}) => {
  const {
    index,
    language,
    parentLoading,
    currentTaskId,
    childLoading,
    taskSolutions,
    taskSample,
    benchmarkResult,
    privLoading,
    runBenchmark,
    newTaskLoading,
  } = useContext(ChallengeContext);
  const { currentUser } = useContext(UserContext);
  const followOrder = previewing ? index !== undefined : true;

  const previewLoading = previewing ? parentLoading : childLoading;

  const userTaskSolution = taskSolutions.filter((taskSolution) => {
    return (
      taskSolution.userId === currentUser.id &&
      taskSolution.taskId === currentTaskId
    );
  });

  const returnUserElement = () => {
    if (taskSample) {
      if (taskSample[0].sample) {
        return {
          __html: taskSample[0].sample,
        };
      }
    } else {
      if (userCode) {
        let lang;
        if (language.toLowerCase() === 'c++') {
          lang = 'cpp';
        } else if (language.toLowerCase() === 'c#') {
          lang = 'csharp';
        } else if (language.toLowerCase() === 'php') {
          lang = 'js';
        } else {
          lang = language.toLowerCase();
        }

        if (lang === 'pseudocode') {
          return { __html: otherCode };
        }

        return {
          __html: prism.highlight(userCode, prism.languages[`${lang}`], lang),
        };
      } else if (userTaskSolution.length >= 1) {
        let lang;
        if (userTaskSolution[0].language.toLowerCase() === 'c++') {
          lang = 'cpp';
        } else if (userTaskSolution[0].language.toLowerCase() === 'c#') {
          lang = 'csharp';
        } else if (userTaskSolution[0].language.toLowerCase() === 'php') {
          lang = 'js';
        } else {
          lang = userTaskSolution[0].language.toLowerCase();
        }

        if (lang === 'php' || lang === 'pseudocode') {
          return { __html: userTaskSolution[0].code };
        }

        return {
          __html: prism.highlight(
            userTaskSolution[0].code,
            prism.languages[`${lang}`],
            lang
          ),
        };
      } else if (!userCode) {
        return {
          __html: `<div className='empty'><p>Your code displays here.</p></div>`,
        };
      }
    }
  };

  const returnOtherElement = () => {
    if (author !== 'Your Code' || !previewing) {
      let lang;
      if (otherLang.toLowerCase() === 'c++') {
        lang = 'cpp';
      } else if (otherLang.toLowerCase() === 'c#') {
        lang = 'csharp';
      } else if (otherLang.toLowerCase() === 'php') {
        lang = 'js';
      } else {
        lang = otherLang;
      }

      if (lang === 'pseudocode') {
        return { __html: otherCode };
      }

      return {
        __html: prism.highlight(otherCode, prism.languages[`${lang}`], lang),
      };
    }
  };

  const useCaseLanguage = previewing
    ? userTaskSolution.length >= 1
      ? userTaskSolution[0].language
      : language
    : otherLang;

  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    const copyAlert = document.querySelector('.copy-alert');
    copyAlert.classList.add('active');
    setTimeout(() => {
      copyAlert.classList.remove('active');
    }, 1500);

    let useCaseCode = userTaskSolution.length >= 1 && userTaskSolution[0].code;
    if (author !== 'Your Code' || !previewing) {
      useCaseCode = otherCode;
    }

    textarea.value = useCaseCode;
    document.body.appendChild(textarea);
    textarea.select();

    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const checkPerformance = () => {
    let useCaseCode = userTaskSolution.length >= 1 && userTaskSolution[0].code;
    if (author !== 'Your Code' || !previewing) {
      useCaseCode = otherCode;
    }

    runBenchmark(useCaseCode);
  };

  useEffect(() => {
    if (!privLoading && benchmarkResult) {
      document.querySelector('#performance-text').innerText = benchmarkResult;
    }
  }, [benchmarkResult, privLoading]);

  const openPerformanceModal = () => {
    document.querySelector('.performance-modal-alert').classList.add('active');
    document.querySelector('.body-container-modal').classList.add('active');
    checkPerformance();
  };

  const closePerformanceModal = () => {
    document
      .querySelector('.performance-modal-alert')
      .classList.remove('active');
    document.querySelector('.body-container-modal').classList.remove('active');
  };

  return (
    <>
      {!previewLoading && (
        <>
          <div
            className='code-preview-content'
            style={{
              display: `${followOrder ? 'block' : 'none'}`,
            }}
          >
            <div className='header'>
              <div className='mac'>
                <div className='mac-buttons'></div>
                <div className='mac-buttons'></div>
                <div className='mac-buttons'></div>
                <div className='display-lang'>
                  {previewing
                    ? taskSample
                      ? 'sample'
                      : userTaskSolution.length >= 1
                      ? userTaskSolution[0].language
                      : language
                    : otherLang}
                </div>
                {useCaseLanguage.toLowerCase() === 'js' && (
                  <div className='performance'>
                    <i
                      className='fas fa-tachometer-alt'
                      onClick={openPerformanceModal}
                    ></i>
                  </div>
                )}
              </div>
              <div className='code-indicator'>
                {author}
                {author === 'Your Code' && <i className='fas fa-user-tie'></i>}
              </div>
            </div>
            <div className='code-body'>
              {previewing ? (
                newTaskLoading ? (
                  <>loading...</>
                ) : (
                  <>
                    {index !== undefined && (
                      <pre className='longer'>
                        <code
                          dangerouslySetInnerHTML={returnUserElement()}
                        ></code>
                      </pre>
                    )}
                  </>
                )
              ) : (
                <pre className='shorter'>
                  <code dangerouslySetInnerHTML={returnOtherElement()}></code>
                </pre>
              )}
            </div>
            <div className='footer-contents'>
              <div>
                <svg
                  version='1.1'
                  id='Capa_1'
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  viewBox='0 0 210.107 210.107'
                  onClick={copyToClipboard}
                >
                  <g>
                    <path
                      d='M168.506,0H80.235C67.413,0,56.981,10.432,56.981,23.254v2.854h-15.38
		c-12.822,0-23.254,10.432-23.254,23.254v137.492c0,12.822,10.432,23.254,23.254,23.254h88.271
		c12.822,0,23.253-10.432,23.253-23.254V184h15.38c12.822,0,23.254-10.432,23.254-23.254V23.254C191.76,10.432,181.328,0,168.506,0z
		 M138.126,186.854c0,4.551-3.703,8.254-8.253,8.254H41.601c-4.551,0-8.254-3.703-8.254-8.254V49.361
		c0-4.551,3.703-8.254,8.254-8.254h88.271c4.551,0,8.253,3.703,8.253,8.254V186.854z M176.76,160.746
		c0,4.551-3.703,8.254-8.254,8.254h-15.38V49.361c0-12.822-10.432-23.254-23.253-23.254H71.981v-2.854
		c0-4.551,3.703-8.254,8.254-8.254h88.271c4.551,0,8.254,3.703,8.254,8.254V160.746z'
                    />
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </div>
            </div>
          </div>
          {previewing && (
            <button className='code-call disabled'>
              <Link name='codes' to={`/dashboard/tasks/code/${currentTaskId}`}>
                See solutions from others
              </Link>
            </button>
          )}
          <div className='copy-alert'>
            <p>
              Copied <i className='fas fa-check-circle'></i>
            </p>
          </div>
          <div className='performance-modal-alert'>
            <div>
              <h3>Benchmark Result:</h3>
              <p id='performance-text'>{privLoading && 'Loading...'}</p>
            </div>
          </div>
          <div
            className='body-container-modal'
            onClick={closePerformanceModal}
          ></div>
        </>
      )}
    </>
  );
};
