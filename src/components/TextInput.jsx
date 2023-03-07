import React, { Component } from 'react';

export default class TextInput extends Component {
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

  render() {
    const { value, handleInputs, handleBlurValidation, errorMessage } =
      this.props;
    const { name, label, icon, info } = this.props.input;
    return (
      <div className='text-left py-2'>
        <label htmlFor={name}>{label}</label>
        <div
          className={`relative w-full flex justify-between items-center border-2 px-2 outline-gray-300 rounded focus:outline-pink-600 ${
            errorMessage && 'border-red-500 bg-red-100'
          }`}>
          <input
            type={this.state.type}
            name={name}
            id={name}
            className='w-full p-2 outline-none bg-transparent'
            value={value}
            onChange={(e) => handleInputs(e)}
            onBlur={(e) => handleBlurValidation(e)}
          />
          {icon && (
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
