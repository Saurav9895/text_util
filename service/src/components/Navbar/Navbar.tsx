import { authModalState } from '@/atoms/authModalAtoms';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSetRecoilState } from 'recoil';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)

    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, isOpen: true }));
    }
    return (
        
        <div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
        <Link href='/' className='flex items-center justify-center h-20'>
        <img src='/as service color.png' alt='as service'className='top-logo'/>
        </Link>
        <div className='flex items-center'>
        <button
					className='bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
                transition duration-300 ease-in-out
                '
                onClick={handleClick}
				>
					Login
				</button>
			</div>
        </div>
    );
}
export default Navbar;