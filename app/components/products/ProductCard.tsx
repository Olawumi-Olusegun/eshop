'use client';

import React from 'react'
import { formatePrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncateText';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    product: any
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter(); 

    const productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item?.rating, 0) / product?.reviews?.length;
  
  
    return (
    <div onClick={() => router.push(`/product/${product?.id}`)}
    className='cols-span-1 
    cursor-pointer 
    border-[1.2px] 
    border-slate-200 
    bg-slate-50  
    rounded-sm 
    p-2 
    transition 
    hover:scale-105 
    text-center 
    text-sm '>
        <div className='flex flex-col items-center w-full gap-1'>
            <div className='aspect-square overflow-hidden relative w-full'>
                <Image src={product?.images[0]?.image} alt={product?.name} fill  />
            </div>
            <div className='mt-4 '> {truncateText(product?.name)} </div>
            <div>
                <Rating value={productRating} readOnly />
            </div>
            <div>{product?.reviews?.length} reviews</div>
            <div className='font-semibold'>{formatePrice(product?.price)}</div>
            <div></div>
        </div>
    </div>
  )
}

export default ProductCard