import React, { Component } from 'react';
import stateData from '../data/state&cities.json';
import TextInput from './TextInput';

export default class Shipping extends Component {
  state = {
    addressTitle: '',
    fullName: '',
    address: '',
    postalCode: '',
    country: ['United States'],
    state: '',
    city: '',
    cities: [],
    cellPhone: '',
    telephone: '',
    error: {},
    selectedShipping: 'standard',
    shippingFormCompleted: false,
  };
  stateList = Object.keys(stateData);

  getCities = (state) => {
    this.setState(() => ({ cities: stateData[state] }));
  };

  handleShippingChange = ({ target: { value } }) => {
    this.setState(() => ({ selectedShipping: value }));
    this.props.changeShippingPrice(
      value === 'express' ? 14.99 : this.props.total > 40 ? 0 : 5.99
    );
  };

  submitShippingForm = (e) => {
    const { submitShippingForm, changeFormStep } = this.props;
    e.preventDefault();
    const {
      addressTitle,
      fullName,
      address,
      postalCode,
      country,
      state,
      city,
      cellPhone,
      telephone,
    } = this.state;

    submitShippingForm({
      addressTitle,
      fullName,
      address,
      postalCode,
      country,
      state,
      city,
      cellPhone,
      telephone,
    });
    changeFormStep(3);
  };

  checkIfShippingFormCompleted = () => {
    const {
      addressTitle,
      fullName,
      address,
      postalCode,
      country,
      state,
      city,
      cellPhone,
      telephone,
    } = this.state;

    if (
      addressTitle &&
      fullName &&
      address &&
      postalCode &&
      state &&
      city &&
      cellPhone
    ) {
      this.setState(() => ({ shippingFormCompleted: true }));
    } else {
      this.setState(() => ({ shippingFormCompleted: false }));
    }
  };

  render() {
    const { shippingFormCompleted, country, cities, selectedShipping } =
      this.state;
    const { total, formStep } = this.props;
    const shippingInputs = [
      {
        name: 'addressTitle',
        type: 'text',
        label: 'Address Title *',
        error: 'addressTitleError',
        styles: `block`,
      },
      {
        name: 'fullName',
        type: 'text',
        label: 'Full Name *',
        error: 'fullNameError',
        styles: `block`,
      },
      {
        name: 'address',
        type: 'text',
        label: 'Address *',
        error: 'addressError',
        styles: `block`,
      },
      {
        name: 'postalCode',
        type: 'text',
        label: 'Postal Code *',
        error: 'postalCodeError',
        styles: `inline`,
      },
      {
        name: 'country',
        type: 'select',
        label: 'Country *',
        options: country,
        error: 'countryError',
        styles: `inline`,
      },
      {
        name: 'state',
        type: 'select',
        label: 'State *',
        options: ['Select', ...this.stateList],
        error: 'stateError',
        styles: `inline`,
      },
      {
        name: 'city',
        type: 'select',
        label: 'City *',
        options: ['Select', ...cities],
        error: 'cityError',
        styles: `inline`,
      },
      {
        name: 'cellPhone',
        type: 'text',
        label: 'Cell Phone *',
        error: 'cellPhoneError',
        styles: `block`,
      },
      {
        name: 'telephone',
        type: 'text',
        label: 'Telephone',
        error: 'telephoneError',
        styles: `block`,
      },
    ];

    return (
      <div>
        <h2 className='text-2xl font-medium p-2 border-b-2'>
          SHIPPING INFORMATION
        </h2>
        <div className='flex gap-2 flex-wrap border-b-2 py-2'>
          {shippingInputs.map((input) => {
            return (
              <TextInput
                key={input.name}
                input={input}
                value={this.state[input.name]}
                formStep={formStep}
                checkIfFormCompleted={this.checkIfShippingFormCompleted}
                handleInputs={(name, value) => {
                  this.setState(() => ({ [name]: value }));
                  name === 'state' && this.getCities(value);
                }}
              />
            );
          })}
        </div>
        <h3 className='text-xl font-medium p-2'>SHIPPING METHOD</h3>
        <div>
          <div>
            <label className='flex gap-4'>
              <input
                type='radio'
                value='standard'
                checked={selectedShipping === 'standard'}
                onChange={this.handleShippingChange}
              />
              <div>
                <h4 className='font-medium'>STANDARD</h4>
                <p>Delivery in 4-6 Business Days - Free ($40 min.)</p>
              </div>
            </label>
          </div>
          <div>
            <label className='flex gap-4'>
              <input
                type='radio'
                value='express'
                checked={selectedShipping === 'express'}
                onChange={this.handleShippingChange}
              />
              <div>
                <h4 className='font-medium'>EXPRESS</h4>
                <p>Delivery in 1-3 Business Days - $14.99</p>
              </div>
            </label>
          </div>
        </div>

        <div className='flex justify-between items-center mt-8 text-white text-xl font-medium md:mx-10'>
          <button
            disabled={formStep === 1}
            onClick={() => this.props.changeFormStep(1)}
            className='px-8 py-2 bg-stone-400 rounded hover:bg-stone-300 disabled:bg-stone-200'>
            Back
          </button>
          <button
            disabled={!shippingFormCompleted}
            onClick={this.submitShippingForm}
            className='relative group flex px-8 py-2 bg-pink-600 rounded hover:bg-pink-500 disabled:bg-pink-200'>
            Next
            {!shippingFormCompleted && (
              <span
                className='absolute w-36 -top-12 transition-all left-1/2 transform -translate-x-1/2 translate-y-1/2
scale-0 rounded-xl border border-pink-600 bg-white p-2 text-xs text-pink-600 font-medium group-hover:scale-100'>
                please fill out all fields
              </span>
            )}
          </button>
        </div>
      </div>
    );
  }
}
