import { Service } from "../../../common/utils/requset";
import { observable, action, makeObservable} from "mobx";
export class RepostoryArchivedStore {

    @action
    archivedRepository = async(params) => {
        const data = await Service("/repositoryArchived/archivedRepository", params);
        return data;
    }
   
    @action
    recoverArchivedRepository = async(params) => {
        const data = await Service("/repositoryArchived/recoverArchivedRepository", params);
        return data;
    }

    @action
    findRepository = async(value) => {
        const params = new FormData();
        params.append("id", value.id)
        const data = await Service("/repository/findRepository",params);
        return data;
    }

    @action
    findArchivedRepository = async(params) => {
        const data = await Service("/repositoryArchived/findArchivedRepository",params);
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
export default new RepostoryArchivedStore();
