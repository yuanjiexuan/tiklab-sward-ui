import { Service } from "../../../../common/utils/requset";
import { observable, action, makeObservable} from "mobx";
export class NodeRecycleStore {

    @action
    recycleNode = async(params) => {
        const data = await Service("/nodeRecycle/recycleNode", params);
        return data;
    }
    // @action
    // findRecycleNode = async(params) => {
    //     const data = await Service("/nodeRecycle/findRecycleNode", params);
    //     return data;
    // }   

    @action
    recoverRecycleNode = async(params) => {
        const data = await Service("/nodeRecycle/recoverRecycleNode", params);
        return data;
    }

    @action
    findRecycleNode= async(value)=> {
        const data = await Service("/nodeRecycle/findRecycleNode", value)
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
export default new NodeRecycleStore();
