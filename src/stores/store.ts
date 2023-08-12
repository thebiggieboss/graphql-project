import { defineStore } from 'pinia'
import {ApiItemsResponse, Repository} from "@/modules/interfaces/GithubInterface";

export const UseRepositoryStore = defineStore({
    id: 'filter',
    state: () => ({
        searchQuery: '',
        repositories: [] as ApiItemsResponse[],
        per_page: 10,
        total_pages: 0,
        current_page: 1,
        aboutRep: {} as Repository
    }),
    getters: {
        getCurrentPage: (state) => state.current_page
    },
    actions: {
        updateSearchQuery(query: string) {
            this.searchQuery = query
        },
        updateRepositories(repositories: ApiItemsResponse[]) {
            this.repositories = repositories;
        },
        setCurrentPage(page: number) {
            this.current_page = page
            localStorage.setItem('current_page', JSON.stringify(page))
        },
        setTotalPage(total: number) {
            localStorage.setItem('total_pages', JSON.stringify(total));
            this.total_pages = total
        },
        updateAboutRep(rep: Repository) {
            this.aboutRep = rep
        },
    },
})