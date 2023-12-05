/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-29 09:14:34
 */

import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import { Row, Col, Input } from 'antd';
import "./documentDetail.scss";
import { withRouter } from "react-router-dom";
import "./documentAddEdit.scss";
import SelectTemplateList from "./SelectTemplateList";
import DocumentStore from "../store/DocumentStore";
import CategoryStore from "../../../repository/common/store/CategoryStore";
import { updateNodeName } from "../../../common/utils/treeDataAction";
import setImageUrl from "../../../common/utils/setImageUrl";

const DocumentAddEdit = (props) => {
    const {title} = props;
    const [titleValue, setTitleValue] = useState(title);
    const { updateDocument } = DocumentStore;
    const { repositoryCatalogueList } = CategoryStore;
    const imageNames = ["template2.png", "template1.png", "template3.png", "template4.png"];
    const documentId = props.match.params.id;
    const repositoryId = props.match.params.repositoryId;
    const [templateVisible, setTemplateVisible] = useState(false);
    const { findDocumentTemplateList } = DocumentStore;
    const [templateList, setTemplateList] = useState()

    useEffect(() => {
        setTitleValue(title)
        findDocumentTemplateList().then(data => {
            if (data.code === 0) {
                setTemplateList(data.data)
            }
        })
        return
    }, [title])

    const changeTitle = (value) => {
        setTitleValue(value.target.value)
        
        const data = {
            id: documentId,
            name: value.target.value
        }
        updateDocument(data).then(res => {
            if(res.code === 0){
                document.getElementById("examine-title").innerHTML = value.target.value;
                document.getElementById("file-" + documentId).innerHTML = value.target.value;
                updateNodeName(repositoryCatalogueList, documentId, value.target.value)
            }
        })
    }

    const changeDetail = () => {
        const data = {
            id: documentId,
            details: JSON.stringify([
                {
                    type: "paragraph",
                    children: [{ text: "" }],
                },
            ])
        }
        updateDocument(data).then(res => {
            if(res.code === 0){
                props.history.push(`/repositorydetail/${repositoryId}/docEdit/${documentId}`)
            }
        })
    }
    const selectTemplate = (content) => {
        console.log(documentId)
        const data = {
            id: documentId,
            details: content
        }
        updateDocument(data).then(res => {
            if(res.code === 0){
                props.history.push(`/repositorydetail/${repositoryId}/docEdit/${documentId}`)
            }
        })
    }
    return (
        <div className="document-add">
            <Row>
                <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                    <div className="document-title">
                        <Input 
                            className="document-title-input" 
                            bordered={false}
                            onChange = {(value) => setTitleValue(value.target.value)}
                            value = {titleValue}
                            onPressEnter = {(value) => changeTitle(value)}
                            onBlur = {(value) => changeTitle(value)}
                        />
                    </div>
                    <div className="document-type">
                        <div className="document-type-item" key = {"empty"} onClick = {() => changeDetail()}>
                            <svg className="img-icon" aria-hidden="true">
                                <use xlinkHref="#icon-emptyDoc"></use>
                            </svg>
                            空白文档
                        </div>
                        <div className="document-type-item" key = {"template"} onClick = {() => setTemplateVisible(true)}>
                            <svg className="img-icon" aria-hidden="true">
                                <use xlinkHref="#icon-templateIcon"></use>
                            </svg>
                            标准模板
                        </div>
                    </div>
                    <div className="template-select">
                        <div className="template-title">推荐模版</div>
                        <div className="template-list">
                            {
                                templateList && templateList.map((item, index) => {
                                    return <div className="template-box" key = {index} onClick = {() => selectTemplate(item.details)}>
                                        <img
                                            src={setImageUrl(item.iconUrl)}
                                            alt=""
                                            className="template-image"
                                        />
                                        <div className="template-name">{item.name}</div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <SelectTemplateList {...props} documentId = {documentId} setTemplateVisible = {setTemplateVisible} templateVisible = {templateVisible}/>
                </Col>
            </Row>
        </div>

    )
}
export default withRouter(inject('documentStore')(observer(DocumentAddEdit)));