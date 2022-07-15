import {service} from "../../../common/utils/requset";
// import "../../../../mock/mocklog"
export function FindRepository(data){
    return service.request({
        url: "/repository/findRepository",
        method: "post",
        data
    })
}
export function UpdateRepository(data){
    return service.request({
        url: "/repository/updateRepository",
        method: "post",
        data
    })
}
// 查找所有用户类型
export function FindAllUser(data){
    return service.request({
        url: "/user/findAllUser",
        method: "post",
        data 
    })
}