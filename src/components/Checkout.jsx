import React, { Component } from 'react';
import ItemCard from './ItemCard';
import Stepper from './Stepper';

export default class Checkout extends Component {
  state = {
    summary: {
      subtotal: 0,
      shipping: 0,
      discount: 0,
      total: 0,
    },
    formStep: 1,
  };

  render() {
    return (
      <div className='flex justify-between shadow-xl m-5 rounded bg-stone-100'>
        <div className='flex flex-col flex-[3]'>
          <div className='p-6 text-center m-2 rounded'>
            <Stepper
              formStep={this.state.formStep}
              changeStep={(step) =>
                step < this.state.formStep && this.setState({ formStep: step })
              }
            />
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
            {this.state.formStep !== 4 && (
              <div className='flex justify-between items-center mx-10 mt-8'>
                <button
                  disabled={this.state.formStep === 1}
                  onClick={() =>
                    this.setState({ formStep: this.state.formStep - 1 })
                  }
                  className='px-6 py-3 bg-stone-400 rounded text-white font-medium hover:bg-stone-300 disabled:bg-stone-200'>
                  Back
                </button>
                <button
                  onClick={() =>
                    this.setState({ formStep: this.state.formStep + 1 })
                  }
                  className='px-6 py-3 bg-pink-600 rounded text-white font-medium hover:bg-pink-500'>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='bg-white flex-1 m-2 rounded'>
          This is the summary container
        </div>
      </div>
    );
  }
}
