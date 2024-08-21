import React from "react";
import "./DynamicItem.scss"
import { withRouter } from "react-router";
const DynamicListItem = (props) => {
    const { content, actionType, key } = props;
    const data = JSON.parse(content)
    const repositoryId = props.match.params.repositoryId;
    const { createUserIcon, createUser, updateTime, documentId, createUserName, createTime,
        documentName, oldValue, newValue, documentType } = data;
    const goDynamicDetail = () => {
        if (documentType === "document") {
            props.history.push(`/repository/${repositoryId}/doc/rich/${documentId}`)
        }
        if (documentType === "markdown") {
            props.history.push(`/repository/${repositoryId}/doc/markdown/${documentId}`)
        }
    }
    const setDom = () => {
        let dom = null;
        switch (actionType) {
            case "SWARD_LOGTYPE_DOCUMENTADD":
                dom = (
                    <div className="dynamic-list-item" key={key}>
                        <div className="dynamic-list-item-content">
                            <div className="dynamic-content">
                                <div className="dynamic-document-action">{createUser.nickname}添加了文档</div>
                                <div className="dynamic-document-item">
                                    <div className="dynamic-document-title" onClick={() => goDynamicDetail()}>{documentName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                break;
            case "SWARD_LOGTYPE_DOCUMENTUPDATENAME":
                dom = <div className="dynamic-list-item" key={key}>
                    <div className="dynamic-list-item-content">
                        <div className="dynamic-content">
                            <div className="dynamic-document-action">{createUserName}修改了文档名称</div>
                            <div className="dynamic-document-update">
                                {/* <div
                                    className="dynamic-document-oldvalue"
                                >
                                    {oldValue}
                                </div>
                                ——— */}
                                <div
                                    className="dynamic-document-newValue" 
                                    onClick={() => goDynamicDetail()}
                                >
                                    {newValue}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                break;
            default:
                break;

        }
        return dom;
    }
    return (<>
        {
            setDom()
        }
    </>

    )
}

export default withRouter(DynamicListItem);