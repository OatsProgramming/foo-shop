import itemFetcher from "@/lib/fetchers/itemFetcher"

export default async function Page({ params: { category } } : { 
    params: {
        category: Category
    }
}) {
    const items = await itemFetcher(category, )
    return (
        <></>
    )
}