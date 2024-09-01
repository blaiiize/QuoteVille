'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {

    // retrieve session data from useSession hook
    const { data: session } = useSession();

    // state to store providers for authentication
    const [providers, setProviders] = useState(null);

    // state to handle the dropdown menu toggle in mobile view
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {

        // fetching and setting authentication providers
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        setUpProviders();
    }, []);

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image
                    src={'/assets/images/QuoteVille-logo.svg'}
                    alt='QuoteVille Logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>QuoteVille</p>
            </Link>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>

                        <Link href='/create-quote' className='black_btn'>
                            Create Quote
                        </Link>

                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>

                        <Link href='/profile'>
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>

                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
 
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropdown && (
                            <div className='dropdown'>

                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>

                                <Link
                                    href='/create-quote'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Quote
                                </Link>

                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>

                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className='black_btn'
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;