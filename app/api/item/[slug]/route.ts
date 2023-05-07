import prismadb from "@/lib/prismadb";

export async function GET(req: Request, { params: { slug } }: {
    params: { slug: string }
}) {
    // Extract searchParams (/item/[slug]?search=INSERT%20VALUE)
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') 
    try {
        // Find the item(s)
        const items = await prismadb.item.findMany({
            where: {
                // Make it case insensitive to get all possible searches related to query
                category: {
                    equals: slug,
                    mode: 'insensitive',
                },
                title: {
                    contains: search ?? undefined,
                    mode: 'insensitive',
                }
            }
        })

        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        const err = error as Error
        console.error(err)
        return new Response(err.message, { status: 500 })
    }
}