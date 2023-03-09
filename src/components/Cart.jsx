import React, { Component } from 'react';
import ItemCard from './ItemCard';

export default class Cart extends Component {
  render() {
    const { cart, formStep, changeQuantity, removeFromCart, changeFormStep } =
      this.props;
    return (
      <div className='@container'>
        <div className='overflow-y-scroll max-h-[50vh] @sm:max-h-full @sm:overflow-auto'>
          <h2 className='text-2xl font-medium p-2 border-b-2'>Cart</h2>
          {cart.length > 0 ? (
            cart.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                formStep={formStep}
                changeQuantity={changeQuantity}
                removeFromCart={removeFromCart}
              />
            ))
          ) : (
            <div className='text-center py-8 rounded-lg bg-red-100 text-red-600 font-semibold'>
              There are no items in your cart!
            </div>
          )}
        </div>
        {formStep === 1 && (
          <div className='flex justify-between items-center mt-8 text-white text-xl font-medium md:mx-10'>
            <button
              disabled={true}
              className='px-8 py-2 bg-stone-400 rounded hover:bg-stone-300 disabled:bg-stone-200'>
              Back
            </button>
            <button
              disabled={cart.length === 0}
              onClick={changeFormStep}
              className='relative group flex px-8 py-2 bg-pink-600 rounded hover:bg-pink-500 disabled:bg-pink-200'>
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}
