import { create } from "zustand";
import { persist } from 'zustand/middleware'

// To deal with signOut() bug: NextAuth hasn't resolved the issue yet
// This is to make sure that the user can sign out from anywhere within the app
// Set with window.location.href once the user has signed in
const useHref = create<HrefAction & HrefState>()(
    persist(
        (set) => ({
            signedInHere: '',
            setSignedInHere: (href) =>  set({ signedInHere: href }),
            resetHref: () => set({ signedInHere: '' })
        }),
        {
            // Must have a unique name for storage
            name: 'signedInHere-storage',
            // Only need to store the href
            partialize: (state) => ({ signedInHere: state.signedInHere })
        }
    )
)

export default useHref