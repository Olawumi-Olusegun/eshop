'use client';

import React from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart';
import { CiShoppingCart } from 'react-icons/ci';

const CartCount = () => {
    const router = useRouter();
    const handleGotoCart = () => router.push('/cart');

    const { cartTotalQty } = useCart()

  return (
    <div className='relative cursor-pointer' onClick={handleGotoCart}>
        <div className='text-3xl'>
            <CiShoppingCart />
        </div>
        <span className='absolute top-[-10px] right-[-10px] bg-slate-700 text-white rounded-full flex items-center justify-center text-sm h-6 w-6 '>
            {cartTotalQty}
        </span>
    </div>
  )
}

export default CartCount