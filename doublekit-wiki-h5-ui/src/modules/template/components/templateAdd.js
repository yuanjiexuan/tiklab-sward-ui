/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-07 10:20:57
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-09 09:10:16
 */
import React, { useState,useEffect } from "react";
import { observer, inject } from "mobx-react";
// import { Modal,Select,Form   } from 'antd';
import { SafeArea,Form,Input } from "antd-mobile";
import "./templateAdd.scss"
import { PreviewEditor,DocumentEditor } from "doublekit-slate-h5-ui"
const TemplateAdd = (props) => {
    const {templateStore} = props;
    const {createDocumentTemplate} = templateStore;
    // const [template,setTemplate] = useState();
    // const [editTemplate, setEditTemplate] = useState(false)
    const [templateName, setTemplateName] = useState("")
    const [templateDesc, setTemplateDesc] = useState("")
    const [value, setValue] = useState([
		{
			type: "paragraph",
			children: [{ text: "空白文档" }],
		},
	])
    const submit = () => {
        const params = {
            name: templateName,
            description: templateDesc,
            details: JSON.stringify(value)
        }
        createDocumentTemplate(params).then(res=> {
            if(res.code === 0){
                props.history.goBack()
            }
        })
    }
    // useEffect(()=>{
    //     if(templateId) {
    //         findDocumentTemplate(templateId).then(data => {
    //             const value = data.data
    //             if(data.code === 0){
    //                 // form.setFieldsValue({   
    //                 //     name: value.name,
    //                 //     description: value.description
    //                 // })
    //                 setTemplate({...value})
    //                 setTemplateName(value.name)
    //                 setTemplateDesc(value.description)
    //                 setValue(JSON.parse(value.details))
    //             }
    //         })
    //     }
    // },[templateId])

    return ( 
        <div className="template-previewmodal">
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position='top' />
            </div>
            <div className="category-top">
                <div className="category-top-left">
                    <svg className="category-icon-logo" aria-hidden="true" onClick={() => props.history.goBack()}>
                        <use xlinkHref="#icon-left"></use>
                    </svg>
                    <div className="category-title">模板</div>
                </div>
                <div className="category-top-right">
                    <span 
                        style={{ color: "#5D70EA", fontSize: "14px" }} 
                        onClick={() => submit()}
                    >
                        确定
                    </span>
                </div>
            </div> 
            <div style={{padding: "10px"}}>
               <div className="previewmodal-top">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref= "#icon-template"></use>
                </svg>
                <div className="previewmodal-from">
                    <div className="title">
                        <Input  value = {templateName} onChange = {(value) => setTemplateName(value)}/>
                    </div>
                    <div className="doc">
                        <Input  value = {templateDesc} onChange = {(value) => setTemplateDesc(value)}/>
                    </div>
                    
                </div>
               
            </div>
            <DocumentEditor value = {value} onChange = {setValue} showMenu = {true}/>
            
            </div>
            
        </div>
            
        // </Modal>
    )
}

// export default inject("WikiCatalogueStore")(observer(TemplatePreviewmodal));
export default inject("templateStore")(observer(TemplateAdd));