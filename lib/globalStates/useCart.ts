import { create } from 'zustand'
import findIndex from 'lodash/findIndex'
import { persist } from 'zustand/middleware'

// Note to self: "persist" from zustand/middleware helps the state persists 
// for whenever the app goes to a different page

// If session, setInitial
const useCart = create<CartState & CartAction>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (item) => set((state) => ({ cart: [...state.cart, item]})),
            removeFromCart: (item) => {
                // Create a copy to not mutate the original
                const cart = [...get().cart]

                // Find the first item that matches
                const itemIndex = findIndex(cart, item)
                if (itemIndex === -1) return 

                // Remove just that item then set
                cart.splice(itemIndex, 1)
                set({ cart })
            },
            resetCart: () => set({ cart: [] }),
            setInitial: (items) => set((state) => ({ cart:[ ...state.cart, ...items]}))
        }),
        {
            name: 'items-storage',
            // Only care about cart state to persist
            partialize: (state) => ({ cart: state.cart }),
        }
    )
)

export default useCart
