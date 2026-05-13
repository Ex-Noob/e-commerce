import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([])

    const addToCart = (product) => {
        const itemInCart = cartItem.find((item) => item.id === product.id)
        if (itemInCart) {
            // Increase quantity if already in cart 
            const updatedCart = cartItem.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
            setCartItem(updatedCart)
            toast.success(`Product Quantity Increased in cart!`)
        } else {
            // Add new item to cart with quantity 1
            setCartItem([...cartItem, { ...product, quantity: 1 }])
            toast.success(`Product added to cart!`)
        }
    }

    const updateQuantity = (productId, action) => {
        const updated = cartItem.map((item) => {
            if (item.id === productId) {
                let newUnit = item.quantity;
                if (action === 'increase') {
                    newUnit += 1
                    toast.success('Quantity increased!') // ✅ inside the block
                } else if (action === 'decrease') {
                    newUnit -= 1
                    toast.success('Quantity decreased!') // ✅ inside the block
                }
                return newUnit > 0 ? { ...item, quantity: newUnit } : null
            }
            return item
        }).filter(item => item !== null)

        setCartItem(updated)
    }

    const deleteItem = (productId) => {
        setCartItem(cartItem.filter(item => item.id !== productId))
        toast.warning('Product removed from cart!') // ✅ inside the block
    }

    return <CartContext.Provider value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}>
        {children}
    </CartContext.Provider>
}

export const useCart = () => useContext(CartContext)