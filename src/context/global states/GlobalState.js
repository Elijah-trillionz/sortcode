import React, { createContext, useReducer } from 'react';
import globalReducer from '../app reducers/GlobalReducer';
import { SET_ERROR, SET_MSG, SET_PARENT_LOADING } from '../app reducers/Types';
import { apiUrl as url } from '../../utils';
import axios from 'axios';

const initialState = {
  loading: false,
  error: false,
  msg: false,
};

// create context
export const GlobalContext = createContext(initialState);

// create provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

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

  const date = new Date();
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);

  const gitHubSignIn = async (code, gitHubState) => {
    try {
      const state = localStorage.getItem('state');
      // TODO: hide passwords and secrets
      if (gitHubState !== state) {
        return setError('This signin process has been compromised');
      }
      const res = await axios.get(
        `${url}/api/auth/github-signin?code=${code}&state=${state}`
      );

      if (res.data.errorMsg) {
        return setError(res.data.errorMsg);
      }

      document.cookie = `_github_token_=${
        res.data.token
      }; expires=${date.toUTCString()};`;
      setMsg(res.data.msg);
    } catch (err) {
      setError(`${err.response ? err.response.data : err}`);
    }
  };

  const discordSignIn = async (code, discordState) => {
    const state = localStorage.getItem('state');
    try {
      if (discordState !== state) {
        return setError('This signin process has been compromised');
      }

      const res = await axios.get(`${url}/api/auth/discord-signin/${code}`);

      if (res.data.errorMsg) {
        return setError(res.data.errorMsg);
      }

      document.cookie = `_discord_token_=${
        res.data.token
      }; expires=${date.toUTCString()};`;
      setMsg(res.data.msg);
    } catch (err) {
      setError(`${err.response ? err.response.data.errorMsg : err}`);
    }
  };

  const checkForToken = async () => {
    try {
      if (token) {
        setLoading(true); // only start loading when token is seen
        const res = await axios({
          method: 'GET',
          url: `${url}/api/auth/user`,
          headers: {
            [tokenName]: token,
          },
        });

        if (res.data.signedInUser.username) setMsg(res.data);
      }
    } catch (err) {
      setError(`${err.response ? err.response.data.errorMsg : err}`);
      setLoading(false);
    }
    setLoading(false);
  };

  const setLoading = (bool) => {
    dispatch({
      type: SET_PARENT_LOADING,
      payload: bool,
    });
  };

  const setError = (errorMsg) => {
    dispatch({
      type: SET_ERROR,
      payload: errorMsg,
    });
  };

  // messages should only come with a 200 response
  const setMsg = (msg) => {
    dispatch({
      type: SET_MSG,
      payload: msg,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        msg: state.msg,
        setError,
        setMsg,
        gitHubSignIn,
        discordSignIn,
        checkForToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
