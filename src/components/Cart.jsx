import React, { Component } from 'react';
import ItemCard from './ItemCard';

export default class Cart extends Component {
  render() {
    const { cart, formStep, changeQuantity, removeFromCart } = this.props;
    return (
      <div className='@container'>
        <div className='overflow-y-scroll max-h-[50vh] @sm:max-h-full @sm:overflow-auto'>
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
      </div>
    );
  }
}
