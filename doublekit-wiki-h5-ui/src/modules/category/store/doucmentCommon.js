/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-10 15:56:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-10 16:51:01
 */
import { observable, action} from "mobx";
import {CreateComment,FindCommentPage,CreateLike,CreateShare,UpdateShare, UpdateDocument, UpdateComment, DeleteComment} from "../api/documentCommon"
export class DocumentCommon {
    @observable wikiCommonList = [];
    @observable commonPageParams = [];
    @action
    createComment = async(value)=> {
        console.log(value)
        const data = await CreateComment(value);
        return data.data;
    }

    @action
    findCommentPage = async(value)=> {
        const data = await FindCommentPage(value)
        return data;
    }

    @action
    createLike = async(value)=> {
        const data = await CreateLike(value)
        return data;
    }

    @action
    createShare = async(value)=> {
        const data = await CreateShare(value)
        return data;
    }

    @action
    updateShare = async(value)=> {
        const data = await UpdateShare(value)
        return data;
    }

    @action
    updateDocument = async(value)=> {
        const data = await UpdateDocument(value)
        return data;
    }

    @action
    updateComment = async(value)=> {
        const data = await UpdateComment(value)
        return data;
    }

    @action
    deleteComment = async(value)=> {
        const params = new FormData();
        params.append("id", value)
        const data = await DeleteComment(params)
        return data;
    }
}

export const DOCUMENTCOMMON_STORE = "documentCommon"