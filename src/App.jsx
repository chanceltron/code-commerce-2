import { Component } from 'react';
import Login from './components/Login';
import Checkout from './components/Checkout';
import { items } from './data/items';

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
    cart: [items[0], items[1], items[4], items[5]],
    loggedInUser: {},
    screen: 'checkout',
  };

  createNewUser = (newUser) => {
    this.setState();
  };

  render() {
    const { users, screen, cart } = this.state;
    return (
      <div className='font-fira font-light m-auto'>
        {screen === 'login' && (
          <Login
            users={users}
            createNewUser={(newUser) =>
              this.setState({
                users: [...this.state.users, newUser],
              })
            }
            loginUser={(email, password) =>
              this.setState({ loggedInUser: { email, password } })
            }
            changeScreen={(screenName) => this.setState({ screen: screenName })}
          />
        )}
        {screen === 'checkout' && (
          <Checkout
            cart={cart}
            removeFromCart={(id) =>
              this.setState({
                cart: this.state.cart.filter((item) => item.id !== id),
              })
            }
            changeQuantity={(id, value) =>
              this.setState({
                cart: this.state.cart.map((item) =>
                  item.id === id ? { ...item, quantity: +value } : item
                ),
              })
            }
          />
        )}
      </div>
    );
  }
}
