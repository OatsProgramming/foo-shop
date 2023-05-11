import { create } from 'zustand'
import isEqual from 'lodash/isEqual'
import { persist } from 'zustand/middleware'

// Note to self: "persist" from zustand/middleware helps the state persists 
// for whenever the app goes to a different page

// If session, setInitial
const useCart = create<CartState & CartAction>()(
    persist(
        (set) => ({
            cart: [],
            addToCart: (item) => set((state) => ({ cart: [...state.cart, item]})),
            removeFromCart: (item) => set((state) => ({ cart: state.cart.filter(inCart => !isEqual(inCart, item))})),
            resetCart: () => set({ cart: [] }),
            setInitial: (items) => set((state) => ({ cart:[ ...state.cart, ...items]}))
        }),
        {
            name: 'items-storage',
            // Only care about cart state to persist
            partialize: (state) => ({ cart: state.cart })
        }
    )
)

export default useCart
