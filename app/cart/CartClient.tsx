'use client';

import { useCart } from '@/hooks/useCart'
import Link from 'next/link';
import React from 'react'
import { MdArrowBack } from 'react-icons/md';
import Heading from '../components/Heading';
import Button from '../components/Button';
import ItemContent from './ItemContent';
import { formatePrice } from '@/utils/formatPrice';

const CartClient = () => {

    const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

    if(!cartProducts || cartProducts?.length === 0) {
        return <>
            <div className='flex flex-col items-center flex-grow'>
                <div className='text-2xl'>Your Cart is empty</div>
                <div>
                    <Link href='/' className='text-slate-500 flex items-center gap-1 mt-2'>
                        <MdArrowBack  />
                        <span>Shopping</span>
                    </Link>
                </div>
            </div>
        </>
    }

  return (
    <div>
        <Heading title='Shopping Cart' center />
        <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-10'>
            <div className='col-span-2 justify-self-start'>Product</div>
            <div className='justify-self-center'>Price</div>
            <div className='justify-self-center'>Quantity</div>
            <div className='justify-self-end'>Total</div>
        </div>
        <div>
            {cartProducts 
            ? cartProducts?.map((product) => <ItemContent key={product?.id} product={product} />) 
            : null}
        </div>
        <div className=' mt-10 border-t-[1.5px] border-slate-200 py-4 flex items-center justify-between gap-4'>
            <div className='max-w-[300px]'>
                <Button small outline label='Clear Cart' onClick={() => handleClearCart()} />
            </div>
            <div className='text-sm flex flex-col gap-1 '>
                <div className='w-full text-base font-semibold flex items-center justify-between gap-2'>
                    <span>Subtotal:</span>
                    <span>{formatePrice(cartTotalAmount)}</span>
                </div>
                <p className='text-slate-500 my-3'>Taxes and Shipping calculated at checkout</p>
                <Button label='Checkout' onClick={() => {}} />

                <Link href='/' className='text-slate-500 flex items-center gap-1 mt-2'>
                    <MdArrowBack  />
                    <span>Continue Shopping</span>
                </Link>
            
            </div>
        </div>
    </div>
  )
}

export default CartClient