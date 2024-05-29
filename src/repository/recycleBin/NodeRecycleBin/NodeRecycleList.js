import { Row, Col, Table, Space, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../common/breadcrumb/breadcrumb';
import "./NodeRecycleList.scss";
import NodeRecycleStore from './store/NodeRecycleStore';
const NodeRecycleList = (props) => {
    
    const {findRecycleNode, recoverRecycleNode, deleteRepositoryLog, deleteDocument} = NodeRecycleStore
    const [recycleNodeList, setRecycleNodeList] = useState([])
    const repositoryId = props.match.params.repositoryId;

    useEffect(()=> {
        findRecycleNodeList()
        return
    }, [])

    const recoverRecycle = (node) => {
        const values = {
            id: node.id,
            recycle: "0",
            type: node.type,
            treePath: node.treePath
        };
        console.log(values)
        recoverRecycleNode(values).then(res => {
            if (res.code === 0) {
                findRecycleNodeList()
            }
        })
    }

    const findRecycleNodeList = () => {
        const data = {
            repositoryId: repositoryId,
            recycle: "1"
        }
        findRecycleNode(data).then(res => {
            if (res.code === 0) {
                console.log(res.data)
                setRecycleNodeList(res.data)
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
            const { type, id } = item;
            if (type === "category") {
                deleteRepositoryLog(id).then(res => {
                    if (res.code === 0) {
                        findRecycleNodeList()
                    }
                })
            }
            if (type === "document") {
                deleteDocument(id).then(res => {
                    if (res.code === 0) {
                        findRecycleNodeList()
                    }
                })
            }
        }
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <span className="recover-name">{text}</span>,
        },
        {
            title: '归档日期',
            dataIndex: 'recycleTime',
            key: 'recycleTime',
        },
        {
            title: '归档人',
            dataIndex: ['recycleUser', 'nickname'],
            key: 'recycleUser',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <span className="recover-button" onClick={() => recoverRecycle(record)}>恢复</span>
                    <span className="delete-button" onClick={() => deleteNode(record)}>删除</span>
                </Space>
            ),
        },
    ];


    return (
        <Row>
            <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }} xl={{ span: "18", offset: "3" }}>
                <div className="node-recycle">
                    <Breadcrumb
                        firstText="回收站"
                    />

                    <Table
                        expandable={{ defaultExpandAllRows: false, expandedRowRender: null, expandIcon: () => null }}
                        columns={columns}
                        dataSource={recycleNodeList}
                        rowKey={record => record.id}
                    />
                </div>
            </Col>
        </Row>
    )
}
export default NodeRecycleList;