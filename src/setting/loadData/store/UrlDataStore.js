import { action } from "mobx";
import {Service} from "../../../common/utils/requset";
export class UrlDataStore {


    @action
    findCfInputSchedule = async () => {
        const data = await Service("/importData/findCfInputSchedule");
        return data;
    }
}

export default new UrlDataStore();