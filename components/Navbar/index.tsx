import Link from 'next/link';


const links = [
    { href: '/login', label: 'Login' },
    { href: '/admin', label: 'Admin' },
];

const Navbar = () => {
    return (
        <nav className='navbar bg-base-100'>
            <div className='navbar-start'>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links.map(({ href, label }, index) => (
                            <li key={index}>
                                <Link href
                                    ={href} className='capitalize'>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='flex-1'>
                    <Link href='/' className='btn btn-ghost text-xl'>
                        Home
                    </Link>
                </div>
            </div>
            <div className='navbar-end'>
                <div className='hidden md:block'>
                    {links.map(({ href, label }, index) => (
                        <Link key={index} href={href} className='capitalize btn btn-ghost'>
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;