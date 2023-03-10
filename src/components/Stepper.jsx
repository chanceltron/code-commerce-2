import React, { Component } from 'react';

export default class Stepper extends Component {
  render() {
    const { formStep, changeStep } = this.props;
    const inactiveClass = 'bg-stone-400';
    const activeClass = 'bg-white text-pink-600 ring-4 ring-pink-600';
    const doneClass = 'bg-pink-600';

    const steppers = [
      {
        id: 1,
        name: 'Cart',
        icon: 'fa-cart-shopping',
        class:
          formStep === 1
            ? activeClass
            : formStep > 1
            ? doneClass
            : inactiveClass,
        bar: formStep > 1 ? 'bg-pink-600' : 'bg-stone-400',
      },
      {
        id: 2,
        name: 'Shipping',
        icon: 'fa-truck-fast',
        class:
          formStep === 2
            ? activeClass
            : formStep > 2
            ? doneClass
            : inactiveClass,
        bar: formStep > 2 ? 'bg-pink-600' : 'bg-stone-400',
      },
      {
        id: 3,
        name: 'Payment',
        icon: 'fa-credit-card',
        class:
          formStep === 3
            ? activeClass
            : formStep > 3
            ? doneClass
            : inactiveClass,
        bar: formStep > 3 ? 'bg-pink-600' : 'bg-stone-400',
      },
      {
        id: 4,
        name: 'Confirmation',
        icon: 'fa-check-double',
        class:
          formStep === 4
            ? activeClass
            : formStep > 4
            ? doneClass
            : inactiveClass,
        bar: formStep > 4 ? 'bg-pink-600' : 'bg-stone-400',
      },
    ];

    return (
      <div className='flex justify-between items-center text-white max-w-2xl mx-auto'>
        {steppers.map((stepper) => {
          return (
            <div key={stepper.id} className='flex items-center'>
              <div className='group z-10 relative'>
                <a
                  onClick={() => changeStep(stepper.id)}
                  className={`cursor-pointer flex justify-center z-10 items-center ${stepper.class} w-10 h-10 rounded-full`}>
                  <i className={`fa-solid ${stepper.icon}`} />
                </a>
                <span
                  className='absolute -bottom-5 transition-all left-1/2 transform -translate-x-1/2 translate-y-1/2
 w-fit scale-0 rounded-xl border-2 border-pink-600 bg-white p-2 text-xs text-pink-600 font-medium group-hover:scale-100'>
                  {stepper.name}
                </span>
              </div>
              {stepper.id !== 4 && (
                <div
                  className={`absolute h-2 w-32 z-0 ${stepper.bar} sm:w-40 lg:w-60`}></div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
