import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import SearchForm from './SearchForm';
import MobileMenu from './MobileNav';
import DesktopMenu from './DesktopNav';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 md:px-8 w-full" aria-label="Global">
                <Logo />
                <Bars3IconWrapper setMobileMenuOpen={setMobileMenuOpen} />
                <SearchForm />
                <DesktopMenu />
            </nav>
            <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        </header>
    );
};

const Bars3IconWrapper = ({ setMobileMenuOpen }) => (
    <div className="flex md:hidden">
        <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
        >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
    </div>
);

export default Header;
