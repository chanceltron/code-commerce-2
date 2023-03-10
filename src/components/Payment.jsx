import React, { Component } from 'react';
import TextInput from './TextInput';
import { OTHERCARDS, CARDICON } from '../utils/constants';
import {
  cardNumberValidation,
  onlyTextValidation,
  expiryValidation,
  securityCodeValidation,
} from '../utils/validations';

export default class Payment extends Component {
  state = {
    cardHolderName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    error: {},
    cardType: '',
    paymentFormCompleted: false,
  };

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMEX: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card]))
        return card;
    }
    return '';
  };

  handleValidation = (type, value) => {
    let errorText;
    switch (type) {
      case 'cardNumber':
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({
          cardType: this.findDebitCardType(value),
          error: { ...prevState.error, cardNumberError: errorText },
        }));
        break;
      case 'cardHolderName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, cardHolderNameError: errorText },
        }));
        break;
      case 'cvv':
        errorText = securityCodeValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, cvvError: errorText },
        }));
        break;
      default:
        break;
    }
  };

  handleInputData = (name, value) => {
    if (name === 'cardNumber') {
      let mask = value.split(' ').join('');
      if (mask.length) {
        mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
        this.setState({ [name]: mask });
      } else {
        this.setState({ [name]: '' });
      }
    } else {
      this.setState({ [name]: value });
    }
  };

  checkErrorBeforeSave = () => {
    const { paymentInfo, error } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(paymentInfo).forEach((val) => {
      if (!paymentInfo[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: 'Required' };
        isError = true;
      }
      if (error.cardError) {
        errorValue = {
          ...errorValue,
          [`cardNumberError`]: 'Enter a Valid Card Number',
        };
        isError = true;
      }
    });
    this.setState({ error: errorValue });
    return isError;
  };

  handleAddCard = (e) => {
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    if (!errorCheck) {
      this.setState({
        paymentInfo: INIT_CARD,
        cardType: '',
      });
    }
  };

  checkIfPaymentFormCompleted = () => {
    const { cardHolderName, cardNumber, expMonth, expYear, cvv } = this.state;

    if (cardHolderName && cardNumber && expMonth && expYear && cvv) {
      this.setState(() => ({ paymentFormCompleted: true }));
    } else {
      this.setState(() => ({ paymentFormCompleted: false }));
    }
  };

  submitPaymentForm = (e) => {
    e.preventDefault();
    const { cardHolderName, cardNumber, expMonth, expYear, cvv } = this.state;
    const { submitPaymentForm, changeFormStep, total } = this.props;
    const paymentInfo = {
      cardHolderName,
      cardNumber,
      expMonth,
      expYear,
      cvv,
      total,
    };
    submitPaymentForm(paymentInfo);
    changeFormStep(4);
  };

  render() {
    const { paymentFormCompleted, cardType } = this.state;
    const { cart, changeFormStep, total } = this.props;
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
        icon: 'card',
      },
      {
        name: 'expMonth',
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
        error: 'expMonthError',
      },
      {
        name: 'expYear',
        type: 'select',
        options: ['23', '24', '25', '26', '27', '28', '29', '30', '31'],
        label: '',
        styles: 'inline',
        error: 'expYearError',
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
                cardType={cardType}
                value={this.state[input.name]}
                handleInputs={this.handleInputData}
                checkIfFormCompleted={this.checkIfPaymentFormCompleted}
                handleBlurValidation={({ target: { name, value } }) =>
                  this.handleValidation(name, value)
                }
                errorMessage={this.state.error[input.error]}
              />
            ))}
          </div>
          <div className='flex justify-between items-center mt-8 text-white text-xl font-medium md:mx-10'>
            <button
              onClick={() => changeFormStep(2)}
              className='px-8 py-2 bg-stone-400 rounded hover:bg-stone-300 disabled:bg-stone-200'>
              Back
            </button>
            <button
              disabled={!paymentFormCompleted}
              onClick={this.submitPaymentForm}
              className='relative group flex px-8 py-2 bg-pink-600 rounded hover:bg-pink-500 disabled:bg-pink-200'>
              Pay ${total}
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
