import React, { useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../../../context/challenge states/ChallengeState';
import { UserContext } from '../../../context/global states/UserState';
import { Loading } from './Loading';

export const Footer = () => {
  const [indicatorColor, setIndicatorColor] = useState('#475164');
  const [indicatorError, setIndicatorError] = useState('');
  const [indicatorLoader, setIndicatorLoader] = useState('');
  const [indicatorSuccess, setIndicatorSuccess] = useState('');

  const {
    privLoading,
    successIndicator,
    challengeGlobalError,
    setSuccessIndicator,
  } = useContext(ChallengeContext);

  const { childLoading, globalMsg, globalError, setMsg } = useContext(
    UserContext
  );

  // control the indicator handler
  useEffect(() => {
    if (window.location.href.indexOf('/dashboard/tasks/code') === -1) {
      setIndicatorError(challengeGlobalError);
      setIndicatorLoader(privLoading);
      setIndicatorSuccess(successIndicator);
    } else {
      setIndicatorError(globalError);
      setIndicatorLoader(childLoading);
      setIndicatorSuccess(globalMsg);
    }
  }, [
    globalError,
    successIndicator,
    privLoading,
    challengeGlobalError,
    globalMsg,
    childLoading,
  ]);

  // display the indicator on two pages only (tasks page and tasks hostory)
  if (
    window.location.href.indexOf('/dashboard/tasks') !== -1 ||
    window.location.href.indexOf('dashboard/tasks/history') !== -1
  ) {
    document.querySelectorAll('.info-fil').forEach((value) => {
      value.style.display = 'block';
    });
  } else {
    document.querySelectorAll('.info-fil').forEach((value) => {
      value.style.display = 'none';
    });
  }
  useEffect(() => {
    if (indicatorSuccess) {
      setIndicatorColor('#3caf50');
      setTimeout(() => {
        setIndicatorColor('#475164');
        if (window.location.href.indexOf('/dashboard/tasks/code') === -1) {
          setSuccessIndicator(false);
        } else {
          setMsg(false);
        }
      }, 4000);
    }
  }, [indicatorSuccess, setMsg, setSuccessIndicator]);

  useEffect(() => {
    if (indicatorError) {
      setIndicatorColor('red');
    } else {
      setIndicatorColor('#475164');
    }
  }, [indicatorError]);

  return (
    <footer>
      <div className='info-fil' title='Errors Or Success Indicator'>
        <div
          className='indicator-icon'
          style={{
            backgroundColor: indicatorColor,
          }}
        >
          {indicatorLoader ? (
            <Loading />
          ) : indicatorSuccess ? (
            <i className='fa fa-check'></i>
          ) : indicatorError ? (
            <i className='fa fa-exclamation-triangle'></i>
          ) : (
            <svg
              id='Capa_1'
              height='512'
              viewBox='0 0 512 512'
              width='512'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g>
                <path d='m190.448 451 168.574-270h-93.75l60-120h-111.972l-50.01 210h73.491z' />
                <path d='m96.112 299.418-5.215-29.531-90.897 15.63 5.215 29.531z' />
                <path d='m415.888 212.582 5.215 29.531 90.897-15.63-5.215-29.531z' />
                <path d='m105.604 325.507-78.944 45 15 25.986 78.944-45z' />
                <path d='m485.34 141.493-15-25.986-78.944 45 15 25.986z' />
                <path d='m120.604 160.507-78.944-45-15 25.986 78.944 45z' />
                <path d='m485.34 370.507-78.944-45-15 25.986 78.944 45z' />
                <path d='m96.112 212.582-90.897-15.63-5.215 29.531 90.897 15.63z' />
                <path d='m415.888 299.418 90.897 15.63 5.215-29.531-90.897-15.63z' />
              </g>
            </svg>
          )}
        </div>
      </div>
    </footer>
  );
};
