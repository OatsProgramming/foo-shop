'use client'

import useCart from '@/lib/globalStates/useCart'
import { signIn } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useHref from '@/lib/globalStates/useHref'

export function SignIn() {
    const { setSignedInHere, resetHref } = useHref()

    function handleSignIn() {
        signIn()
            // If successful, save the url that the user has initially clicked the button
            // This will help deal with the signOut() bug
            .then(_ => setSignedInHere(window.location.href))
            .catch(err => {
                console.error(err)
                resetHref()
            })
    }

    return (
        <button onPointerDown={handleSignIn}>
            Sign in
        </button>
    )
}

export function SignOut() {
    const { cart } = useCart()
    const router = useRouter()
    const { signedInHere } = useHref()

    async function handleSignOut() {
        try {
            // Don't do anything if the user hasn't signed in
            // Lower the writes to db
            if (!signedInHere) return

            await fetch('api/cart', {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cart)
            })
            // Check SignIn() or useHref.ts for detailed notes as to why the options has been set
            // redirect to false to prevent full refresh
            await signOut({ redirect: false, callbackUrl: signedInHere })
            // router.refresh() to only refresh the necessary parts of the page
            router.refresh()

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <button onPointerDown={handleSignOut}>
            Sign out
        </button>
    )
}
