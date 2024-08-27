import { observable, action, extendObservable } from "mobx";
import { Service } from "../../../common/utils/requset";
export class SurveyStore {
    @observable logList = [];
    @observable focusCondition = {
        orderParams: [{
            name: "focusTime",
            orderType: "desc"
        }],
        pageParam: {
            pageSize: 10,
            currentPage: 1,
        }
    };

    @observable opLogCondition = {
        pageParam: {
            pageSize: 20,
            currentPage: 1,
            totalPage: 1,
            total: 1
        },
        bgroup: "sward",
        data: {}
    }

    @action
    findRecentList= async(value)=> {
        const data = await Service("/recent/findRecentList",value);
        return data;
    }
    
    @action
    findRepository = async(value) => {
        const params = new FormData();
        params.append("id", value.id)
        const data = await Service("/repository/findRepository",params);
        return data;
    }
    // @action
    // findLogpage = async(value)=> {
    //     const params={
    //         pageParam: {
    //             pageSize: 10,
    //             currentPage: 1
    //         },
    //         bgroup: "sward",
    //         userId: value.userId,
    //         data: {
    //             repositoryId: value.repositoryId
    //         }
    //     }
    //     const data = await Service("/oplog/findlogpage",params);
    //     if(data.code === 0) {
    //         this.logList = data.data.dataList
    //     }
    //     return data;
    // }

    @action
    findLogpage = async (value) => {
        console.log(value)
        Object.assign(this.opLogCondition, value)
        console.log(this.opLogCondition)
        const data = await Service("/oplog/findlogpage", this.opLogCondition);
        if (data.code === 0) {
            const dataList = data.data.dataList;
            this.opLogCondition.pageParam.totalPage = data.data.totalPage;
            this.opLogCondition.pageParam.total = data.data.totalRecord;
            this.logList = []
            if (dataList.length > 0) {
                dataList.map(item => {
                    const date = item.createTime.slice(0, 10);
                    const list1 = this.logList.filter(dateItem => dateItem.date === date)
                    if (list1.length > 0) {
                        this.logList.map(dateItem => {
                            if (dateItem.date === date) {
                                dateItem.children.push(item)
                            }
                            return dateItem;
                        })
                    } else {
                        this.logList.push({
                            date: date,
                            children: [item]
                        })
                    }
                })
            }
            console.log(this.logList)
        }
        return data;
    }

    @action
    findUserList = async(value) => {
        const data = await Service("/dmUser/findDmUserList",value);
        return data;
    }

    @action
    findCategoryListTreeById = async(value) => {
        const params = new FormData()
        params.append("id", value.id)
        // params.append("treePath", value.treePath)
        const data = await Service("/node/findAllHigherNode",params);
        return data;
    }

    @action
    findDocumentFocusPage = async(value) => {
        Object.assign(this.focusCondition,  { ...value })
        const data = await Service("/documentFocus/findDocumentFocusPage", this.focusCondition)
        return data;
    }

}

export default new SurveyStore();