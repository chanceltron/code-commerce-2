import React, { Component } from 'react';

export default class Confirmation extends Component {
  render() {
    return (
      <div>
        <h2 className='text-lg font-medium p-2 border-b-2'>CONFIRMATION</h2>
        <div className='flex flex-col justify-center items-center py-8 text-center'>
          <i className='py-6 text-[80px] text-pink-600 font-medium fa-regular fa-circle-check' />
          <h1 className='text-2xl font-medium'>Congratulations!</h1>
          <h2 className='text-xl font-medium'>
            You're order has been accepted.
          </h2>
          <p className='py-3'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut fuga
            nesciunt alias.
          </p>
          <button className='my-2 bg-black text-white py-4 px-14 font-medium text-lg hover:bg-stone-700'>
            TRACK ORDER
          </button>
          <button className='my-2 border border-black py-2 px-4 hover:bg-black hover:text-white'>
            BACK TO HOME PAGE
          </button>
        </div>
      </div>
    );
  }
}
