'use client'

import useCart from "@/lib/useCart"
import { useEffect } from "react"

export default function Cart({ session }: {
    session: SessionData
}) {
    const { cart, setInitial } = useCart()

    // Added useEffect to avoid infinite renders
    useEffect(() => {
        if (session) {
           setInitial(session.user.itemIds) 
        }
    }, [session])

    return (
        <div>
            Current cart with {session ? 'data' : 'no data'}:
            <pre>
                {JSON.stringify(cart)}
            </pre>
        </div>
    )
}