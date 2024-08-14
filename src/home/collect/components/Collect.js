import React, { useEffect, useState } from "react";
import "./Collect.scss";
import { Col, Empty, Row } from "antd";
import { getUser } from "thoughtware-core-ui";
import CollectStore from "../store/CollectStore";
import ImgComponent from "../../../common/imgComponent/ImgComponent";
import { nodata } from "../../../assets/image";

const Collect = (props) => {
    const { findDocumentFocusPage, findFocusRepositoryList, createRecent } = CollectStore;
    const userId = getUser().userId;

    const [focusDocumentList, setFocusDocumentList] = useState([]);
    const [focusRepositoryList, setFocusRepositoryList] = useState([]);

    useEffect(() => {
        const data = {
            masterId: userId
        }
        findDocumentFocusPage(data).then(res => {
            if (res.code === 0) {
                console.log(res)
                setFocusDocumentList(res.data.dataList)
            }

        })

        findFocusRepositoryList({ masterId: userId }).then(res => {
            if (res.code === 0) {
                setFocusRepositoryList(res.data)
            }
        })
        return
    }, [])

    const goRepositoryDetail = (repository) => {
        const params = {
            name: repository.name,
            model: "repository",
            modelId: repository.id,
            master: { id: userId },
            wikiRepository: { id: repository.id }
        }
        createRecent(params)
        sessionStorage.setItem("menuKey", "repository")
        props.history.push({ pathname: `/repository/${repository.id}/survey` })
    }

    const goFocusDocumentDetail = item => {
        if (item.documentType === "document") {
            props.history.push(`/repository/${item.wikiRepository.id}/doc/${item.id}`)
        }
        if (item.documentType === "markdown") {
            props.history.push(`/repository/${item.wikiRepository.id}/markdownView/${item.id}`)
        }
        sessionStorage.setItem("menuKey", "repository")
    }


    return (
        <Row className="collect-row">
            <Col xl={{ span: 18, offset: 3 }} lg={{ span: 18, offset: 3 }} md={{ span: 20, offset: 2 }} className="home-col">

                <div className="collect-repository">
                    <div className="repository-title">收藏知识库</div>
                    {
                        focusRepositoryList.length > 0 ?
                            <div className="repository-box">
                                {
                                    focusRepositoryList.map(item => {
                                        return <div className="repository-item" key={item.id}
                                            onClick={() => goRepositoryDetail(item)}
                                        >
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

                            <Empty image={nodata} description="没有收藏过知识库~" />

                    }
                </div>
                <div className="home-document focus-document">
                    <div className="document-box-title">
                        <span className="name">收藏文档</span>
                        <div className="more" onClick={() => { props.history.push(`/focusDocumentList`) }}>
                            <svg aria-hidden="true" className="svg-icon">
                                <use xlinkHref="#icon-rightjump"></use>
                            </svg>
                        </div>
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
                                <Empty image={nodata} description="暂时没有数据~" />
                        }
                    </div>
                </div>
            </Col>
        </Row>

    )
}
export default Collect;