import { Alert, Button, Col, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../common/breadcrumb/breadcrumb";
import ArchivedStore from "../store/NodeArchivedStore";
import "./RepositoryArchived.scss"
import { withRouter } from "react-router";
import RepostoryArchivedStore from "../store/RepostoryArchivedStore";
const NodeArchived = (props) => {
    const { archivedRepository, findRepository, recoverArchivedRepository } = RepostoryArchivedStore;
    const [repositoryStatus, setRepositoryStatus] = useState()
    const repositoryId = props.match.params.repositoryId;

    useEffect(() => {
        getRepository()
        return
    }, [])

    const getRepository = () => {
        findRepository({ id: repositoryId }).then(res => {
            if (res.code === 0) {
                setRepositoryStatus(res.data.status)
            }
        })
    }
    const archived = () => {
        const values = {
            id: repositoryId,
            status: "archived"
        };

        Modal.confirm({
            title: '确定归档?',
            className: "archived-modal",
            centered: true,
            onOk() { archivedRes() },
            onCancel() { },
        });

        const archivedRes = () => {
            archivedRepository(values).then(res => {
                if (res.code === 0) {
                    getRepository()
                }
            })
        }
    }

    const recover = () => {
        const values = {
            id: repositoryId,
            status: "nomal"
        };
        recoverArchivedRepository(values).then(res => {
            if(res.code === 0){
                getRepository()
            }
        })
    }


    return (
        <Row>
            <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }} xl={{ span: "18", offset: "3" }}>
                <div className="repository-archived">
                    <Breadcrumb
                        firstText="归档知识库"
                    />
                    {
                        repositoryStatus === "nomal" ? <>
                            <div className="repository-alert">
                                <Alert
                                    message="归档知识库"
                                    description="将知识库归档可以使其在基本网站导航中隐藏起来，这样可以消除混乱情况，因而更容易找到最新和最相关的内容。以后如果需要，您随时可以找到已归档的知识库，并且随时可以对其进行恢复。 
                                        了解更多"
                                    type="info"
                                    showIcon
                                />
                            </div>
                            <Button type="primary" onClick={() => archived()}>归档知识库</Button>
                        </>
                            :
                            <>
                                <div className="repository-alert">
                                    <Alert
                                        description="此知识库已归档。目前，此知识库及其内容在基本站点导航和搜索中处于隐藏状态。 
                                    恢复此知识库可将其还原到活动状态。"
                                        type="info"
                                        showIcon
                                    />
                                </div>
                                <Button type="primary" onClick={() => recover()}>恢复知识库</Button>
                            </>
                    }


                </div>

            </Col>
        </Row>
    )
}

export default withRouter(NodeArchived);