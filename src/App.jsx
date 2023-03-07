import { Component } from 'react';
import Login from './components/Login';

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
  };

  createNewUser = (newUser) => {
    this.setState((prevState) => ({
      users: [...prevState.users, newUser],
    }));
  };

  handleLogin = (user) => this.setState({ loggedInUser: user });

  render() {
    return (
      <div className='font-fira font-light m-auto'>
        <Login
          users={this.state.users}
          createNewUser={this.createNewUser}
          handleLogin={this.handleLogin}
        />
      </div>
    );
  }
}
