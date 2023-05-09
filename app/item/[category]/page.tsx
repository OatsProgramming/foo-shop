import Items from "@/app/components/Items/Items"

export default function Page({ params: { category } } : { 
    params: {
        category: Category
    }
}) {
    return (
        <>
            <Items category={category}/>
        </>
    )
}