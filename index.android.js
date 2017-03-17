import { createStore } from 'redux';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { AppRegistry, View, Navigator, StyleSheet } from 'react-native';

import resucer from './src/reducers';

import App from './src/App';


const store = createStore((state = [], action) => {
  return state;
})

export default class Root extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: store
    };
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    );
  }

}

AppRegistry.registerComponent('Rovese', () => Root);