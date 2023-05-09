import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Cart from "../components/Cart/Cart"
import SearchBar from "../components/SearchBar/SearchBar"

export default async function Layout({ children }: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions) as SessionData

    return (
        <>
            <nav>
                <SearchBar />
                <Cart session={session}/>
            </nav>
            {children}
        </>
    )
}