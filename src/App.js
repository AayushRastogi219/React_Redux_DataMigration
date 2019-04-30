import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import MainForm from './components/MainForm'
import store from './store/indexStore'
import dashBoard from './components/dashBoard';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Provider store={store}>
            <Route exact path='/' component={MainForm} />
          </Provider>
          <Route exact path='/dashBoard' component={dashBoard} />
        </div>
      </Router>
    );
  }
}

export default App;
