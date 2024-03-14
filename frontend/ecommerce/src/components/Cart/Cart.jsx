import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { fetchCartItems, removeCartItem } from '../../services/api';
import CartItem from './CartItem';

const Cart = ({ openCart, onCloseCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setIsOpen(openCart);
  }, [openCart]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await fetchCartItems();
        setCartItems(cartData);
        calculateSubtotal(cartData);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (isOpen) {
      fetchCart();
    }

    return () => {
      // Cleanup code if needed
    };
  }, [isOpen]);

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.quantity * parseFloat(item.product.price), 0);
    setSubtotal(total.toFixed(2));
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);
      calculateSubtotal(updatedCartItems);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return <div className="flex justify-center items-center h-full text-gray-500">Cart is empty</div>;
    }
    return (
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} handleRemoveItem={handleRemoveItem} />
        ))}
      </ul>
    );
  };

  const closeCart = () => {
    setIsOpen(false);
    onCloseCart();
  };
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCart}>
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => closeCart()}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">{renderCartItems()}</div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>R{subtotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700">
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
