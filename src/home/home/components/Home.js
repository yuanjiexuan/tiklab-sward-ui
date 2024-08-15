import React, { Fragment, useEffect, useState } from 'react';
import "./home.scss";
import { Row, Col, Empty, Pagination } from 'antd';
import { observer } from 'mobx-react';
import { getUser } from 'thoughtware-core-ui';
import HomeStore from "../store/HomeStore";
import UserIcon from '../../../common/UserIcon/UserIcon';
import ImgComponent from '../../../common/imgComponent/ImgComponent';
import { nodata } from '../../../assets/image';
const Home = (props) => {
    const { findDocumentRecentList, findRecentRepositoryList, findDocumentFocusPage } = HomeStore;
    const [recentViewDocumentList, setRecentViewDocumentList] = useState([]);
    const [recentRepositoryDocumentList, setRecentRepositoryDocumentList] = useState([]);
    const userId = getUser().userId
    const tenant = getUser().tenant;

    useEffect(() => {
        const recentDocumentParams = {
            masterId: userId,
            model: "document",
            orderParams: [{
                name: "recentTime",
                orderType: "desc"
            }]
        }
        findDocumentRecentList(recentDocumentParams).then(res => {
            console.log(res)
            if (res.code === 0) {
                setRecentViewDocumentList([...res.data])
            }

        })


        const recentRepositoryParams = {
            masterId: userId,
            model: "repository",
            orderParams: [{
                name: "recentTime",
                orderType: "desc"
            }]
        }
        findRecentRepositoryList(recentRepositoryParams).then(res => {
            if (res.code === 0) {
                setRecentRepositoryDocumentList(res.data.slice(0, 5))
            }

        })
        return;
    }, [])

    const goRepositoryDetail = repository => {
        sessionStorage.setItem("menuKey", "repository")
        props.history.push(`/repository/${repository.id}/overview`)
    }
    const goDocumentDetail = item => {
        if (item.documentType === "document") {
            props.history.push(`/repository/${item.wikiRepository.id}/doc/${item.id}`)
        }
        if (item.documentType === "markdown") {
            props.history.push(`/repository/${item.wikiRepository.id}/markdown/${item.id}`)
        }
        sessionStorage.setItem("menuKey", "repository")

    }


    return (
        <div className="home">
            <Row className="home-row">
                <Col xl={{ span: 14, offset: 5 }} lg={{ span: 16, offset: 4 }} md={{ span: 20, offset: 2 }} className="home-col">

                    <div className="home-repository">
                        <div className="repository-title">常用知识库</div>
                        {

                            recentRepositoryDocumentList.length > 0 ?
                                <div className="repository-box">
                                    {
                                        recentRepositoryDocumentList.map(item => {
                                            return <div className="repository-item" key={item.id} onClick={() => goRepositoryDetail(item)} >
                                                <div className="item-title">
                                                    <ImgComponent
                                                        src={item.iconUrl}
                                                        alt=""
                                                        className="list-img"
                                                    />
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="item-work">
                                                    <div className="process-work"><span style={{ color: "#999" }}>文档</span><span>{item.documentNum}篇</span></div>
                                                    <div className="end-work"><span style={{ color: "#999" }}>目录</span><span>{item.categoryNum}个</span></div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                                :
                                <div className="repository-box-empty">
                                    <Empty image={nodata} description="暂时没有查看过知识库~" />
                                </div>


                        }
                    </div>

                    <div className="home-document">
                        <div className="document-box-title">
                            <span className="name">常用文档</span>
                        </div>
                        <div>
                            {
                                recentViewDocumentList && recentViewDocumentList.length > 0 ? recentViewDocumentList.map((item) => {
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
                                                <div className="document-title" onClick={() => goDocumentDetail(item.node)}>{item.name}</div>
                                                <div className="document-master" style={{ flex: 1 }}>{item.wikiRepository?.name}</div>
                                            </div>

                                        </div>

                                        <div className="document-master-name">
                                            <UserIcon name={item.master.nickname} size="big" />
                                            {item.master.nickname}
                                        </div>

                                        <div className="document-time">{item.recentTime}</div>
                                    </div>
                                })
                                    :
                                    <Empty image={nodata} description="暂时没有数据~" />
                            }
                        </div>

                    </div>


                </Col>
            </Row>

        </div >
    );
}

export default observer(Home);