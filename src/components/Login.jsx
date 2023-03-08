import React, { Component } from 'react';
import TextInput from './TextInput';
import {
  emailValidation,
  passwordComplexityValidation,
  passwordMatchValidation,
  onlyTextValidation,
  postalCodeValidation,
} from '../utils/validations';

// SIGNUP/LOGIN INitial Values
const INIT_VALUES = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  postalCode: '',
  loginEmail: '',
  loginPassword: '',
};

export default class Login extends Component {
  state = {
    inputValues: INIT_VALUES,
    activeScreen: 'signup',
    error: {},
    signupHasError: false,
  };

  handleSwitchScreen = (e) => {
    e.preventDefault();
    this.setState(() => ({
      activeScreen: e.target.value,
    }));
    this.resetInputs();
  };

  handleInputs = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      inputValues: {
        ...prevState.inputValues,
        [name]: value,
      },
    }));
  };

  resetInputs = () => {
    Object.keys(this.state.inputValues).map((key) => {
      this.setState((prevState) => ({
        error: {},
        inputValues: {
          ...prevState.inputValues,
          [key]: '',
        },
      }));
    });
  };

  errorStateToggle = (errorText) => {
    if (errorText) {
      this.setState({ signupHasError: true });
    } else {
      this.setState({ signupHasError: false });
    }
  };

  handleBlurValidation = ({ target: { name, value } }) => {
    let errorText;
    switch (name) {
      case 'email':
        errorText = emailValidation(this.props.users, value);
        this.setState((prevState) => ({
          error: { ...prevState.error, emailError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'password':
        errorText = passwordComplexityValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, passwordComplexityError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'confirmPassword':
        errorText = passwordMatchValidation(
          this.state.inputValues.password,
          value
        );
        this.setState((prevState) => ({
          error: { ...prevState.error, passwordMatchError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'firstName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, firstNameError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'lastName':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, lastNameError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      case 'postalCode':
        errorText = postalCodeValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, postalCodeError: errorText },
        }));
        this.errorStateToggle(errorText);
        break;
      default:
        break;
    }
  };

  submitErrorCheck = () => {
    const { signupHasError } = this.state;
    let isError = false;
    if (signupHasError) {
      isError = true;
    }
    return isError;
  };

  handleNewUser = (e) => {
    e.preventDefault();

    const { email, firstName, lastName, password, postalCode } =
      this.state.inputValues;
    const { createNewUser } = this.props;
    const errorCheck = this.submitErrorCheck();
    const newUser = {
      id: Date.now(),
      email,
      firstName,
      lastName,
      password,
      postalCode,
    };
    if (!errorCheck) {
      createNewUser(newUser);
      this.handleSwitchScreen(e);
    }
  };

  loginUser = (e) => {
    e.preventDefault();
    const { loginEmail, loginPassword } = this.state.inputValues;
    let errorText;

    this.props.users.find((user) => {
      if (user.email === loginEmail && user.password === loginPassword) {
        this.props.loginUser(loginEmail, loginPassword);
        this.resetInputs();
        this.props.changeScreen('checkout');
      } else {
        errorText = 'Email or password is incorrect';
        this.setState((prevState) => ({
          error: { ...prevState.error, loginEmailError: errorText },
        }));
      }
    });
  };

  render() {
    const loginInputs = [
      {
        name: 'loginEmail',
        type: 'email',
        label: 'Email Address',
        error: 'loginEmailError',
      },
      {
        name: 'loginPassword',
        type: 'password',
        icon: true,
        label: 'Password',
        error: 'loginPasswordError',
      },
    ];

    const signupInputs = [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address *',
        error: 'emailError',
      },
      {
        name: 'password',
        type: 'password',
        icon: true,
        label: 'Create Password *',
        info: 'Password must be 8-20 characters, including at least once capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +',
        error: 'passwordComplexityError',
      },
      {
        name: 'confirmPassword',
        type: 'password',
        icon: true,
        label: 'Confirm Password *',
        error: 'passwordMatchError',
      },
      {
        name: 'firstName',
        type: 'text',
        label: 'First Name *',
        error: 'firstNameError',
      },
      {
        name: 'lastName',
        type: 'text',
        label: 'Last Name *',
        error: 'lastNameError',
      },
      {
        name: 'postalCode',
        type: 'text',
        label: 'Postal Code',
        error: 'postalCodeError',
      },
    ];

    return (
      <div className='m-auto rounded-md shadow-2xl max-w-lg py-8'>
        <div className='flex justify-around text-center mb-3'>
          <button
            className={`cursor-pointer w-full border-b-2 ${
              this.state.activeScreen === 'signup' && 'border-b-pink-600 '
            }`}
            value='signup'
            onClick={(e) => this.handleSwitchScreen(e)}>
            Create Account
          </button>
          <button
            className={`cursor-pointer w-full border-b-2 ${
              this.state.activeScreen === 'login' && 'border-b-pink-600 '
            }`}
            value='login'
            onClick={(e) => this.handleSwitchScreen(e)}>
            Sign in
          </button>
        </div>
        <form action='' className='flex flex-col p-4'>
          {this.state.activeScreen === 'signup'
            ? signupInputs.map((input) => (
                <TextInput
                  key={input.name}
                  input={input}
                  value={this.state.inputValues[input.name]}
                  handleInputs={this.handleInputs}
                  handleBlurValidation={this.handleBlurValidation}
                  errorMessage={this.state.error[input.error]}
                />
              ))
            : loginInputs.map((input) => (
                <TextInput
                  key={input.name}
                  input={input}
                  value={this.state.inputValues[input.name]}
                  handleInputs={this.handleInputs}
                  handleBlurValidation={this.handleBlurValidation}
                  errorMessage={this.state.error[input.error]}
                />
              ))}
          <button
            disabled={this.state.signupHasError}
            className={`bg-pink-600 text-white text-xl py-2 my-2 disabled:pointer-events-none disabled:opacity-30`}
            onClick={
              this.state.activeScreen === 'signup'
                ? this.handleNewUser
                : this.loginUser
            }>
            Sign {this.state.activeScreen === 'signup' ? 'up' : 'in'}
          </button>
          <fieldset className='border-t'>
            <legend className='mx-auto px-4'>or</legend>
          </fieldset>
          <button
            className='bg-[#4267B2] text-white text-xl py-2 my-2'
            onClick={(e) => e.preventDefault()}>
            Sign {this.state.activeScreen === 'signup' ? 'up' : 'in'} with{' '}
            <span className='font-semibold'>Facebook</span>
          </button>
        </form>
      </div>
    );
  }
}
