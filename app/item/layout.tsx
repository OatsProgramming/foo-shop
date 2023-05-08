import SearchBar from "../components/SearchBar/SearchBar"

export default function Layout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <nav>
                <SearchBar />
            </nav>
            {children}
        </>
    )
}