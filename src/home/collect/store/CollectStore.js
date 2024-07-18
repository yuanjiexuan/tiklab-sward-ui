import { observable, action } from "mobx";
import { Service } from "../../../common/utils/requset";
export class CollectStore {

    @action
    findDocumentFocusPage = async(value) => {
        const data = await Service("/documentFocus/findDocumentFocusPage", value);
        return data;
    }

    @action
    findFocusRepositoryList = async (value) => {
        const data = await Service("/repository/findFocusRepositoryList", value);

        return data;
    }


    @action
    createRecent = async (value) => {
        const data = await Service("/recent/createRecent", value);
        return data.data;
    }
}

export default new CollectStore();