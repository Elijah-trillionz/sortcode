import React, { createContext, useEffect, useReducer } from 'react';
import QuizReducer from '../app reducers/QuizReducer';
import axios from 'axios';
import {
  CURRENT_QUESTION_NUM,
  NEXT_QUESTION,
  SET_PARENT_LOADING,
  SET_SCORE,
  SET_CURRENT_SCORE,
  SET_CHILD_LOADING,
  SET_ERROR,
  GET_ALL_QUESTIONS,
  SET_GLOBAL_ERROR,
  SET_STATIC_ERROR,
} from '../app reducers/Types';
import { apiUrl as url } from '../../utils';

const initialState = {
  questions: [],
  index: 0,
  parentLoading: true,
  childLoading: true,
  isIncremented: false,
  currentScore: 0,
  score: 0,
  quizError: false,
  staticError: false,
  quizGlobalError: false,
};

// create context
export const JSQuizContext = createContext(initialState);

// create provider component
export const JSQuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(QuizReducer, initialState);
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

  // get questions from api and last question index number
  useEffect(() => {
    const getQuestion = async () => {
      setParentLoading(true);
      try {
        const res = await axios({
          method: 'GET',
          url: `${url}/api/questions/lang/javascript`,
          headers: {
            [tokenName]: token,
          },
        });

        if (res.data.errorMsg) {
          setParentLoading(false);
          return setQuizError(res.data.errorMsg);
        }

        dispatch({
          type: GET_ALL_QUESTIONS,
          payload: res.data.questions,
        });
      } catch (err) {
        setParentLoading(false);
        return setQuizError(
          `${err.response ? err.response.data.errorMsg : err}`
        );
      }

      try {
        if (token) {
          const serverRes = await axios({
            method: 'GET',
            url: `${url}/api/questions/index`,
            headers: {
              [tokenName]: token,
            },
          });

          dispatch({
            type: CURRENT_QUESTION_NUM,
            payload: serverRes.data.javascriptAnsweredQuestions,
          });
        } else {
          setParentLoading(false);
          return setStaticError(
            'You are not authenticated. Try logging in again.',
            401
          );
        }
      } catch (err) {
        setQuizError(`${err.response ? err.response.data.errorMsg : err}`);
      }
      setParentLoading(false);
    };
    getQuestion();
    // eslint-disable-next-line
  }, []);

  // get next question
  const nextQuestion = async () => {
    try {
      if (token) {
        dispatch({
          type: NEXT_QUESTION,
          payload: state.index,
        });

        await axios({
          method: 'GET',
          url: `${url}/api/questions/update/javascript`,
          headers: {
            [tokenName]: token,
          },
        });
      } else {
        return setStaticError(
          'You are not authenticated. Try logging in again.',
          401
        );
      }
    } catch (err) {
      setQuizGlobalError(
        true,
        `${err.response ? err.response.data.errorMsg : err}`,
        err.response ? err.response.status : 500
      );
    }
  };

  const getTotalScore = async () => {
    setChildLoading(true);
    try {
      if (token) {
        const res = await axios({
          method: 'GET',
          url: `${url}/api/questions/score`,
          headers: {
            [tokenName]: token,
          },
        });
        dispatch({
          type: SET_CURRENT_SCORE,
          payload: res.data.score,
        });
      } else {
        setChildLoading(false);
        return setStaticError(
          'You are not authenticated. Try logging in again.',
          401
        );
      }
    } catch (err) {
      setQuizGlobalError(
        true,
        `${err.response ? err.response.data.errorMsg : err}`,
        err.response ? err.response.status : 500
      );
    }
    setChildLoading(false);
  };
  useEffect(() => {
    getTotalScore();
    // eslint-disable-next-line
  }, []);

  const incrementScore = async () => {
    try {
      if (token) {
        const res = await axios({
          method: 'GET',
          url: `${url}/api/questions/score/update`,
          headers: {
            [tokenName]: token,
          },
        });

        dispatch({
          type: SET_SCORE,
          payload: res.data.newScore,
        });
      } else {
        return setStaticError(
          'You are not authenticated. Try logging in again.',
          401
        );
      }
    } catch (err) {
      setQuizGlobalError(
        true,
        `${err.response ? err.response.data.errorMsg : err}`,
        err.response ? err.response.status : 500
      );
    }
  };

  // set loading
  const setParentLoading = (bool) => {
    dispatch({ type: SET_PARENT_LOADING, payload: bool });
  };

  const setChildLoading = (bool) => {
    dispatch({
      type: SET_CHILD_LOADING,
      payload: bool,
    });
  };

  const setQuizError = (errorMsg) => {
    console.log(errorMsg);
    dispatch({
      type: SET_ERROR,
      payload: `${errorMsg}`,
    });
  };

  const setQuizGlobalError = (notDisplayed, errorMsg, status) => {
    dispatch({
      type: SET_GLOBAL_ERROR,
      payload: notDisplayed ? { errorMsg, status } : false,
    });
  };

  const setStaticError = (errorMsg, status) => {
    dispatch({
      type: SET_STATIC_ERROR,
      payload: { errorMsg, status },
    });
  };

  return (
    <JSQuizContext.Provider
      value={{
        questions: state.questions,
        index: state.index,
        parentLoading: state.parentLoading,
        childLoading: state.childLoading,
        score: state.score,
        currentScore: state.currentScore,
        isIncremented: state.isIncremented,
        quizError: state.quizError,
        staticError: state.staticError,
        quizGlobalError: state.quizGlobalError,
        incrementScore,
        nextQuestion,
        getTotalScore,
        setQuizGlobalError,
      }}
    >
      {children}
    </JSQuizContext.Provider>
  );
};
