import React, { Component } from 'react';
import ItemCard from './ItemCard';
import Stepper from './Stepper';

export default class Checkout extends Component {
  state = {
    summary: {
      subtotal: 54.99,
      shipping: 0,
      discount: 0,
      total: 0,
    },
    formStep: 1,
  };

  updateSummaryPrices = () => {
    const { cart } = this.props;
    const subtotal = cart
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
    const shipping = (7.99).toFixed(2);
    const discount = (5).toFixed(2);
    const total = (+subtotal + +shipping - +discount).toFixed(2);
    this.setState({ summary: { subtotal, shipping, discount, total } });
  };

  totalPrice = () => {
    const { subtotal, shipping, discount } = this.state.summary;
    return (+subtotal + +shipping - +discount).toFixed(2);
  };

  changeQuantity = async (id, value) => {
    await this.props.changeQuantity(id, value);
    await this.updateSummaryPrices();
  };

  removeFromCart = async (id) => {
    await this.props.removeFromCart(id);
    await this.updateSummaryPrices();
  };

  componentDidMount() {
    this.updateSummaryPrices();
  }

  render() {
    const { formStep, summary } = this.state;
    const { cart } = this.props;

    return (
      <div className='flex justify-between shadow-xl m-5 rounded bg-stone-100'>
        <div className='flex flex-col flex-[3]'>
          <div className='p-6 text-center m-2 rounded'>
            <Stepper
              formStep={formStep}
              changeStep={(step) =>
                step < formStep && this.setState({ formStep: step })
              }
            />
          </div>
          <div className='bg-white m-2 p-3 rounded'>
            {formStep === 1 ? (
              cart.length > 0 ? (
                cart.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    formStep={formStep}
                    changeQuantity={this.changeQuantity}
                    removeFromCart={this.removeFromCart}
                  />
                ))
              ) : (
                <div className='text-center py-8 rounded-lg bg-red-100 text-red-600 font-semibold'>
                  There are no items in your cart!
                </div>
              )
            ) : null}
            {formStep !== 4 && (
              <div className='flex justify-between items-center mx-10 mt-8 text-white text-xl font-medium'>
                <button
                  disabled={formStep === 1}
                  onClick={() => this.setState({ formStep: formStep - 1 })}
                  className='px-8 py-2 bg-stone-400 rounded hover:bg-stone-300 disabled:bg-stone-200'>
                  Back
                </button>
                <button
                  disabled={cart.length === 0}
                  onClick={() => this.setState({ formStep: formStep + 1 })}
                  className='px-8 py-2 bg-pink-600 rounded hover:bg-pink-500 disabled:bg-pink-200'>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='bg-white flex-1 m-2 px-4 rounded'>
          <h2 className='text-right text-2xl font-semibold uppercase py-4 border-b-2'>
            Summary
          </h2>
          {formStep === 1 && (
            <div className='py-4 border-b-2'>
              <h4 className=''>Do you have a promo code?</h4>
              <div className='flex justify-between gap-3'>
                <input
                  type='text'
                  placeholder='Enter promo code'
                  className='font-code border-2 border-stone-500 p-2 w-full'></input>
                <button className='border-2 border-stone-500 text-stone-500 py-2 px-4 font-medium transition-all hover:text-white hover:bg-stone-500'>
                  APPLY
                </button>
              </div>
            </div>
          )}
          {formStep > 1 && (
            <div className='py-4 border-b-2'>
              {cart.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  formStep={formStep}
                  changeQuantity={this.changeQuantity}
                  removeFromCart={this.removeFromCart}
                />
              ))}
            </div>
          )}
          <div className='py-4 border-b-2'>
            <div className='flex justify-between px-2'>
              <h4 className=''>Subtotal:</h4>
              <h4 className='font-medium'>
                {summary.subtotal ? `$${summary.subtotal}` : '-'}
              </h4>
            </div>
            <div className='flex justify-between px-2'>
              <h4 className=''>Shipping & Handling:</h4>
              <h4 className='font-medium'>
                {summary.shipping ? `$${summary.shipping}` : '-'}
              </h4>
            </div>
            <div className='flex justify-between px-2'>
              <h4 className=''>Discount:</h4>
              <h4 className='font-medium'>
                {summary.discount ? `$${summary.discount}` : '-'}
              </h4>
            </div>
            <div className='flex justify-between items-center px-2 font-medium'>
              <h4 className=''>Cart Total:</h4>
              <h4 className='text-pink-600 text-xl'>
                {summary.total ? `$${summary.total}` : '-'}
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
