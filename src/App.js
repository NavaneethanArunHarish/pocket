import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Syllabus from './containers/syllabus';
import reducers from './reducers';
import './App.css';

const createStoreWithMiddleware = applyMiddleware()(createStore);

export default class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div>
            <Route path='' component={Syllabus} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}