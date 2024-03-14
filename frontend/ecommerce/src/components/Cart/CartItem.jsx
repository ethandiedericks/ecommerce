import React from 'react';

const CartItem = ({ item, handleRemoveItem }) => {
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.product.image.replace('/media/', '/api/media/')}
          alt={item.product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.product.name}</h3>
            <p className="ml-4">R{item.product.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.product.category ? item.product.category.name : 'Category Not Available'}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {item.quantity}</p>
          <div className="flex">
            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleRemoveItem(item.id)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
