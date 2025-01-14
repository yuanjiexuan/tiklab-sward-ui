import React, { useEffect, useState } from "react";
import "./Collect.scss";
import { Col, Empty, Layout, Row } from "antd";

import "./CollectAside.scss"
import InputSearch from "../../../common/input/InputSearch";
import { useDebounce } from "../../../common/utils/debounce";
const { Sider } = Layout;
const CollectAside = (props) => {
    const { focusDocumentList, selectKey, setSelectKey, findList } = props;
    const repositoryId = props.match.params.repositoryId;

    const goFocusDocumentDetail = item => {
        if (item.documentType === "document") {
            props.history.push(`/repository/${repositoryId}/collect/rich/${item.id}`)
        }
        if (item.documentType === "markdown") {
            props.history.push(`/repository/${repositoryId}/collect/markdown/${item.id}`)
        }
        setSelectKey(item.id)
    }

    const onChange = useDebounce((value) => {
        const params = {
            name: value
        }
        findList(params)
    }, 500)

    return (<>
        <Sider trigger={null} collapsible collapsedWidth="50" width="270" className="collect-aside">
            <div className='collect-doc-aside'>
                <div className="collect-doc-title">
                    <div className="collect-doc-title-left">
                        收藏
                    </div>
                </div>
                <div className="collect-doc-search" >
                    <InputSearch onChange = {(value) => onChange(value)} placeholder = "搜索"/>
                </div>
                <div>
                    {
                        focusDocumentList && focusDocumentList.length > 0 ? focusDocumentList.map((item) => {
                            return <div
                                onClick={() => goFocusDocumentDetail(item.node)}
                                className={`document-list-item ${selectKey === item.node.id ? "document-list-select" : ""}`} key={item.id} >
                                <div className='document-item-left' style={{ flex: 1 }}>
                                    <div>
                                        {
                                            item.node.documentType === "document" && <svg className="icon-24" aria-hidden="true">
                                                <use xlinkHref="#icon-file"></use>
                                            </svg>
                                        }
                                        {
                                            item.node.documentType === "markdown" && <svg className="icon-24" aria-hidden="true">
                                                <use xlinkHref="#icon-minmap"></use>
                                            </svg>
                                        }
                                    </div>

                                    <div className="document-item-text">
                                        <div className="document-title" >{item.node.name}</div>
                                        <div className="document-master" style={{ flex: 1 }}>{item.wikiRepository?.name}</div>
                                    </div>

                                </div>
                            </div>
                        })
                            :
                            <Empty description="暂时没有数据~" />
                    }

                </div>

            </div>
        </Sider>
    </>


    )
}
export default CollectAside;