import prismadb from "@/lib/prismadb";

// Find a way to combine the code with slug when possible
export async function GET(req: Request) {
    // Extract the searchParams
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') 
    try {
        // Find the item(s)
        // undefined not empty string: '' will return none
        const items = await prismadb.item.findMany({
            where: {
                title: search ?? undefined
            }
        })

        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        const err = error as Error
        console.error(err)
        return new Response(err.message, { status: 500 })
    }
}