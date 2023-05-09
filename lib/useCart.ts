import { create } from 'zustand'

// If session, setInitial
const useCart = create<CartState & CartAction>()((set) => ({
    cart: [],
    addToCart: (itemId) => set((state) => ({ cart: [...state.cart, itemId]})),
    removeFromCart: (itemId) => set((state) => ({ cart: state.cart.filter(id => id !== itemId) })),
    resetCart: () => set({ cart: [] }),
    setInitial: (itemIds) => set((state) => ({ cart:[ ...state.cart, ...itemIds]}))
}))

export default useCart
