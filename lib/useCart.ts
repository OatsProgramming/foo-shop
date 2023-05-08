import { create } from 'zustand'

// If !session, use this
const useCart = create<CartState & CartAction>()((set) => ({
    cart: [],
    addToCart: (itemId: string) => set((state) => ({ cart: [...state.cart, itemId]})),
    removeFromCart: (itemId: string) => set((state) => ({ cart: state.cart.filter(id => id !== itemId) })),
    resetCart: () => set({ cart: [] })
}))

export default useCart
