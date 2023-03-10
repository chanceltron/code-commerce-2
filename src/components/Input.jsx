import React, { Component } from 'react';
import {
  formatPhoneNumber,
  formatName,
  formatZipCode,
} from '../utils/validations';
import { CARDICON } from '../utils/constants';

export default class Input extends Component {
  state = {
    showPassword: false,
    type: this.props.input.type,
  };

  handleShowPassword = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
      type: prevState.showPassword ? 'password' : 'text',
    }));
  };

  handleInputs = ({ target: { name, value } }) => {
    const { formStep, handleInputs, checkIfFormCompleted } = this.props;
    let inputValue = value;
    switch (name) {
      case 'cellPhone':
      case 'telephone':
        inputValue = formatPhoneNumber(value);
        break;
      case 'postalCode':
        inputValue = formatZipCode(value);
        break;
      case ('fullName',
      'firstName',
      'lastName',
      'addressTitle',
      'cardHolderName'):
        inputValue = formatName(value);
        break;
      default:
        break;
    }
    handleInputs(name, inputValue);
    !checkIfFormCompleted ? null : checkIfFormCompleted();
  };

  render() {
    const { value, handleBlurValidation, errorMessage, cardType } = this.props;
    const { name, label, type, icon, info, options, styles } = this.props.input;
    return (
      <div
        className={`text-left w-fit ${
          styles !== 'inline' ? 'w-full lg:w-1/3' : ''
        }`}>
        <label htmlFor={name}>{label}</label>
        <div
          className={`relative flex justify-between items-center border-2 px-2 outline-gray-300 rounded focus:outline-pink-600 ${
            errorMessage && 'border-red-500 bg-red-100'
          }`}>
          {type === 'text' || type === 'password' || type === 'email' ? (
            <input
              type={type}
              name={name}
              id={name}
              className='w-full py-1 outline-none bg-transparent'
              value={value}
              onChange={this.handleInputs}
              onBlur={handleBlurValidation}
            />
          ) : null}
          {type === 'select' && (
            <select
              name={name}
              id={name}
              className='py-1 max-w-full outline-none bg-transparent'
              onChange={this.handleInputs}>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {icon === 'password' && (
            <button
              className='flex items-center justify-center'
              onClick={this.handleShowPassword}>
              <i
                className={`text-lg fa-solid fa-eye${
                  this.state.showPassword ? '-slash' : ''
                }`}
              />
            </button>
          )}
          {icon === 'card' && (
            <div className='flex items-center justify-center'>
              {cardType && (
                <img
                  src={`${CARDICON[cardType]}`}
                  className={`w-fit h-8 ${console.log({
                    'render: ': cardType,
                  })}`}
                />
              )}
            </div>
          )}
          {errorMessage ? (
            <div className='absolute top-[-25px] right-0 text-red-500'>
              {errorMessage}
            </div>
          ) : null}
        </div>
        <p className='text-xs font-normal pt-1'>{info}</p>
      </div>
    );
  }
}
