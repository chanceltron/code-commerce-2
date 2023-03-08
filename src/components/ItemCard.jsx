import React, { Component } from 'react';

export default class ItemCard extends Component {
  render() {
    const { formStep, removeFromCart, changeQuantity } = this.props;
    const { id, img, name, desc, author, rating, price, quantity } =
      this.props.item;
    const hidden = formStep > 1 ? 'hidden' : '';
    const column = formStep > 1 ? 'flex-col' : '';
    return (
      <div className='flex my-3 items-center'>
        <button
          className={`mx-4 text-lg transition-all w-fit h-fit hover:text-red-500 ${hidden}`}
          onClick={() => removeFromCart(id)}>
          <i className='fa-regular fa-trash-can'></i>
        </button>
        <div className={`@container flex flex-[4] ${column}`}>
          <img
            src={img}
            alt={name}
            className='rounded-md max-w-[200px] w-auto object-cover h-fit mr-3 @md:max-w-[150px]'
          />
          <div>
            <h3 className='font-medium'>{name}</h3>
            <p className={hidden}>{author}</p>
            <p className={hidden}>{rating}</p>
          </div>
        </div>
        <p className={`text-xl ${hidden}`}>{price}</p>
        <div className='flex flex-1 justify-center items-center'>
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
        <p className='flex-1 text-xl font-normal'>{price * quantity}</p>
      </div>
    );
  }
}
