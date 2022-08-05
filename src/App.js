import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import settings from './pages/settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ settings } />
      </Switch>
    </div>
  );
}
