import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    const loginInputs = [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
      },
    ];
    return (
      <div className='m-auto rounded-md shadow-lg max-w-lg p-4'>
        <div className='flex justify-around mb-3'>
          <a className='cursor-pointer'>Create Account</a>
          <a className='cursor-pointer'>Sign in</a>
        </div>
        <div>
          <form action='' className='flex flex-col'>
            {loginInputs.map((input) => (
              <div key={input.name} className='text-left'>
                <label htmlFor={input.name} className=''>
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.name}
                  id={input.name}
                  className='w-1/2'
                />
              </div>
            ))}
          </form>
        </div>
      </div>
    );
  }
}
