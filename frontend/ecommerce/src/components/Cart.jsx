import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { fetchCartItems, removeCartItem } from '../services/api'; // Import the function to fetch cart items and remove cart item
import axiosInstance from '../axios';

const Cart = () => {
  const [open, setOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Fetch cart items when the component mounts
    const fetchCart = async () => {
      try {
        const cartData = await fetchCartItems();
        setCartItems(cartData);
        // Calculate subtotal
        const total = cartData.reduce((acc, item) => acc + item.quantity * parseFloat(item.product.price), 0);
        setSubtotal(total.toFixed(2));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart();

    // Clean up function
    return () => {
      // Any cleanup code goes here
    };
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const handleRemoveItem = async (itemId) => {
    try {
      // Remove item from the cart
      await removeCartItem(itemId);

      // Update cart items after removing an item
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);

      // Recalculate subtotal after removing the item
      const total = updatedCartItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.product.price), 0);
      setSubtotal(total.toFixed(2));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const renderEmptyCartMessage = () => {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Cart is empty
      </div>
    );
  };
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        {/* Dialog background */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* Dialog content */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                {/* Dialog panel */}
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      {/* Dialog title and close button */}
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Cart items list */}
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.length > 0 ? (
                              cartItems.map((item) => (
                                <li key={item.id} className="flex py-6">
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
                              ))
                            ) : (
                              // Render the "Cart is empty" message
                              renderEmptyCartMessage()
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Subtotal and checkout button */}
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>R{subtotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
