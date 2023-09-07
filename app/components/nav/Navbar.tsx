import React from 'react'
import Link from 'next/link'
import { Redressed } from 'next/font/google'

import Container from '../Container';

const redressed = Redressed({ subsets: ['latin'], weight: ["400"]});



const Navbar = () => {
  return (
    <>
    <div className='sticky w-full top-0 bg-slate-100 z-30 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex items-center justify-between gap-3 md-gap-0'>
                    <Link href='/' className={`${redressed.className} font-bold text-2xl`}>Ecommerce Shop</Link>
                    <div className='hidden md:block'>Search</div>
                    <div className='flex items-center gap-8 md-gap-12'></div>
                    <div>CartCount</div>
                    <div>UserMenu</div>
                </div>
            </Container>
        </div>
    </div>
    </>
  )
}

export default Navbar