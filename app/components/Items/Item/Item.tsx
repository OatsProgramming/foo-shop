'use client'

import useCart from "@/lib/globalStates/useCart"
import Image from "next/image"

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
    const { cart, addToCart, removeFromCart } = useCart()
    const isInCart = (!!cart.find(({ itemId, color: c }) => (item.id === itemId) && (c === color)))

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
            <button onClick={() =>
                isInCart ? removeFromCart({ itemId: item.id, color }) : addToCart({ itemId: item.id, color })
            }>
                {isInCart ? 'Remove from cart' : 'Add to cart'}
            </button>
        </div>
    )
}