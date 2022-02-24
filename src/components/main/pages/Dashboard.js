import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from '../layout/Header';
import { JSQuiz } from './quiz pages/JSQuiz';
import { HTMLQuiz } from './quiz pages/HTMLQuiz';
import { JSQuizHistory } from './quiz pages/quiz history page/JSQuizHistory';
import { SideNav } from '../layout/SideNav';
import { Footer } from '../layout/Footer';
import { UserProvider } from '../../../context/global states/UserState';
import { LeaderboardComponent } from './quiz pages/QuizLeaderboard';
import { JSTaskHistory } from './challenge pages/challenge history/JSTaskHistory';
import { Challenge } from './challenge pages/Challenge';
import { Leaderboard } from './challenge pages/ChallengeLeaderboard';
import { NotFound } from './NotFound';
import { Alert } from '../Alert';
import { Support } from '../../landing page layout/page/Support';
import { HTMLQuizProvider } from '../../../context/quiz states/HTMLQuizState';
import { JSQuizProvider } from '../../../context/quiz states/JSQuizState';
import { CSSQuizProvider } from '../../../context/quiz states/CSSQuizState';
import { ChallengeProvider } from '../../../context/challenge states/ChallengeState';
import { AllCodesPage } from './challenge pages/AllCodesPage';
import { LoginPage } from '../../landing page layout/page/LoginPage';
import { CSSQuiz } from './quiz pages/CSSQuiz';
import { Helmet } from 'react-helmet-async';
import { Profile } from './Profile';
import { TasksUpvoted } from './challenge pages/TasksUpvoted';

export const Dashboard = () => {
  // when a visitor visits dashboard, redirect to /dashboard/js
  const openSideNav = () => {
    document.querySelector('.mobile-device').classList.add('active');
    document.querySelector('.body-container').classList.add('active');
  };
  const closeSideNav = () => {
    document.querySelector('.mobile-device').classList.remove('active');
    document.querySelector('.body-container').classList.remove('active');
  };
  const checkOpened = () => {
    return closeSideNav();
  };
  const welcomed = localStorage.getItem('welcomed');
  if (welcomed === null) {
    setTimeout(() => {
      localStorage.setItem('welcomed', true);
    }, 2000);
  }
  return (
    <UserProvider>
      <Helmet>
        <title>SortCode - Dashboard</title>
      </Helmet>
      <ChallengeProvider>
        <HTMLQuizProvider>
          <JSQuizProvider>
            <CSSQuizProvider>
              <Router>
                <div className='dashboard row'>
                  <Header openSideNav={openSideNav} />
                  <SideNav closeSideNav={closeSideNav} />
                  <div className='col-2 non'></div>
                  <div className='col-10 main'>
                    <Switch>
                      <Route
                        exact
                        path='/dashboard/quiz/js'
                        component={JSQuiz}
                      />
                      <Route
                        exact
                        path='/dashboard/quiz/html'
                        component={HTMLQuiz}
                      />
                      <Route
                        exact
                        path='/dashboard/quiz/css'
                        component={CSSQuiz}
                      />
                      <Route
                        exact
                        path='/dashboard/quiz/history'
                        component={JSQuizHistory}
                      />
                      <Route
                        exact
                        path='/dashboard/quiz/leaderboard'
                        component={LeaderboardComponent}
                      />
                      <Route
                        exact
                        path='/dashboard/tasks'
                        component={Challenge}
                      />
                      <Route
                        exact
                        path='/dashboard/tasks/leaderboard'
                        component={Leaderboard}
                      />
                      <Route
                        exact
                        path='/dashboard/tasks/history'
                        component={JSTaskHistory}
                      />
                      <Route
                        exact
                        path='/dashboard/tasks/code/:id'
                        component={AllCodesPage}
                      />
                      <Route
                        exact
                        path='/dashboard/quiz/history'
                        component={JSQuizHistory}
                      />
                      <Route
                        exact
                        path='/dashboard/profile'
                        component={Profile}
                      />
                      <Route
                        exact
                        path='/dashboard/tasks-upvoted'
                        component={TasksUpvoted}
                      />
                      <Route
                        exact
                        path='/dashboard/support'
                        component={Support}
                      />
                      <Route exact path='/login' component={LoginPage} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                  <div
                    className='body-container'
                    onClick={() => checkOpened()}
                  ></div>
                  <div className='loading-helper'></div>
                  <div className='mobile-footer col-12'>
                    <Footer />
                  </div>
                  {welcomed === null && (
                    <Alert
                      title={'Welcome!!'}
                      message={
                        'We believe you will find this tool useful in your coding journey. Watch out for the information icon, it contains relevant information on how to utilize this tool to its greatest height'
                      }
                    />
                  )}
                </div>
              </Router>
            </CSSQuizProvider>
          </JSQuizProvider>
        </HTMLQuizProvider>
      </ChallengeProvider>
    </UserProvider>
  );
};
