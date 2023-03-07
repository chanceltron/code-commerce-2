import React, { Component } from 'react';
import ItemCard from './ItemCard';
import Stepper from './Stepper';

export default class Checkout extends Component {
  render() {
    return (
      <div className='flex justify-between shadow-xl m-5 rounded bg-stone-100'>
        <div className='flex flex-col flex-[3]'>
          <div className='bg-white p-6 text-center m-2 rounded'>
            <Stepper />
          </div>
          <div className='bg-white m-2 p-3 rounded'>
            {this.props.cart.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                changeQuantity={this.props.changeQuantity}
                removeFromCart={this.props.removeFromCart}
              />
            ))}
          </div>
        </div>
        <div className='bg-white flex-1 m-2 rounded'>
          This is the summary container
        </div>
      </div>
    );
  }
}
