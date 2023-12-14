import React from 'react';
import { FaGithub } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import logo from '../img/nav Logo.png';

export const Navbar = () => {
    const navItems = [
        { link: "About", path: "about" },
        { link: "", path: "github", icon: FaGithub },
        { link: "", path: "/", icon: MdDarkMode },
    ];

    return (
        <nav className='bg-transparent md:px-14 p-4 max-w-screen-2x1 mx-auto text-primary'>
            <div className='text-lg container mx-auto flex justify-between items-center font-medium'>
                <div className='flex space-x-14 items-center'>
                    <a href="/" className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
                        <a href="/"><img style={{ height: 40 }} src={logo} alt="" /></a>
                    </a>
                </div>
                <div className='space-x-14 md:flex items-center'>
                    <ul className='md:flex space-x-12'>
                        {navItems.map(({ link, path, icon: Icon }) => (
                            <a key={link} href={path} className='block hover:text-gray-300'>
                                {Icon && <Icon size={30} />}
                                {link}
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
