'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Rating } from '@mui/material';
import SetColors from '@/app/components/products/SetColors';
import SetQuantity from '@/app/components/products/SetQuantity';
import Button from '@/app/components/Button';
import ProductImage from '@/app/components/products/ProductImage';
import { useCart } from '@/hooks/useCart';
import { MdCheckCircle } from 'react-icons/md';
import { useRouter } from 'next/navigation';


export type CartProductType = {
    id: string;
    name: string;
    category: string;
    brand: string;
    selectImg: SelectedImgType;
    quantity: number;
    price: number

}

export type SelectedImgType = {
    color: string;
    colorCode: string;
    image: string;
}

interface ProductDetailProps {
    product: Record<string, any>
}

const Horizontal = () => {
    return <>
        <hr className='w-[30%] my-2' />
    </>
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const router = useRouter();
    const { cartTotalQty, cartProducts, handleAddProductToCart } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    
    const productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item?.rating, 0) / product?.reviews?.length;
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product?.id || "",
        name: product?.name || "",
        category: product?.category || "",
        brand: product?.brand || "",
        selectImg: {...product?.images[0]} || {},
        quantity: product?.qty || 0,
        price: product?.price || 0
    });

    useEffect(() => {
        setIsProductInCart(false);
        if(cartProducts) {
            const existingindex = cartProducts?.findIndex((itemIndex) => itemIndex?.id === product?.id);
            if(existingindex >= 0){
                setIsProductInCart(true);  
            }
        }

    }, [cartProducts])

    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCartProduct((prevCartProduct) => ({...prevCartProduct, selectImg: value }))
    }, [cartProduct?.selectImg]);

    
    const handleQtyIncrease = useCallback(() => {
        setCartProduct((prevCartProduct) => {
            if(prevCartProduct.quantity === 99) return prevCartProduct;

            return {...prevCartProduct, quantity: ++prevCartProduct.quantity }
        });
    }, [cartProduct.quantity]);

    const handleQtyDecrease = useCallback(() => {
        setCartProduct((prevCartProduct) => {
            if(prevCartProduct.quantity === 1 || prevCartProduct.quantity == 0) return prevCartProduct;
            
            return {...prevCartProduct, quantity: --prevCartProduct.quantity }
        });
    }, [cartProduct.quantity]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mt-5'>
        <div>
            <ProductImage 
             cartProduct={cartProduct}
             product={product}
             handleSelectedColor={handleColorSelect}
            />
        </div>
        <div className='flex flex-col gap-2 text-slate-500 text-sm'>
            <h2 className='text-3xl font-medium text-slate-700 '>
                {product?.name}
            </h2>
            <div className='flex items-center gap-2'>
                <Rating value={productRating} readOnly />
                <div>
                    {product?.reviews?.length} reviews
                </div>
            </div>
            <Horizontal />
            <div className='text-justify'>
                {product?.description}
            </div>
            <Horizontal />
            <div>
                <span className='font-semibold'>Category: {product?.category}</span>
            </div>
            <div>
                <span className='font-semibold'>Brand: {product?.brand}</span>
            </div>
            <div className={product?.inStock ? "text-teal-400" : "text-rose-400" }>
                {product?.inStock ? "In Stock" : "Out of Stock" }
            </div>
            <Horizontal />
            {
                isProductInCart ? (
                    <>
                        <p className='mb-2 text-slate-500 flex items-center gap-1'>
                            <MdCheckCircle size={20} className="text-teal-400" />
                            <span>Product added to cart</span>
                        </p>
                        <div className='max-w-[300px]'>
                            <Button label='View Cart'  onClick={() => router.push('/cart')} />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <SetColors  
                            cartProduct={cartProduct}
                            images={product?.images}
                            handleColorSelect={handleColorSelect}
                        /> 
                        </div>
                        <Horizontal />
                        <div>
                            <SetQuantity
                            cartProduct={cartProduct}
                            handleQtyIncrease={handleQtyIncrease}
                            handleQtyDecrease={handleQtyDecrease}
                            />
                        </div>

                        <div className='mt-4 max-w-[300px]'>
                            <Button 
                            label='Add To Cart'
                            onClick={() => handleAddProductToCart(cartProduct)}
                            />
                        </div>
                    
                    </>
                )
            }
        </div>
    </div>
  )
}

export default ProductDetail