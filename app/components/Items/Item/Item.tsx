'use client'

import useCart from "@/lib/globalStates/useCart"
import isEqual from "lodash/isEqual"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Item({ item }: {
    item: Item
}) {
    const colors = []
    for (let color in item.colors) {
        colors.push(color)
    }
    return (
        <div>
            {colors.map(color => (
                <ItemCard key={item.title + item.colors[color]} item={item} color={color} />
            ))}
        </div>
    )
}

function ItemCard({ item, color }: {
    item: Item,
    color: string
}) {
    // Convert item data to CartItem data structure for database
    const asCartItem: CartItem = { itemId: item.id, color } 
    const { cart, addToCart, removeFromCart } = useCart()
    const amntInCart = cart.filter(cartItem => isEqual(cartItem, asCartItem))
    return (
        <div>
            <h1>{color}</h1>
            <Image
                src={item.colors[color]}
                alt={`${item.title} ${color}`}
                width={300}
                height={300}
                style={{
                    objectFit: 'contain'
                }}
            />
            <div>
                <button onClick={() => 
                    removeFromCart(asCartItem)
                }>
                        REMOVE
                </button>
                <span>{amntInCart.length}</span>
                <button
                onClick={() => 
                    addToCart(asCartItem)
                }>
                    ADD
                </button>
            </div>
        </div>
    )
}