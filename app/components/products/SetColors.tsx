'use client';

import { CartProductType, SelectedImgType } from '@/app/product/[productId]/ProductDetail';
import React from 'react';

interface SetColorProps {
    images: SelectedImgType[];
    cartProduct: CartProductType;
    handleColorSelect: (value: SelectedImgType) => void;
}
const SetColors: React.FC<SetColorProps> = ({ images, cartProduct, handleColorSelect }) => {
  return (
    <div>
        <div className='flex gap-4 items-center'>
            <span className='font-semibold'>Color: </span>
            <div className='flex items-center gap-1'>
                {
                    images?.map((image) => (
                        <div 
                         key={image.color}
                         onClick={() => handleColorSelect(image)}
                         className={`
                          w-7
                          h-7
                          rounded-full
                          border-teal-300
                          flex
                          items-center
                          justify-center
                          ${cartProduct?.selectImg?.color === image.color ? "border-[1px]" : "border-none"}
                        `}>
                            <div
                            className='
                            w-5
                            h-5
                            rounded-full
                            border-[1.5px]
                            border-slate-300
                            cursor-pointer
                            '
                            style={{ background: image?.colorCode  }}                            
                            >

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default SetColors