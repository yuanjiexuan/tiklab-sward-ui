import React, { useEffect, useState } from "react";
import Breadcumb from "../../../common/breadcrumb/breadcrumb";
import { inject, observer } from "mobx-react";
import { getUser } from "tiklab-core-ui";
import { Row, Col, Empty, Pagination } from "antd";
import "./FocusDocumentList.scss";
import HomeStore from "../store/HomeStore";
import { nodata } from "../../../assets/image";
const FocusDocumentList = (props) => {
    const { findDocumentFocusPage, focusTotal, focusCondition } = HomeStore;
    const userId = getUser().userId;
    const [firstText, setFirstText] = useState();
    const repositoryId = props.match.params.repositoryId;
    const [focusDocumentList, setFocusDocumentList] = useState([])

    useEffect(() => {
        if (props.route.path === "/focusDocumentList") {
            setFirstText("首页")
            const data = {
                masterId: userId,
                pageParam: {
                    pageSize: 20,
                    currentPage: 1
                }
            }
            findDocumentFocusPage(data).then(res => {
                if (res.code === 0) {
                    console.log(res)
                    setFocusDocumentList(res.data.dataList)
                }

            })
        }

        if (props.route.path === "/repository/:repositoryId/focusDocumentList") {
            setFirstText("知识库概况")
            const data = {
                masterId: userId,
                repositoryId: repositoryId,
                pageParam: {
                    pageSize: 20,
                    currentPage: 1
                }
            }
            findDocumentFocusPage(data).then(res => {
                if (res.code === 0) {
                    console.log(res)
                    setFocusDocumentList(res.data.dataList)
                }

            })
        }
        return;
    }, [])

    const goFocusDocumentDetail = item => {
        if (item.documentType === "document") {
            props.history.push(`/repository/${item.wikiRepository.id}/doc/rich/${item.id}`)
        }
        if (item.documentType === "markdown") {
            props.history.push(`/repository/${item.wikiRepository.id}/doc/markdown/${item.id}`)
        }
        sessionStorage.setItem("menuKey", "repository")
    }

    const onPageChange = (page) => {
        const params = {
            pageParam: {
                pageSize: 20,
                currentPage: page
            }
        }
        findDocumentFocusPage(params).then(res => {
            if (res.code === 0) {
                console.log(res)
                setFocusDocumentList(res.data.dataList)
            }

        })
    }
    return (
        <Row className="focus-row">
            <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }} className="focus-col">
                <div className="focus-list-page">
                    <div className="focus-list-top">
                        <Breadcumb
                            {...props}
                            firstText={firstText}
                            secondText="收藏"
                        />

                    </div>

                    <div>
                        {
                            focusDocumentList && focusDocumentList.length > 0 ? focusDocumentList.map((item) => {
                                return <div className="document-list-item" key={item.id} >
                                    <div className='document-item-left' style={{ flex: 1 }}>
                                        <div>
                                            {/* <svg className="document-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-file"></use>
                                                </svg> */}
                                            {
                                                item.node.documentType === "document" && <svg className="document-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-file"></use>
                                                </svg>
                                            }
                                            {
                                                item.node.documentType === "markdown" && <svg className="document-icon" aria-hidden="true">
                                                    <use xlinkHref="#icon-minmap"></use>
                                                </svg>
                                            }
                                        </div>

                                        <div className="document-item-text">
                                            <div className="document-title" onClick={() => goFocusDocumentDetail(item.node)}>{item.node.name}</div>
                                            <div className="document-master" style={{ flex: 1 }}>{item.wikiRepository?.name}</div>
                                        </div>

                                    </div>

                                    <div className="document-repository">{item.master.nickname}</div>

                                    <div className="document-time">{item.focusTime}</div>
                                </div>
                            })
                                :
                                <Empty description="暂时没有数据~" />
                        }
                    </div>
                    {
                        focusTotal > 0 && <div className="focus-pagination">
                            <Pagination
                                onChange={onPageChange}
                                simple
                                defaultCurrent={1}
                                total={focusTotal}
                                current={focusCondition.pageParam.currentPage}
                                // showSizeChanger={false}
                                // defaultPageSize={20}
                                pageSize={focusCondition.pageParam.pageSize}
                                hideOnSinglePage = {true}
                                showQuickJumper = {false}
                            />
                        </div>
                    }
                </div>
            </Col>
        </Row>
    )
}
export default observer(FocusDocumentList);