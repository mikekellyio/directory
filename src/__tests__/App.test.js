import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import store from "../initialState"

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
});
