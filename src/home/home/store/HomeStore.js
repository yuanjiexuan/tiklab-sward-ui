import { observable, action} from "mobx";
import { getUser } from 'tiklab-core-ui';
import { Service } from "../../../common/utils/requset";
class HomeStore {
    @observable currentLink = "home";
    @observable opLogList = [];
    @observable messageList = [];
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
    @observable focusTotal = 1;
    

    @action
    setCurrentLink = (value) => {
        this.currentLink = value
    }
    
    @action
    findDocumentList= async(value)=> {
        const data = await Service("/document/findDocumentList",value);
        return data;
    }

    @action
    findDocumentRecentList= async(value)=> {
        const data = await Service("/recent/findRecentList",value);
        return data;
    }

    @action
    findMessageDispatchItemPage = async (value) => {
        const params = {
            pageParam:{
                pageSize:10,
                currentPage: value.page
            },
            sendType: 'site',
            receiver: getUser().userId,
            status: value.status,
            bgroup: "sward"
        }
        const data = await Service("/message/messageItem/findMessageItemPage",params);
        if(data.code === 0){
            this.messageTotal = data.data.totalPage;
            if(value.page === 1){
                this.messageList = data.data.dataList
            }
            if(value.page > 1 && this.isMessageReachBottom) {
                this.messageList.push(...data.data.dataList);
            }
            if(value.page >= this.messageTotal) {
                this.isMessageReachBottom = false
            }else {
                this.isMessageReachBottom = true
            }
            console.log(this.messageList)
        }
        return data;
    }

    

    @action
    findRecentRepositoryList= async(value)=> {
        const data = await Service("/repository/findRecentRepositoryList",value);
        return data;
    }

    /**
     * 更新信息状态
     * @param {信息id，状态} value 
     * @returns 
     */
    @action
    updateMessageDispatchItem = async (value) => {
        const data = await Service("/message/messageItem/updateMessageItem", value)
        return data;
    }

    @action
    findDocumentFocusPage = async(value) => {
        Object.assign(this.focusCondition,  { ...value })
        const data = await Service("/documentFocus/findDocumentFocusPage", this.focusCondition);
        if(data.code === 0){
            this.focusTotal = data.data.totalRecord;
        }
        return data;
    }
}
export default new HomeStore();
