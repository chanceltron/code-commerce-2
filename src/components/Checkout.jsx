import React, { Component } from 'react';
import ItemCard from './ItemCard';
import Stepper from './Stepper';
import Cart from './Cart';
import Shipping from './Shipping';

export default class Checkout extends Component {
  state = {
    summary: {
      subtotal: 54.99,
      shipping: 0,
      discount: 0,
      total: 0,
    },
    shippingInfo: {},
    formStep: 3,
    cartLength: 0,
  };

  updateSummaryPrices = () => {
    const { cart } = this.props;
    const subtotal = cart
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
    const shipping = this.state.summary.shipping;
    const discount = this.state.summary.discount;
    const total = (+subtotal + +shipping - +discount).toFixed(2);
    this.setState({ summary: { subtotal, shipping, discount, total } });
  };

  updateTotalQuantity = () => {
    const { cart } = this.props;
    const totalQuantity = cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    this.setState({ cartLength: totalQuantity });
  };

  changeQuantity = async (id, value) => {
    await this.props.changeQuantity(id, value);
    await this.updateSummaryPrices();
    await this.updateTotalQuantity();
  };

  removeFromCart = async (id) => {
    await this.props.removeFromCart(id);
    await this.updateSummaryPrices();
  };

  componentDidMount() {
    this.updateSummaryPrices();
    this.updateTotalQuantity();
  }

  render() {
    const { formStep, summary, cartLength } = this.state;
    const { cart } = this.props;

    return (
      <div className='flex flex-col justify-between shadow-xl rounded bg-stone-100 md:flex-row md:m-5'>
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
            {formStep === 1 && (
              <Cart
                changeQuantity={this.changeQuantity}
                removeFromCart={this.removeFromCart}
                formStep={formStep}
                changeFormStep={() => this.setState({ formStep: 2 })}
                cart={cart}
              />
            )}
            {formStep === 2 && (
              <Shipping
                total={summary.total}
                formStep={formStep}
                submitShippingForm={(info) =>
                  this.setState({ shippingInfo: info })
                }
                changeFormStep={(step) => this.setState({ formStep: step })}
                changeShippingPrice={async (price) => {
                  await this.setState({
                    summary: { ...summary, shipping: price },
                  });
                  await this.updateSummaryPrices();
                }}
              />
            )}
          </div>
        </div>
        <div className='bg-white flex-1 m-2 px-4 rounded'>
          <h2 className='text-right text-2xl font-semibold uppercase py-4 border-b-2'>
            Summary
          </h2>
          {formStep === 1 && (
            <div>
              <div className='py-4 border-b-2 justify-end'>
                <h4>
                  There are <span className='font-medium'>{cartLength}</span>{' '}
                  items in your cart
                </h4>
              </div>
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
            </div>
          )}
          {formStep > 1 && (
            <div className='py-4 border-b-2'>
              <Cart
                changeQuantity={this.changeQuantity}
                removeFromCart={this.removeFromCart}
                formStep={formStep}
                cart={cart}
              />
            </div>
          )}
          <div className='py-4 border-b-2'>
            <div className='flex justify-between px-2'>
              <h4 className=''>Subtotal:</h4>
              <h4 className='font-medium'>${summary.subtotal}</h4>
            </div>
            <div className='flex justify-between px-2'>
              <h4 className=''>Shipping & Handling:</h4>
              <h4 className='font-medium'>${summary.shipping.toFixed(2)}</h4>
            </div>
            <div className='flex justify-between px-2'>
              <h4 className=''>Discount:</h4>
              <h4 className='font-medium'>${summary.discount.toFixed(2)}</h4>
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
