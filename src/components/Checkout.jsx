import React, { Component } from 'react';

export default class Checkout extends Component {
  render() {
    return (
      <div className='flex justify-between shadow-xl max-w-5xl mx-auto bg-stone-100 my-5'>
        <div className='flex flex-col flex-[2]'>
          <div className='bg-pink-300 p-6 text-center'>
            This is Where the progress bar will be
          </div>
          <div className='bg-slate-600'>This is the checkout container</div>
        </div>
        <div className='bg-yellow-300 flex-1'>
          This is the summary container
        </div>
      </div>
    );
  }
}
