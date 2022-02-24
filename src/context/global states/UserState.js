import React, { createContext, useReducer, useEffect } from 'react';
import {
  GET_USER,
  GET_USERS,
  SET_MSG,
  SET_PARENT_LOADING,
  SET_CHILD_LOADING,
  SET_GLOBAL_ERROR,
  SET_STATIC_ERROR,
  NEW_DESTINATION,
  INCREMENT_DAILY_UPVOTE,
} from '../app reducers/Types';
import UserReducer from '../app reducers/UserReducer';
import { apiUrl as url } from '../../utils';
import axios from 'axios';

const initialState = {
  users: [],
  scores: [],
  upvotes: [],
  currentUser: {},
  parentLoading: true,
  childLoading: true,
  specialLoadSystem: true,
  globalMsg: false,
  globalError: false,
  staticError: false,
  linkInfo: {
    destination: '/dashboard/tasks/history',
    className: 'fas fa-history',
    title: 'See History',
  },
  upvoteData: {
    numOfUpvotesToday: 1,
    date: new Date().toDateString(),
  },
};

// create context
export const UserContext = createContext(initialState);

// create provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
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
  const getUsers = async () => {
    setParentLoading(true);
    try {
      const res = await axios.get(`${url}/api/users`);

      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (err) {
      setGlobalError(
        true,
        `${err.response ? err.response.data.errorMsg : err}`,
        err.response ? err.response.status : 500
      );
    }
    setParentLoading(false);
  };

  const getUser = async () => {
    setChildLoading(true);
    setSpecialLoad(true);
    try {
      if (token) {
        const res = await axios({
          method: 'GET',
          url: `${url}/api/auth/user`,
          headers: {
            [tokenName]: token,
          },
        });

        if (res.data.errorMsg) {
          return setGlobalError(true, res.data.errorMsg, res.status);
        }

        dispatch({
          type: GET_USER,
          payload: res.data.signedInUser,
        });

        if (res.data.signedInUser.upvoteData) {
          dispatch({
            type: 'GET_DAILY_UPVOTE',
            payload: res.data.signedInUser.upvoteData,
          });
        }
      } else {
        setChildLoading(false);
        setSpecialLoad(false);
        return setStaticError(
          'You are not authenticated. Try logging in again.',
          401
        );
      }
    } catch (err) {
      setGlobalError(
        true,
        `${err.response ? err.response.data.errorMsg : err}`,
        err.response ? err.response.status : 500
      );
    }
    setChildLoading(false);
    setSpecialLoad(false);
  };

  useEffect(() => {
    getUsers();
    getUser();
    // eslint-disable-next-line
  }, []);

  // update the upvotes of this id in the database
  const incrementUpvote = async (id) => {
    setChildLoading(true);
    try {
      if (token) {
        const res = await axios({
          method: 'POST',
          url: `${url}/api/upvote`,
          headers: {
            [tokenName]: token,
          },
          data: { taskSolutionId: id, upvoteData: state.upvoteData },
        });

        if (res.data.errorMsg) {
          setChildLoading(false);
          return setGlobalError(true, res.data.errorMsg, res.status);
        }

        dispatch({
          type: INCREMENT_DAILY_UPVOTE,
          payload: res.data.databaseUpvoteData,
        });

        if (res.data.msg) {
          setMsg(true);
        }
      } else {
        setChildLoading(false);
        return setStaticError(
          'You are not authenticated. Try logging in again.',
          401
        );
      }
    } catch (err) {
      setGlobalError(
        true,
        `${err.response ? err.response.data.errorMsg : err}`,
        err.response ? err.response.status : 500
      );
    }
    setChildLoading(false);
  };

  // update the upvotes of this id in the database
  const decrementUpvote = async (id) => {
    setChildLoading(true);
    try {
      const upvoteData = {
        ...state.upvoteData,
        numOfUpvotesToday: state.upvoteData.numOfUpvotesToday,
      };
      if (token) {
        const res = await axios({
          method: 'POST',
          url: `${url}/api/upvote/remove`,
          headers: {
            [tokenName]: token,
          },
          data: { taskSolutionId: id, upvoteData },
        });

        if (res.data.errorMsg) {
          setChildLoading(false);
          return setGlobalError(true, res.data.errorMsg, res.status);
        }

        dispatch({
          type: INCREMENT_DAILY_UPVOTE,
          payload: res.data.databaseUpvoteData,
        });

        if (res.data.msg) {
          setMsg(true);
        }
      } else {
        setChildLoading(false);
        return setStaticError(
          'You are not authenticated. Try logging in again.',
          401
        );
      }
    } catch (err) {
      setGlobalError(
        true,
        `${err.response ? err.response.data.errorMsg : err}`,
        err.response ? err.response.status : 500
      );
    }
    setChildLoading(false);
  };

  // get all upvotes for a task from the database
  // by getting all task solutions with their upvotes
  // then make a function to extract each upvotes and put in their user's profile

  // custom linking
  const setNewDestination = (linkInfo) => {
    dispatch({
      type: NEW_DESTINATION,
      payload: linkInfo,
    });
  };

  // set loading
  const setParentLoading = (bool) => {
    dispatch({
      type: SET_PARENT_LOADING,
      payload: bool,
    });
  };

  const setSpecialLoad = (bool) => {
    dispatch({
      type: 'SET_SPECIAL_LOADING',
      payload: bool,
    });
  };

  const setChildLoading = (bool) => {
    dispatch({
      type: SET_CHILD_LOADING,
      payload: bool,
    });
  };

  const setGlobalError = (notDisplayed, errorMsg, status) => {
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

  const setMsg = (msg) => {
    dispatch({
      type: SET_MSG,
      payload: msg,
    });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        scores: state.scores,
        upvotes: state.upvotes,
        currentUser: state.currentUser,
        parentLoading: state.parentLoading,
        childLoading: state.childLoading,
        globalError: state.globalError,
        globalMsg: state.globalMsg,
        staticError: state.staticError,
        linkInfo: state.linkInfo,
        upvoteData: state.upvoteData,
        specialLoadSystem: state.specialLoadSystem,
        getUsers,
        incrementUpvote,
        decrementUpvote,
        setGlobalError,
        setStaticError,
        setMsg,
        setNewDestination,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
