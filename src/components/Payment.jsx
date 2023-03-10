import React, { Component } from 'react';
import TextInput from './TextInput';

export default class Payment extends Component {
  state = {
    cardHolderName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    error: {},
    paymentFormCompleted: false,
  };
  render() {
    const { paymentFormCompleted } = this.state;
    const { cart } = this.props;
    const paymentInputs = [
      {
        name: 'cardHolderName',
        type: 'text',
        label: 'Card Holder *',
        error: 'cardHolderNameError',
        styles: 'block',
      },
      {
        name: 'cardNumber',
        type: 'text',
        label: 'Card Number *',
        error: 'cardNumberError',
        styles: 'block',
      },
      {
        name: 'expDateMonth',
        type: 'select',
        options: [
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
        ],
        label: 'Expiration *',
        styles: 'inline',
        error: 'expDateMonthError',
      },
      {
        name: 'expDateYear',
        type: 'select',
        options: ['23', '24', '25', '26', '27', '28', '29', '30', '31'],
        label: '',
        styles: 'inline',
        error: 'expDateYearError',
      },
      {
        name: 'cvv',
        type: 'password',
        label: 'CVV *',
        error: 'cvvError',
        styles: 'block',
      },
    ];
    return (
      <div>
        <div>
          <h2 className='text-2xl font-medium p-2 border-b-2'>
            PAYMENT INFORMATION
          </h2>

          <div className='flex gap-2 flex-wrap border-b-2 py-4 items-end'>
            {paymentInputs.map((input) => (
              <TextInput
                key={input.name}
                input={input}
                value={this.state[input.name]}
                onChange={this.handleChange}
                error={this.state.error[input.error]}
              />
            ))}
          </div>
          <div className='flex justify-between items-center mt-8 text-white text-xl font-medium md:mx-10'>
            <button
              onClick={() => this.props.changeFormStep(1)}
              className='px-8 py-2 bg-stone-400 rounded hover:bg-stone-300 disabled:bg-stone-200'>
              Back
            </button>
            <button
              disabled={!paymentFormCompleted}
              onClick={this.submitShippingForm}
              className='relative group flex px-8 py-2 bg-pink-600 rounded hover:bg-pink-500 disabled:bg-pink-200'>
              Pay ${this.props.total}
              {!paymentFormCompleted && (
                <span
                  className='absolute w-36 -top-12 transition-all left-1/2 transform -translate-x-1/2 translate-y-1/2
                scale-0 rounded-xl border border-pink-600 bg-white p-2 text-xs text-pink-600 font-medium group-hover:scale-100'>
                  please fill out all fields
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
