import Container from '@/app/components/Container'
import React from 'react'
import ProductDetail from './ProductDetail'
import { product } from '@/utils/product'
import ListRating from '../ListRating'



interface ProductParams {
    productId: string
}

const Product = ({ params }: {params: ProductParams}) => {
  return (
    <div>
        <Container>
            <ProductDetail product={product}  />
            <div className='flex flex-col mt-20 gap-4'>
              <div>Add Rating</div>
              <ListRating product={product} />
            </div>
        </Container>
    </div>
  )
}

export default Product