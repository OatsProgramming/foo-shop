import itemFetcher from "@/lib/fetchers/itemFetcher"
import ItemCard from "./ItemCard/ItemCard"

// When using custom async server components, be sure to add this
// {/* @ts-expect-error Async Server Component */}
// NextJS still fixing typescript issue
export default async function Items({ category, query }: {
    category?: Category,
    query?: string
}) {

    const items = await itemFetcher(category, query)
    if (!items) return <div>Empty</div>

    return (
        <div>
            {items.map(item => (
                <ItemCard key={item.id} item={item} />
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