'use client'

import useCart from "@/lib/useCart"
import Image from "next/image"

export default function ItemCard({ item }: {
    item: Item
}) {
    const cart = useCart()
    const isInCart = cart.cart.find(id => item.id === id)

    const colors = []
    for (let color in item.colors) {
        colors.push(color)
    }
    return (
        <div>
            <h1>{item.title}</h1>
            {colors.map(color => (
                <>
                    <h2>{color.toUpperCase()}</h2>
                    <Image 
                        src={item.colors[color]}
                        width={300}
                        height={300}
                        alt={color}
                        style={{
                            objectFit: 'contain'
                        }}
                    />
                </>
            ))}
            <button onClick={() => 
                isInCart ? cart.removeFromCart(item.id) : cart.addToCart(item.id)
            }>
                {isInCart ? 'Remove from cart' : 'Add to cart'}
            </button>
        </div>
    )
}