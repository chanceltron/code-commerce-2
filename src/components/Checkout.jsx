import React, { Component } from 'react';
import ItemCard from './ItemCard';
import Stepper from './Stepper';
import Cart from './Cart';
import Shipping from './Shipping';
import Payment from './Payment';
import Confirmation from './Confirmation';
import { CARDICON } from '../utils/constants';

export default class Checkout extends Component {
  state = {
    summary: {
      subtotal: 54.99,
      shipping: 0,
      discount: 0,
      total: 0,
    },
    discountCodes: ['discount5', 'discount10'],
    shippingInfo: {},
    paymentInfo: {},
    promoCode: '',
    formStep: 1,
    cartLength: 0,
  };

  updateSummaryPrices = () => {
    const { cart } = this.props;
    const { shipping, discount } = this.state.summary;
    const subtotal = cart
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
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

  applyDiscount = async (e) => {
    e.preventDefault();
    const { discountCodes, summary, promoCode } = this.state;
    if (discountCodes.includes(promoCode)) {
      const discount = promoCode === 'discount5' ? 5 : 10;
      await this.setState({
        summary: { ...summary, discount: discount },
      });
      await this.updateSummaryPrices();
    }
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
            {formStep === 3 && (
              <Payment
                total={summary.total}
                changeFormStep={(step) => this.setState({ formStep: step })}
                submitPaymentForm={(info) =>
                  this.setState({ paymentInfo: info })
                }
              />
            )}
            {formStep === 4 && (
              <Confirmation cardType={this.state.paymentInfo.cardType} />
            )}
          </div>
        </div>
        <div className='bg-white flex-1 m-2 px-4 rounded min-w-[300px]'>
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
                <form
                  onSubmit={this.applyDiscount}
                  className='flex justify-between gap-3'>
                  <input
                    value={this.state.promoCode}
                    type='text'
                    placeholder='Enter promo code'
                    className='font-code border-2 border-stone-500 p-2 w-full'
                    onChange={(e) =>
                      this.setState({ promoCode: e.target.value })
                    }
                  />
                  <input
                    type='submit'
                    value='APPLY'
                    className='border-2 border-stone-500 text-stone-500 py-2 px-4 font-medium transition-all hover:text-white hover:bg-stone-500'></input>
                </form>
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
          {formStep > 2 && (
            <div className='py-4 border-b-2'>
              <h4 className='font-medium'>Shipping Information</h4>
              <div className='flex flex-col'>
                <p>{this.state.shippingInfo.fullName}</p>
                <p>{this.state.shippingInfo.address}</p>
                <p>
                  {this.state.shippingInfo.city},{' '}
                  {this.state.shippingInfo.state}{' '}
                  {this.state.shippingInfo.postalCode}
                </p>
                <p>{this.state.shippingInfo.country}</p>
              </div>
            </div>
          )}
          {formStep > 3 && (
            <div className='py-4 border-b-2'>
              <h4 className='font-medium'>Payment Information</h4>
              <div className='flex flex-col'>
                <p>{this.state.paymentInfo.cardHolderName}</p>
                <div className='flex items-center justify-between flex-wrap'>
                  <div className='flex items-center'>
                    <img
                      src={CARDICON[this.state.paymentInfo.cardType]}
                      alt=''
                      className='h-8 w-15'
                    />
                    <p>...{this.state.paymentInfo.cardNumber.slice(-4)}</p>
                  </div>
                  <p>
                    Amount Paid:{' '}
                    <span className='font-medium'>{summary.total}</span>
                  </p>
                </div>
              </div>
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
