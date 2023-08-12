import {Provider} from "@/service/REST_API/base";
import {CancelToken} from "axios";
import {ApiResponse, Repository, SearchInterface} from "@/modules/interfaces/GithubInterface";


const searchRepositoriesUrl = "/search/repositories";
const getUserRepositoriesUrl = (user: string) => `/users/${user}/repos`
const getInformationRepositoryUrl = (url: string)  => `/repos/${url}`

//https://docs.github.com/ru/rest/search/search?apiVersion=2022-11-28

function SearchRepositories(params: SearchInterface, token: CancelToken ): Promise<ApiResponse> {
    return Provider.get(searchRepositoriesUrl, {
        cancelToken: token,
        params: params
    }).then(res => res.data)
}
function GetUserRepositories(user: string) {
    return Provider.get(getUserRepositoriesUrl(user))
}
function GetInformationRepository(url: string): Promise<Repository> {
    return Provider.get(getInformationRepositoryUrl(url)).then(res => res.data)
}

export {
    SearchRepositories,
    GetUserRepositories,
    GetInformationRepository
}