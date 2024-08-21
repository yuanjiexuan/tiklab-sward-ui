/*
 * @Descripttion: 知识库详情页
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-30 15:06:15
 */
import React, { useState, useEffect } from "react";
import { Empty, Layout, Spin } from 'antd';
import "./CollectLayout.scss";
import { renderRoutes } from "react-router-config";
import { observer, inject, Provider } from "mobx-react";
import CollectAside from "./CollectAside";
import CollectStore from "../store/CollectStore";
import { getUser } from "thoughtware-core-ui";

const CollectLayout = (props) => {
    const { route } = props;
    const [focusDocumentList, setFocusDocumentList] = useState([]);
    const { findDocumentFocusList, createRecent, documentCondition } = CollectStore;
    const [selectKey, setSelectKey] = useState(id);
    const userId = getUser().userId;
    const id = props.location.pathname.split("/")[3];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = {
            masterId: userId
        }
        setLoading(true)
        findDocumentFocusList(data).then(res => {
            if (res.code === 0) {
                console.log(res)
                setFocusDocumentList(res.data)
                if (res.data.length > 0) {
                    const document = res.data[0]?.node;
                    setSelectKey(document.id);
                    if (document.documentType === "document") {
                        props.history.push(`/collect/doc/${document.id}`)
                    }
                    if (document.documentType === "markdown") {
                        props.history.push(`/collect/markdown/${document.id}`)
                    }
                }
                
            }
            setLoading(false)
        })

        return
    }, [])

    return (<>
        <Spin wrapperClassName="collect-spin" spinning={loading} tip="加载中..." >
            {
                focusDocumentList?.length > 0 ?
                    <Layout className="collect-layout">

                        <CollectAside
                            focusDocumentList={focusDocumentList}
                            selectKey={selectKey}
                            setSelectKey={setSelectKey}
                            {...props}
                        />
                        <Layout className="collect-layout-right">
                            {renderRoutes(route.routes)}
                        </Layout>


                    </Layout>
                    :
                    <div className="collect-empty">
                        {!loading && <Empty description="暂无收藏文档" />}
                    </div>

            }
        </Spin>

    </>


    )

}
export default observer(CollectLayout);