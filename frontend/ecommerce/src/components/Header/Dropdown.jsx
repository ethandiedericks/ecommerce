import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({ isOpen, toggleDropdown }) => {
  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={toggleDropdown}>
      <DropdownMenu.Trigger className="inline-flex items-center justify-center rounded-md text-sm font-semibold leading-6 text-gray-900 hover:text-orange-700 focus:outline-none">
        My Account &nbsp; <IoIosArrowDown />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="rounded-md bg-white shadow-lg focus:outline-none px-1 py-1"
        align="end"
        sideOffset={4}
      >
        <DropdownMenu.Item
          className="text-gray-900 flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-orange-500 hover:text-white outline-none cursor-pointer "
        >
          Account Details
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="text-gray-900 flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-orange-500 hover:text-white outline-none cursor-pointer"
        >
          Orders
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;