import React from 'react'
import { CartProductType } from '../product/[productId]/ProductDetail'
import { formatePrice } from '@/utils/formatPrice';
import Link from 'next/link';
import { truncateText } from '@/utils/truncateText';
import Image from 'next/image';
import SetQuantity from '../components/products/SetQuantity';
import { useCart } from '@/hooks/useCart';

interface ItemContentProps {
    product: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ product }) => {

    const {handleRemoveProductFromCart, handleQtyDecrease, handleQtyIncrease} = useCart();
  
  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center'>
        <div className='col-span-2 justify-self-start flex gap-2 md:gap-4'>
    
        <Link href={`/product/${product?.id}`}>
            <div className='relative w-[70px] aspect-square'>
                <Image
                    src={product?.selectImg?.image}
                    alt={product?.name}
                    fill
                    className='object-contain'
                />
            </div>
        </Link>
        <div className='flex flex-col justify-between'>
            <Link href={`/product/${product?.id}`}>
                {truncateText(product?.name)}
                <div>
                    {product?.selectImg?.color}
                </div>
                <div className='w-[70px]'>
                    <button className='text-slate-500 underline' onClick={() => handleRemoveProductFromCart(product)}>Remove</button>
                </div>
            </Link>
        </div>

        </div>

        <div className='justify-self-center'>{formatePrice(product?.price)}</div>
        <div className='justify-self-center'>
            <SetQuantity
            cartCounter
            cartProduct={product} 
            handleQtyIncrease={() => handleQtyIncrease(product)}
            handleQtyDecrease={() => handleQtyDecrease(product)}
            />
        </div>
        <div className='justify-self-end font-semibold'>
            {formatePrice(product?.price * product?.quantity)}
        </div>
    </div>
  )
}

export default ItemContent