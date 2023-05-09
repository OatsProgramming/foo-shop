'use client'

import useCart from "@/lib/useCart"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Cart({ session }: {
    session: SessionData
}) {
    const cart = useCart()

    // Added useEffect to avoid infinite renders
    useEffect(() => {
        if (session) {
           cart.setInitial(session.user.itemIds) 
        }
    }, [])

    return (
        <div>
            Current cart with {session ? 'data' : 'no data'}:
            <pre>
                {JSON.stringify(cart.cart)}
            </pre>
        </div>
    )
}