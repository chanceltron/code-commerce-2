import React, { Component } from 'react';

export default class ItemCard extends Component {
  render() {
    const { formStep, removeFromCart, changeQuantity } = this.props;
    const { id, img, name, desc, author, rating, price, quantity } =
      this.props.item;
    const hidden = formStep > 1 ? 'hidden' : '';
    const column = formStep > 1 ? 'flex-col' : '';
    return (
      <div className='my-3 flex flex-col lg:flex-row'>
        <div className={`flex flex-col ${column} lg:flex-row lg:flex-[4]`}>
          <img
            src={img}
            alt={name}
            className='rounded-md w-fit object-cover h-fit mr-3 lg:max-w-[200px]'
          />
          <div>
            <h3 className='font-medium'>{name}</h3>
            <p className={hidden}>{author}</p>
            <p className={hidden}>{rating}</p>
          </div>
        </div>
        <div className='flex justify-between w-full pr-6 md:flex-[2] lg:items-start'>
          <p className={`text-xl ${hidden}`}>{price}</p>
          <div className='flex justify-center items-center'>
            <button
              className={`mx-4 text-lg transition-all w-fit h-fit hover:text-red-500 ${hidden}`}
              onClick={() => removeFromCart(id)}>
              <i className='fa-regular fa-trash-can'></i>
            </button>
            <select
              name='qty'
              id='qty'
              placeholder='Qty'
              value={quantity}
              className={`text-xl p-1 outline outline-1 outline-gray-300 rounded ${hidden}`}
              readOnly
              onChange={({ target: { value } }) => {
                changeQuantity(id, value);
              }}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
          <p className='text-xl font-normal'>{price * quantity}</p>
        </div>
      </div>
    );
  }
}
