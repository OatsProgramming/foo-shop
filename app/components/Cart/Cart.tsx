'use client'

import useCart from "@/lib/globalStates/useCart"
import { useEffect } from "react"

export default function Cart({ session }: {
    session: SessionData
}) {
    const { cart, setInitial } = useCart()

    // Added useEffect to avoid infinite renders
    useEffect(() => session && setInitial(session.user.items), [session])

    return (
        <div>
            Current cart with {session ? 'data' : 'no data'}:
            <pre>
                {JSON.stringify(cart)}
            </pre>
        </div>
    )
}