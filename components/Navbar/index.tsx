"use client";

import Link from 'next/link';
import { useState } from 'react';


const links = [
    { href: '/login', label: 'Login' },
    { href: '/admin', label: 'Admin' },
];

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <nav className='bg-gray-800'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16'>
                <div className='flex-shrink-0'>
                    <Link href='/' className='capitalize text-white hover:bg-gray-700 rounded-lg p-2'>
                        Home
                    </Link>
                </div>
                <div className='hidden md:block'>
                    {links.map(({ href, label }, index) => (
                        <Link key={index} href={href} className='capitalize text-white hover:bg-gray-700 rounded-lg p-2'>
                            {label}
                        </Link>
                    ))}
                </div>
                <div className='md:hidden flex items-center'>
                    <button className='text-white hover:bg-gray-700 rounded-lg p-2' onClick={toggleMenu}>
                        {showMenu ? (
                            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                            </svg>
                        ) : (
                            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {showMenu && (
                <div className='md:hidden'>
                    <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                        {links.map(({ href, label }, index) => (
                            <Link key={index} href
                                ={href} className='capitalize text-white hover:bg-gray-700 rounded-lg p-2'>
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;