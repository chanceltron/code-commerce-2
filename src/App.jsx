import { Component } from 'react';
import Login from './components/Login';
import Checkout from './components/Checkout';

export default class App extends Component {
  state = {
    users: [
      {
        id: 1,
        email: 'test@test.com',
        firstName: 'Chance',
        lastName: 'Ludwick',
        password: 'password',
        postalCode: 55555,
      },
    ],
    loggedInUser: {},
    screen: 'login',
  };

  createNewUser = (newUser) => {
    this.setState((prevState) => ({
      users: [...prevState.users, newUser],
    }));
  };

  handleLogin = (user) => this.setState({ loggedInUser: user });

  handleSwitchScreen = (value) => this.setState({ screen: value });

  render() {
    return (
      <div className='font-fira font-light m-auto'>
        {this.state.screen === 'login' && (
          <Login
            users={this.state.users}
            createNewUser={this.createNewUser}
            handleLogin={this.handleLogin}
            handleSwitchScreen={this.handleSwitchScreen}
          />
        )}
        {this.state.screen === 'checkout' && <Checkout />}
      </div>
    );
  }
}
