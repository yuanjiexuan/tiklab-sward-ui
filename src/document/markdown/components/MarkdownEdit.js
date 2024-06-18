/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:13:00
 */
import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import "./MarkdownEdit.scss";
import { Markdown } from "thoughtware-markdown-ui";
import Button from "../../../common/button/button";
import MarkdownStore from "../store/MarkdownStore";
import "thoughtware-markdown-ui/es/thoughtware-markdown.css";
import Categorystore from "../../../repository/common/store/CategoryStore";
import { Node } from "slate";
import { message } from "antd";
import { useDebounce } from "../../../common/utils/debounce";
const MarkdownEdit = (props) => {
    const { findDocument, updateDocument } = MarkdownStore;
    const { documentTitle, setDocumentTitle} = Categorystore;
    const documentId = props.match.params.id;
    const repositoryId = props.match.params.repositoryId;
    const [value, setValue] = useState();
    useEffect(() => {
        setValue()
        findDocument(documentId).then((data) => {
            if (data.code === 0) {
                if (data.data.details) {
                    
                    const value = data.data.details;
                    setValue(JSON.parse(value))
                } else {
                    setValue( [
                        {
                            type: 'paragraph',
                            children: [
                                {
                                    text:
                                        '**make** **decorations** to  it _dead_ simple .',
                                },
                            ],
                        }
                    ])
                }
                const node = data.data.node;
                setDocumentTitle(node.name)
            }
        })
        return;
    }, [documentId])

    const save = () => {
        console.log(value)
        saveDocument(value, "click")

        // editRef.current.submit()
    }
    const serialize = nodes => {
        const text =  nodes.map(n => Node.string(n)).join('\n');
        return text;
    }
    const saveDocument = (value, type) => {
        setValue(value)
        const serializeValue = serialize(value[0].children)
        console.log(serialize)
        const data = {
            id: documentId,
            details: JSON.stringify(value),
            detailText: serializeValue
        }
        updateDocument(data).then(res => {
			if (res.code === 0 && type === "click") {
				message.success("保存成功")
			}
		})
    }

    const changeEdit =  useDebounce((value) => {
        saveDocument(value, "auto")

    }, [500])
    const changeTitle = (value) => {
        // setTitleValue(value.target.value)
        console.log(value)
        const data = {
            id: documentId,
            node: {
                id: documentId,
                name: value.target.innerText
            }
            
        }
        updateDocument(data).then(res => {
            if (res.code === 0) {
                console.log(res.code)
                document.getElementById("examine-title").innerHTML = value.target.innerText;
                document.getElementById("file-" + documentId).innerHTML = value.target.innerText
            }
        })
        setIsFocus(false)
        document.getElementById("examine-title").blur()
    }
    const [isFocus, setIsFocus] = useState()
    const keyDown = (event) => {
        
        if(event.keyCode === 13){
            event.stopPropagation();
            event.preventDefault()
            changeTitle(event)
        }
    }
    const focus = () => {
        document.getElementById("examine-title").focus()
        setIsFocus(true)
    }

  
    return (
        <div className="document-markdown-edit">
            <div className="edit-top">
                <div 
                    id="examine-title" 
                    contentEditable = {true} 
                    suppressContentEditableWarning
                    className={`edit-title ${isFocus ? "edit-title-focus" : ""}`}
                    onBlur={(event)=> changeTitle(event)}
                    onKeyDown={(event => keyDown(event))}
                    onClick={() => focus() }
                >{documentTitle}</div>
                <div className="edit-right">
                    <Button type="primary" onClick={() => save()}>保存</Button>
                    <Button onClick={() => props.history.replace(`/repositorydetail/${repositoryId}/markdownView/${documentId}`)}>退出编辑</Button>

                </div>
            </div>
            <div className="edit-markdown" style={{height: "calc(100% - 50px)"}}>
            {
                value && <Markdown value = {value} setValue = {setValue} onChange = {(value) => changeEdit(value)}/>
            }
            </div>
            



        </div>
    )
}
export default withRouter(MarkdownEdit);