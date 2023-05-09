import Items from "@/app/components/Items/Items"

export default function Page({ params: { category } } : { 
    params: {
        category: Category
    }
}) {
    return (
        <>
            {/* @ts-expect-error Async Server Component */}
            <Items category={category}/>
        </>
    )
}