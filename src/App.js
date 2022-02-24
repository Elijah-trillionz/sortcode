import React from 'react';
import './style/Main.css';
import './style/Prism.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { WelcomePage } from './components/landing page layout/page/WelcomePage';
import { Dashboard } from './components/main/pages/Dashboard';
import { E404 } from './components/404';
import { SignUpPage } from './components/landing page layout/page/SignUpPage';
import { LoginPage } from './components/landing page layout/page/LoginPage';
import { GlobalProvider } from './context/global states/GlobalState';
import { Signin } from './components/landing page layout/page/Signin';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <GlobalProvider>
      <HelmetProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={WelcomePage} />
            <Route path='/signup' component={SignUpPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/sign-in' component={Signin} />
            <Route path='/dashboard' component={Dashboard} />
            <Route component={E404} />
          </Switch>
        </Router>
      </HelmetProvider>
    </GlobalProvider>
  );
}

export default App;
