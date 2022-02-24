import React, { useContext, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { GlobalContext } from '../../../context/global states/GlobalState';
import { Helmet } from 'react-helmet-async';

export const Signin = () => {
  const {
    gitHubSignIn,
    msg,
    discordSignIn,
    checkForToken,
    loading,
    error,
  } = useContext(GlobalContext);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const url = window.location.href.split('');
  url.splice(url.indexOf('#'), 1);
  if (window.location.href.indexOf('#') !== -1) {
    window.location.replace(url.join(''));
  }
  const authProvider = localStorage.getItem('auth_provider');
  const code = useQuery().get('code');
  const globalState = useQuery().get('state');
  // const error = useQuery().get('error');

  useEffect(() => {
    if (!error) {
      if (authProvider === 'discord') {
        return discordSignIn(code, globalState);
      }

      return gitHubSignIn(code, globalState);
    }
    // eslint-disable-next-line
  }, [code, globalState, error]);

  useEffect(() => {
    checkForToken();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='signin-container'>
      <Helmet>
        <title>SortCode - Signing you in through {authProvider}</title>
      </Helmet>
      {msg && <Redirect to='/dashboard/tasks' />}
      {error && <Redirect to='/login' />}
      <div className='content'>
        Signing you in <div className='login-loader'></div>
      </div>
      {loading && (
        <div className='redirect-indicator'>
          <p>Redirecting you to dashboard...</p>
        </div>
      )}
    </div>
  );
};
