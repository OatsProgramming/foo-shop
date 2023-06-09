import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import SearchBar from "../components/SearchBar/SearchBar"
import dynamic from "next/dynamic"

// Prevent hydration error (server-client mismatch)
const Cart = dynamic(() => 
    import("../components/Cart/Cart"),
    { ssr: false }
)

export default async function Layout({ children }: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions) as SessionData

    return (
        <>
            <nav>
                {/* 
                    If user does full refresh (i.e. either tinkering w/ url or actual refresh)
                    then state will also refresh. It will not persist.
                    Edit: can use zustand/middleware to help state persist
                */}
                <SearchBar />
                <Cart session={session}/>
            </nav>
            {children}
        </>
    )
}