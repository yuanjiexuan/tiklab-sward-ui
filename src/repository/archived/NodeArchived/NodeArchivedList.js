import { Col, Modal, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../common/breadcrumb/breadcrumb";
import ArchivedStore from "../store/NodeArchivedStore";
import "./NodeArchivedList.scss"
import { withRouter } from "react-router";
const NodeArchived = (props) => {
    const {findArchivedNode, recoverArchivedNode, deleteRepositoryLog, deleteDocument} = ArchivedStore;
    const [archivedNodeList, setArchivedNodeList] = useState(null);
    const repositoryId = props.match.params.repositoryId;

    useEffect(()=> {
        findArchivedNodeList()
        return
    }, [])

    const findArchivedNodeList = () => {
        // const data = {
        //     status: "archived"
        // }

        const data = {
            repositoryId: repositoryId, 
            status: "archived"
        }
        findArchivedNode(data).then(res => {
            if(res.code === 0){
                console.log(res.data)
                setArchivedNodeList(res.data)
            }
        })
    }
    const recoverArchived = (node) => {
        const values = {
            id: node.id,
            status: "nomal",
            type: node.type,
            treePath: node.treePath
        };
        console.log(values)
        recoverArchivedNode(values).then(res => {
            if(res.code === 0){
                findArchivedNodeList()
            }
        })
    }


    const deleteNode = (item) => {
        Modal.confirm({
            title: '确定删除?',
            className: "delete-modal",
            centered: true,
            onOk() { deleteDocumentOrCategory(item) },
            onCancel() { },
        });

        const deleteDocumentOrCategory = (item) => {
            const {type, id} = item;
            if (type === "category") {
                deleteRepositoryLog(id).then(res => {
                    if(res.code === 0){
                        findArchivedNodeList()
                    }
                })
            }
            if (type === "document") {
                deleteDocument(id).then(res => {
                    if(res.code === 0){
                        findArchivedNodeList()
                    }
                })
            }
        }
       
    }
    const goDetail = (record) => {
        const {type, documentType, id} = record;
        // if (type === "category") {
        //     findCategoryChildren(item.id, item.type)
        // }

        if (type === "category") {
            props.history.push(`/repositorydetail/${repositoryId}/folder/${id}`)
        }
        if (documentType === "document") {
            props.history.push(`/repositorydetail/${repositoryId}/doc/${id}`)
        }
        if (documentType === "markdown") {
            props.history.push(`/repositorydetail/${repositoryId}/markdownView/${id}`)
        }
    }

    const selectKeyFun = (event, item) => {
        event.preventDefault()
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation()
        const params = {
            name: item.name,
            model: item.type,
            modelId: item.id,
            master: { id: userId },
            wikiRepository: { id: repositoryId }
        }
        createRecent(params)
        if (item.type === "category") {
            findCategoryChildren(item.id, item.type)
        }

        if (item.type === "category") {
            localStorage.setItem("categoryId", item.id);
            setOpenClickCategory(item.id)
            props.history.push(`/repositorydetail/${repositoryId}/folder/${item.id}`)
        }
        if (item.documentType === "document") {
            props.history.push(`/repositorydetail/${repositoryId}/doc/${item.id}`)
        }
        if (item.documentType === "markdown") {
            props.history.push(`/repositorydetail/${repositoryId}/markdownView/${item.id}`)
        }
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <span className="recover-name" onClick={() => goDetail(record)}>{text}</span>,
        },
        {
            title: '归档日期',
            dataIndex: 'archivedTime',
            key: 'archivedTime',
        },
        {
            title: '归档人',
            dataIndex: ['archivedUser', 'nickname'],
            key: 'archivedUser',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span className="recover-button" onClick={() => recoverArchived(record)}>恢复</span>
                    <span className="delete-button" onClick={() => deleteNode(record)}>删除</span>
                </Space>
            ),
        },
    ];


    return (
        <Row>
            <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }} xl={{ span: "18", offset: "3" }}>
                <div className="node-archived">
                    <Breadcrumb
                        firstText="已归档"
                    />
                    <div>
                        <Table 
                            expandable = {{defaultExpandAllRows: false, expandedRowRender: null, expandIcon: () => null }} 
                            columns={columns} 
                            dataSource={archivedNodeList} 
                            rowKey={record => record.id}
                        />
                    </div>
                </div>

            </Col>
        </Row>
    )
}

export default withRouter(NodeArchived);