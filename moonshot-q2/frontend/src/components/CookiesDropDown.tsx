import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import useSelectOutside from '../hooks/useSelectOutside';

const CookieSettingsDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['preferences']);
    const ref = React.useRef(null);
    const handleResetCookies = () => {
        removeCookie('preferences');
        alert('Cookies have been reset!');
    };

    useSelectOutside({ ref, setIsOpen });

    return (
        <div className="relative inline-block text-left">
            {/* Dropdown Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
                Cookie
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    ref={ref}
                >
                    <div className="py-1" role="none">
                        <button
                            onClick={handleResetCookies}
                            className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                            role="menuitem"
                        >
                            Reset Cookies
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CookieSettingsDropdown;
