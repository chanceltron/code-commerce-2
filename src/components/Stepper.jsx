import React, { Component } from 'react';

export default class Stepper extends Component {
  render() {
    // const { step } = this.props;
    let step = 1;
    let screen = 'cart';
    return (
      <div className='flex justify-between items-center text-white'>
        <div
          className={`flex justify-center items-center ${
            screen === 'cart'
              ? 'bg-white text-pink-600 ring-4 ring-pink-600'
              : 'bg-stone-400'
          } bg-pink-600 w-10 h-10 rounded-full`}>
          <a>
            <i className='fa-solid fa-cart-shopping'></i>
          </a>
        </div>
        <div
          className={`flex justify-center items-center ${
            step > 1 ? 'bg-pink-600' : 'bg-stone-400'
          } bg-pink-600 w-10 h-10 rounded-full`}>
          <a>
            <i className='fa-solid fa-truck-fast'></i>
          </a>
        </div>
        <div
          className={`flex justify-center items-center ${
            step > 2 ? 'bg-pink-600' : 'bg-stone-400'
          } bg-pink-600 w-10 h-10 rounded-full`}>
          <a>
            <i className='fa-solid fa-credit-card'></i>
          </a>
        </div>
        <div
          className={`flex justify-center items-center ${
            step > 3 ? 'bg-pink-600' : 'bg-stone-400'
          } bg-pink-600 w-10 h-10 rounded-full`}>
          <a>
            <i className='fa-solid fa-check-double'></i>
          </a>
        </div>
      </div>
    );
  }
}
