export default async function itemFetcher(category?: string, query?: string): Promise<void | Item[]> {
    // Only add if arg(s) given
    const url = 
        process.env.NEXTAUTH_URL
        + '/api/item'
        + (category ? `/${category}` : '')
        + (query ? `?search=${query}` : '')

    try {
        const res = await fetch(url)
        if (!res.ok) {
            console.error(await res.text())
            return
        }

        return res.json()
    } catch (error) {
        const err = error as Error
        console.error(err)
        return 
    }
}