import React from 'react';
import { HTMLQuiz } from './HTMLQuiz';
import { LeaderboardComponent } from './QuizLeaderboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { JSQuiz } from './JSQuiz';
import { CSSQuiz } from './CSSQuiz';
import { NotFound } from '../NotFound';
import { JSQuizHistory } from './quiz history page/JSQuizHistory';
import { HTMLQuizProvider } from '../../../../context/quiz states/HTMLQuizState';
import { JSQuizProvider } from '../../../../context/quiz states/JSQuizState';
import { CSSQuizProvider } from '../../../../context/quiz states/CSSQuizState';

export const QuizRouter = () => {
  return (
    <HTMLQuizProvider>
      <JSQuizProvider>
        <CSSQuizProvider>
          <Router>
            <Switch>
              <Route exact path='/dashboard/quiz/html' component={HTMLQuiz} />
              <Route exact path='/dashboard/quiz/js' component={JSQuiz} />
              <Route exact path='/dashboard/quiz/css' component={CSSQuiz} />
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
              <Route component={NotFound} />
            </Switch>
          </Router>
        </CSSQuizProvider>
      </JSQuizProvider>
    </HTMLQuizProvider>
  );
};
