import { Service } from "../../../../common/utils/requset";
import { observable, action, makeObservable} from "mobx";
export class RepositoryRecycleStore {

    @action
    recycleRepository = async(params) => {
        const data = await Service("/repositoryRecycle/recycleRepository", params);
        return data;
    }

    @action
    recoverRecycleRepository = async(params) => {
        const data = await Service("/repositoryRecycle/recoverRecycleRepository", params);
        return data;
    }

    @action
    findRecycleRepository = async(params) => {
        const data = await Service("/repositoryRecycle/findRecycleRepository", params);
        return data;
    }

    @action
	deleteRepository = async(values) => {
        const param = new FormData()
        param.append("id", values)
        const data = await Service("/repository/deleteRepository",param);
        return data;
    }
}
export default new RepositoryRecycleStore();
