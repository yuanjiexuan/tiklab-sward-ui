/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:13:00
 */
import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Input, message } from 'antd';
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import "./documentEdit.scss";
import { EditorBigContent, EditorBig } from "thoughtware-slate-ui";
import Button from "../../../common/button/button";
import DocumentStore from "../store/DocumentStore";
import CategoryStore from "../../../repository/common/store/CategoryStore";
import "thoughtware-slate-ui/es/thoughtware-slate.css";
import { getUser } from "thoughtware-core-ui";
import { useDebounce } from "../../../common/utils/debounce";
import { updateNodeName } from "../../../common/utils/treeDataAction";
import setImageUrl from "../../../common/utils/setImageUrl";
import SelectTemplateList from "./SelectTemplateList";
import Template from "../../../assets/images/template.png";
import Zhoubao from "../../../assets/images/zhoubao.png";
const DocumentEdit = (props) => {
    const { relationWorkStore, documentStore } = props;
    console.log(documentStore)
    const { findDocument, updateDocument, findDocumentTemplateList } = DocumentStore;
    const { documentTitle, setDocumentTitle, repositoryCatalogueList } = CategoryStore
    const documentId = props.match.params.id;
    const repositoryId = props.match.params.repositoryId;
    const [docInfo, setDocInfo] = useState({ name: "", likenumInt: "", commentNumber: "", master: { name: "" } });
    const [value, setValue] = useState();
    const [valueIsEmpty, setValueIsEmpty] = useState(false);
    const editRef = useRef();
    const ticket = getUser().ticket;
    const tenant = getUser().tenant;
    const [templateVisible, setTemplateVisible] = useState(false);
    const [templateList, setTemplateList] = useState()

    useEffect(() => {
        findDocumentTemplateList().then(data => {
            if (data.code === 0) {
                setTemplateList(data.data)
            }
        })
        return;
    }, [])

    useEffect(() => {
        setValue()
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                const detailDocument = data?.data?.node;
                setDocumentTitle(detailDocument.name)
                if (data?.data?.details) {
                    setValue(data?.data?.details);
                } else {
                    setValue("[{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]}]")
                }
                setDocInfo(detailDocument)
            }
        })
        return;
    }, [documentId])

    useEffect(() => {
        if (value) {
            setValueIsEmpty(determineValue(value))
        }

    }, [value])

    const save = () => {
        saveDocument(value)

        // editRef.current.submit()
    }

    const saveDocument = (value) => {
        setValue(value)
        const data = {
            id: documentId,
            details: value,
            detailText: editRef.current.innerText
        }
        updateDocument(data).then(res => {
			if (res.code === 0) {
				message.success("保存成功")
			}
		})
    }

    const updataDesc = useDebounce((value) => {
        setValue(value);
        const data = {
            id: documentId,
            details: value,
            detailText: editRef.current.innerText
        }
        updateDocument(data)

    }, [500])

    const changeTitle = (value) => {
        setDocumentTitle(value.target.value)
        const data = {
            id: documentId,
            node: {
                id: documentId,
                name: value.target.value
            }

        }
        updateDocument(data).then(res => {
            if (res.code === 0) {
                document.getElementById("examine-title").innerHTML = value.target.value;
                document.getElementById("file-" + documentId).innerHTML = value.target.value;
                updateNodeName(repositoryCatalogueList, documentId, value.target.value)
            }
        })
    }

    const determineValue = (value) => {
        let isEmpty = true;
        const valueObject = JSON.parse(value);
        if (valueObject.length > 1) {
            isEmpty = false;
        }

        if (valueObject.length === 1) {
            if (valueObject[0].type === "paragraph") {
                if (valueObject[0].children[0].text === "") {
                    isEmpty = true;
                } else {
                    isEmpty = false;
                }
            } else {
                isEmpty = false;
            }
        }
        console.log(isEmpty)
        return isEmpty;
    }

    const selectTemplate = (item) => {
        /**
         * detailText 没更新到
         */
        const data = {
            id: documentId,
            details: item.details,
            detailText: item.detailText
        }
        setValue(null)
        updateDocument(data).then(res => {
            if (res.code === 0) {
                setValue(item.details)
                // props.history.push(`/repositorydetail/${repositoryId}/docEdit/${documentId}`)
            }
        })
    }

    const goExamine = () => {
        props.history.push(`/repositorydetail/${repositoryId}/doc/${documentId}`)
    }
    return (
        <div className="documnet-edit">
            <div className="edit-top">
                <div className="edit-title" id="examine-title">{docInfo.name}</div>
                <div className="edit-right">
                    <Button type="primary" onClick={() => save()}>保存</Button>
                    <Button onClick={() => goExamine()}>退出编辑</Button>
                </div>
            </div>
            {
                value && <EditorBig
                    value={value}
                    onChange={value => updataDesc(value)}
                    relationWorkStore={relationWorkStore}
                    base_url={upload_url}
                    ticket={ticket}
                    tenant={tenant}
                >
                    <>
                        <Row className="document-examine-content">
                            <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }}>
                                <div className="document-title">
                                    <Input
                                        className="document-title-input"
                                        bordered={false}
                                        onChange={(value) => setDocumentTitle(value.target.value)}
                                        value={documentTitle}
                                        onPressEnter={(value) => changeTitle(value)}
                                        onBlur={(value) => changeTitle(value)}
                                    />
                                </div>
                                <div ref={editRef}>
                                    <EditorBigContent
                                        value={value}
                                        relationWorkStore={relationWorkStore}

                                    />
                                </div>
                                {
                                    valueIsEmpty &&
                                    <div className="template-select">
                                        <div className="template-title">推荐模版</div>
                                        <div className="template-list">
                                            {
                                                templateList && templateList.map((item, index) => {
                                                    return <div className="template-box" key={index} onClick={() => selectTemplate(item)}>
                                                        <img
                                                            // src={setImageUrl(item.iconUrl)}
                                                            src={Zhoubao}
                                                            alt=""
                                                            className="template-image"
                                                        />
                                                        <div className="template-name">{item.name}</div>
                                                    </div>
                                                })
                                            }
                                            <div className="template-box" key={0} onClick={() => setTemplateVisible(true)}>
                                                <img
                                                    src={Template}
                                                    // src={('/images/' + imageNames[index])}
                                                    alt=""
                                                    className="template-image"
                                                />
                                                <div className="template-name">更多模版</div>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </Col>
                        </Row>
                    </>

                </EditorBig>
            }
            <SelectTemplateList 
                documentId = {documentId} 
                setTemplateVisible = {setTemplateVisible} 
                templateVisible = {templateVisible}
                documentStore = {DocumentStore}
                selectTemplate = {selectTemplate}
                {...props} 
            />
               
        </div>
    )
}
export default withRouter(inject("relationWorkStore")(observer(DocumentEdit)));