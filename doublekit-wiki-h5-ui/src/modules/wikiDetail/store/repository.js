import { observable, action} from "mobx";
import { FindWikiCatalogue } from "../api/repository"
export class WikiCatalogueStore {
    @observable wikiCatalogueList = [];

    @action
    findWikiCatalogue = async(id)=> {
        const params = {
            repositoryId: id
        }
        const data = await FindWikiCatalogue(params);
        if(data.code === 0){
            this.wikiCatalogueList = data.data
        }
        return data.data;
    }

}

export const WIKICATELOGUE_STORE = "WikiCatalogueStore"