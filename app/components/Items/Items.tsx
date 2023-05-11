'use client'

import itemFetcher from "@/lib/fetchers/itemFetcher"
import Item from "./Item/Item"
import useQuery from "@/lib/globalStates/useQuery"
import { useEffect, useState } from "react"

// When using custom async server components, be sure to add this
// {/* @ts-expect-error Async Server Component */}
// NextJS still fixing typescript issue

// Is there a way to render this on the server side initally AND THEN
// have it sit on the client side for queries? Something to look into later
export default function Items({ category }: {
    category?: Category,
    // query?: string
}) {
    const [items, setItems] = useState([] as Item[])
    const { searchQuery } = useQuery()

    useEffect(() => {

        (async () => {
            const result = await itemFetcher(category, searchQuery)
            if (result) setItems(result)
        })()

    }, [searchQuery])

    if (items.length === 0) return <div>Empty</div>

    return (
        <div>
            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    )
}

// Something to keep in mind when you want to query with a list of ids
// prismadb.item.findMany({ 
//     where: {
//         id: {
//             in: session?.user.itemIds
//         }
//     }
// })