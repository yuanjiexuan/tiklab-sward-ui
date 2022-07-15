import { observable, action } from "mobx";
import { FindRepository,UpdateRepository, FindAllUser } from "../api/repositorySetApi";

export class RepositorySetStoroe {
    @observable userList = []
    @action
	findRepository = async(values) => {
        const params = new FormData()
        params.append("id", values)

        const data = await FindRepository(params)
        return data;
	}

    @action
	updateRepository = async(values) => {

        const data = await UpdateRepository(values)
        return data;
	}

    @action
    findAllUser = async() => {
		const data = await FindAllUser()

        if(data.code === 0){
            const list = data.data;
            const userList = [];
            list && list.length > 0 && list.map(item => {
                userList.push({ value: item.id, label: item.name });
                return 0;
            })
            this.userList = userList;
        } 
        return data;
    }

}

export const REPOSITORY_STORE = "repositorySetStore"