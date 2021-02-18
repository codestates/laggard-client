import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/main" component={Main} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
