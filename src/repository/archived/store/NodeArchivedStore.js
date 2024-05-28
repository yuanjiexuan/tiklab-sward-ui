import { Service } from "../../../common/utils/requset";
import { observable, action, makeObservable} from "mobx";
export class ArchivedStore {

    @action
    archivedNode = async(params) => {
        const data = await Service("/nodeArchived/archivedNode", params);
        return data;
    }
    // @action
    // findArchivedNode = async(params) => {
    //     const data = await Service("/nodeArchived/findArchivedNode", params);
    //     return data;
    // }   

    @action
    recoverArchivedNode = async(params) => {
        const data = await Service("/nodeArchived/recoverArchivedNode", params);
        return data;
    }

    @action
    findArchivedNode= async(value)=> {
        const data = await Service("/nodeArchived/findArchivedNode", value)
        return data;
    }

    @action
    deleteDocument= async(id)=> {
        const params = new FormData()
        params.append("id", id)
        const data = await Service("/document/deleteDocument", params);
        return data;
    }

    @action
    deleteRepositoryLog= async(value)=> {
        const params = new FormData();
        params.append("id", value)
        const data = await Service("/category/deleteCategory", params);
        return data;
    }
}
export default new ArchivedStore();
