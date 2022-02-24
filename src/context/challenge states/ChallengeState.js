import React, { createContext, useEffect, useReducer } from 'react';
import ChallengeReducer from '../app reducers/ChallengeReducer';
import { apiUrl as url } from '../../utils';
import {
  ADD_TASKS,
  NEXT_TASK,
  SET_PARENT_LOADING,
  SET_CHILD_LOADING,
  SET_PRIV_LOADING,
  CURRENT_TASK_NUM,
  GET_CURRENT_TASK_ID,
  TASK_SOLUTIONS,
  GET_ALL_TASKS,
  SET_GLOBAL_ERROR,
  SET_ERROR,
  SET_STATIC_ERROR,
  SET_SUCCESS_INDICATOR,
  SET_LANGUAGE,
  DISPLAY_SAMPLE,
  GET_BENCHMARK_RESULT,
  SET_NEW_TASK_LOADING,
} from '../app reducers/Types';
import axios from 'axios';

const initialState = {
  tasks: [],
  index: 0,
  parentLoading: true,
  childLoading: true,
  privLoading: false,
  newTaskLoading: false,
  successIndicator: false,
  upvotes: false,
  taskSolutions: [],
  compiledUpvotes: [],
  challengeError: false,
  challengeGlobalError: false,
  staticError: false,
  language: 'JS',
  currentTaskId: 0,
  taskSample: false,
  benchmarkResult: false,
};

// create context
export const ChallengeContext = createContext(initialState);

// create provider component
export const ChallengeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChallengeReducer, initialState);
  const getDataFromCookie = (data) => {
    const allCookies = document.cookie.split(';');
    const cookie = allCookies.filter((cookie) => {
      return cookie.indexOf(data) !== -1;
    });

    if (cookie.length <= 0) return false;

    return cookie.length >= 1 && cookie[0].trim().split('=')[1];
  };

  const token = getDataFromCookie('_github_token_')
    ? getDataFromCookie('_github_token_')
    : getDataFromCookie('_discord_token_');

  const tokenName = getDataFromCookie('_github_token_')
    ? 'github-token'
    : 'discord-token';

  // actions
  // get current task and all tasks for javascript index

  const getTasksDetail = async () => {
    const difficultyLvl = localStorage.getItem('difficultyLvl')
      ? localStorage.getItem('difficultyLvl')
      : 'beginners';
    setParentLoading(true);
    // get all tasks from magnus dever-api
    try {
      if (token) {
        const apiRes = await axios({
          method: 'GET',
          url: `${url}/api/tasks`,
          headers: {
            [tokenName]: token,
          },
        });

        if (apiRes.data.errorMsg) {
          setParentLoading(false);
          return setChallengeGlobalError(true, apiRes.data.errorMsg, 522);
        }

        const filteredTasks = apiRes.data.tasks.filter((task) => {
          return task.level === difficultyLvl;
        });

        dispatch({
          type: GET_ALL_TASKS,
          payload: filteredTasks,
        });

        // get the last answered tasks' index
        // setParentLoading(true)
        if (apiRes.data.tasks.length > 0) {
          const res = await axios({
            method: 'GET',
            url: `${url}/api/tasks/index`,
            headers: {
              [tokenName]: token,
            },
          });

          switch (difficultyLvl) {
            case 'beginners':
              dispatch({
                type: CURRENT_TASK_NUM,
                payload: res.data.numOfTasks[0],
              });
              break;
            case 'intermediates':
              dispatch({
                type: CURRENT_TASK_NUM,
                payload: res.data.numOfTasks[1],
              });
              break;
            case 'experts':
              dispatch({
                type: CURRENT_TASK_NUM,
                payload: res.data.numOfTasks[2],
              });
              break;
            default:
              dispatch({
                type: CURRENT_TASK_NUM,
                payload: res.data.numOfTasks[0],
              });
          }
        }
      } else {
        setParentLoading(false);
        return setStaticError(
          'You are not authenticated. Try logging in again.',
          401
        );
      }
    } catch (err) {
      setChallengeGlobalError(
        true,
        `${err.response ? err.response.data.errorMsg : err}`,
        `${err.response ? err.response.status : 500}`
      );
    }
    setParentLoading(false);
  };
  useEffect(() => {
    getTasksDetail();
    // eslint-disable-next-line
  }, []);

  // get next question
  const nextTask = async () => {
    setNewTaskLoading(true);
    const difficultyLvl = localStorage.getItem('difficultyLvl')
      ? localStorage.getItem('difficultyLvl')
      : 'beginners';

    try {
      if (token) {
        dispatch({
          type: NEXT_TASK,
          payload: state.index,
        });

        await axios({
          method: 'GET',
          url: `${url}/api/tasks/update/${difficultyLvl}`,
          headers: {
            [tokenName]: token,
          },
        });
      } else {
        setNewTaskLoading(false);
        return setStaticError(
          'You are not authenticated. Try logging in again.',
          401
        );
      }
    } catch (err) {
      setNewTaskLoading(false);
      setChallengeGlobalError(
        true,
        `${err.response ? err.response.data.errorMsg : err}`,
        `${err.response ? err.response.status : 500}`
      );
    }
    setNewTaskLoading(false);
  };

  const allTaskSolutions = async (language) => {
    setChildLoading(true);

    try {
      if (token) {
        const res = await axios({
          method: 'GET',
          url: `${url}/api/task-solutions/${language}`,
          headers: {
            [tokenName]: token,
          },
        });

        dispatch({
          type: TASK_SOLUTIONS,
          payload: res.data.taskSolutions,
        });

        if (res.errorMsg) {
          setChallengeError(res.data.errorMsg);
        }
      } else {
        setChildLoading(false);
        return setStaticError(
          'You are not authenticated. Try logging in again.',
          401
        );
      }
    } catch (err) {
      setChallengeError(`${err.response ? err.response.data.errorMsg : err}`);
    }
    setChildLoading(false);
  };

  useEffect(() => {
    allTaskSolutions('all');
    // eslint-disable-next-line
  }, []);

  // add or update task solution to database
  const addTaskSolution = async (code) => {
    setPrivLoading(true);
    try {
      if (token) {
        const res = await axios({
          method: 'POST',
          url: `${url}/api/task-solutions/new`,
          data: code,
          headers: {
            [tokenName]: token,
          },
        });

        if (res.data.errorMsg) {
          setPrivLoading(false);
          return setChallengeGlobalError(
            true,
            `${res.data.errorMsg}`,
            res.status
          );
        }
        if (res.data.msg) {
          setSuccessIndicator(true);
        }

        dispatch({
          type: ADD_TASKS,
          payload: code,
        });
      } else {
        setPrivLoading(false);
        return setStaticError(
          'You are not authenticated. Try logging in again.',
          401
        );
      }
    } catch (err) {
      setChallengeGlobalError(
        true,
        `${err.response ? err.response.data.errorMsg : err}`,
        500
      );
    }
    setPrivLoading(false);
  };

  // get code benchmark result
  const runBenchmark = async (code) => {
    setPrivLoading(true);
    try {
      const response = await axios.post(`${url}/api/benchmark`, {
        code,
      });

      dispatch({
        type: GET_BENCHMARK_RESULT,
        payload: { result: response.data.result, error: false },
      });
    } catch (err) {
      setChallengeGlobalError(true, `Connection error`, 500);
      dispatch({
        type: GET_BENCHMARK_RESULT,
        payload: { result: false, error: 'Connection error' },
      });
    }
    setPrivLoading(false);
  };

  // display code sample if any
  const displaySample = (taskId, cancel) => {
    dispatch({
      type: DISPLAY_SAMPLE,
      payload: [taskId, cancel],
    });
  };

  // use id for distribution
  const getCurrentTaskId = (taskId) => {
    dispatch({
      type: GET_CURRENT_TASK_ID,
      payload: taskId,
    });
  };

  // set language to use
  const setLanguage = (lang) => {
    dispatch({
      type: SET_LANGUAGE,
      payload: lang,
    });
  };

  // set success indicator
  const setSuccessIndicator = (bool) => {
    dispatch({
      type: SET_SUCCESS_INDICATOR,
      payload: bool,
    });
  };

  // set loading
  const setParentLoading = (bool) => {
    dispatch({
      type: SET_PARENT_LOADING,
      payload: bool,
    });
  };

  // set child loading
  const setChildLoading = (bool) => {
    dispatch({
      type: SET_CHILD_LOADING,
      payload: bool,
    });
  };

  const setPrivLoading = (bool) => {
    dispatch({
      type: SET_PRIV_LOADING,
      payload: bool,
    });
  };

  const setNewTaskLoading = (bool) => {
    dispatch({
      type: SET_NEW_TASK_LOADING,
      payload: bool,
    });
  };

  const setChallengeGlobalError = (notDisplayed, errorMsg, status) => {
    // errors that have no where to be displaye but its actions are not user triggered // errors that affect all of the challenge section
    // this error is hence
    dispatch({
      type: SET_GLOBAL_ERROR,
      payload: notDisplayed ? { errorMsg, status } : false,
    });
  };

  const setChallengeError = (errorMsg) => {
    // errors that have a place to be displayed both user triggered and non-user triggered
    dispatch({
      type: SET_ERROR,
      payload: errorMsg,
    });
  };

  const setStaticError = (errorMsg, status) => {
    dispatch({
      type: SET_STATIC_ERROR,
      payload: { errorMsg, status },
    });
  };

  return (
    <ChallengeContext.Provider
      value={{
        tasks: state.tasks,
        index: state.index,
        parentLoading: state.parentLoading,
        childLoading: state.childLoading,
        newTaskLoading: state.newTaskLoading,
        taskSolutions: state.taskSolutions,
        upvotes: state.upvotes,
        challengeError: state.challengeError,
        challengeGlobalError: state.challengeGlobalError,
        staticError: state.staticError,
        successIndicator: state.successIndicator,
        privLoading: state.privLoading,
        specialLoadSystem: state.specialLoadSystem,
        language: state.language,
        currentTaskId: state.currentTaskId,
        taskSample: state.taskSample,
        benchmarkResult: state.benchmarkResult,
        setLanguage,
        nextTask,
        allTaskSolutions,
        addTaskSolution,
        setSuccessIndicator,
        setChallengeGlobalError,
        setChallengeError,
        getCurrentTaskId,
        displaySample,
        getTasksDetail,
        runBenchmark,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};
