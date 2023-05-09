import { create } from 'zustand'

// Do not use initial query for actual query: will create too many "reads" to db
const useQuery = create<QueryState & QueryAction>()((set) => ({
    initialQuery: '',
    searchQuery: '',
    handleInitial: (e) => set({ initialQuery: e.target.value }),
    handleSearch: () => set((state) => ({ searchQuery: state.initialQuery }))
}))

export default useQuery