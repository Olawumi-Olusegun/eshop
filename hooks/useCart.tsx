'use client';

import { CartProductType } from "@/app/product/[productId]/ProductDetail";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';


type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleQtyIncrease: (product: CartProductType) => void;
    handleQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
}

interface Props {
    [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);


export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);

    const handleAddProductToCart  = useCallback((product: CartProductType) => {

        setCartProducts((prevCartProducts) => {

            let updatedCart = [...(prevCartProducts || [])];

            const cartIndexExist = updatedCart?.findIndex((cartItem) => cartItem?.id === product?.id );
    
            if(cartIndexExist >= 0) {
              updatedCart = [...updatedCart];
            } else {
              updatedCart = [ ...(updatedCart), {...product, quantity: 1}];
            }

            localStorage.setItem('eshopCart', JSON.stringify(updatedCart));
            toast.success("Added to cart")
        
                return updatedCart;

        });


    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if(cartProducts) {
            const filteredProducts = cartProducts?.filter((productItem) => productItem?.id !== product?.id);
            setCartProducts(filteredProducts);
            localStorage.setItem('eshopCart', JSON.stringify(filteredProducts));
            toast.success("Product deleted")
            return;
        }
    }, [cartProducts]);

    const handleQtyIncrease = useCallback((product: CartProductType) => {
        if(product?.quantity === 99) {
            toast.success("Maximum quantity reached");
            return;
        }

        if(cartProducts) {
            let updatedCart = [...cartProducts];
            const existingindex = updatedCart?.findIndex((itemIndex) => itemIndex?.id === product?.id);
            if(existingindex >= 0){
                updatedCart[existingindex].quantity++;
                setCartProducts(updatedCart)
                localStorage.setItem('eshopCart', JSON.stringify(updatedCart));
            }
        }
    }, [cartProducts]);

    const handleQtyDecrease = useCallback((product: CartProductType) => {
        if(product?.quantity <= 1) {
            toast.success("Minimum quantity reached");
            return;
        }

        if(cartProducts) {
            let updatedCart = [...cartProducts];
            const existingindex = updatedCart?.findIndex((itemIndex) => itemIndex?.id === product?.id);
            if(existingindex >= 0){
                updatedCart[existingindex].quantity--;
                setCartProducts(updatedCart)
                localStorage.setItem('eshopCart', JSON.stringify(updatedCart));
            }
        }
    }, [cartProducts]);

    const handleClearCart = useCallback(() => {
        setCartProducts([])
        localStorage.removeItem('eshopCart');
    }, [cartProducts]);


    useEffect(() => {
        const getTotals = () => {
            if(cartProducts) {
                const {total, qty} = cartProducts?.reduce((acc, item) =>  {
                      const itemTotal = item?.price * item?.quantity;
                      acc.total += itemTotal;
                      acc.qty += item.quantity;
                      return acc;
                  }, { total: 0, qty: 0 });

                  setCartTotalQty(qty)
                  setCartTotalAmount(total)
            }
        }
        getTotals();
    }, [cartProducts]);


    useEffect(() => {
        const cartItems = localStorage.getItem('eshopCart');
        const cartItemsFromLocalStorage: CartProductType[] = JSON.parse(cartItems as string) ?? [];
        setCartProducts(cartItemsFromLocalStorage);
    }, []);


    return <CartContext.Provider
        value={{
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleQtyIncrease,
        handleQtyDecrease,
        handleClearCart
        }}
        {...props}>
    </CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext);
    if(context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }

    return context;
}