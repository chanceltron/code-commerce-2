import { Component } from 'react';
import './App.css';
import Login from './components/Login';

export default class App extends Component {
  state = {};
  render() {
    return (
      <div className='font-fira font-light m-auto'>
        <Login></Login>
      </div>
    );
  }
}
