import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prismadb from "@/lib/prismadb";

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) return new Response("Unauthorized user", { status: 401 })

    try {
        const cart = await req.json()

        await prismadb.user.update({
            where: {
                email: session.user?.email!
            },
            data: {
                items: cart
            }
        })
        return new Response(JSON.stringify(cart), { status: 200})
    } catch (error) {
        const err = error as Error
        console.error(err)
        return new Response(err.message, { status: 500 })
    }
}