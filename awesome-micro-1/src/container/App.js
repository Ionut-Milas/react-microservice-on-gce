import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Main from "./Main";

class App extends Component {
  render() {
      return <BrowserRouter>
          <Switch>
              <Route path="/" component={Main} />
              <Redirect to="/" />
          </Switch>
      </BrowserRouter>;
  }
}

export default App;
