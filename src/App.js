import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route path="/settings" component={ Settings } />
      <Route path="/game" render={ (props) => <Game { ...props } /> } />
    </Switch>
  );
}
