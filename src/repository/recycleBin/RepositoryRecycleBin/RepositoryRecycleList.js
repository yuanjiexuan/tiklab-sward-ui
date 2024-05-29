import { Row, Col, Table, Space, Modal, Form, Alert, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../common/breadcrumb/breadcrumb';
import "./RepositoryRecycleList.scss";
import RepositoryRecycleStore from './store/RepositoryRecycleStore';

const RepositoryRecycleList = (props) => {

    const { findRecycleRepository, recoverRecycleRepository, deleteRepository } = RepositoryRecycleStore
    const [recycleRepositoryList, setRecycleRepositoryList] = useState([])
    const [confirmForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmProjectName, setConfirmProjectName] = useState();
    const [repositoryInfo, setRepositoryInfo] = useState()
    useEffect(() => {
        findRecycleRepositoryList()
        return
    }, [])

    const recoverRecycle = (repository) => {
        const values = {
            id: repository.id,
            recycle: "0"
        };
        console.log(values)
        recoverRecycleRepository(values).then(res => {
            if (res.code === 0) {
                findRecycleRepositoryList()
            }
        })
    }

    const findRecycleRepositoryList = () => {
        const data = {
            recycle: "1"
        }
        findRecycleRepository(data).then(res => {
            if (res.code === 0) {
                console.log(res.data)
                setRecycleRepositoryList(res.data)
            }
        })
    }

    const deRepository = (item) => {
        setIsModalVisible(true)
        setRepositoryInfo(item)
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
                    <span className="delete-button" onClick={() => deRepository(record)}>删除</span>
                </Space>
            ),
        },
    ];

    const handleOk = () => {
        confirmForm.validateFields().then((fieldsValue) => {
            deleteRepository(repositoryInfo.id).then(response => {
                if (response.code === 0) {
                    message.success('删除成功');
                    setIsModalVisible(false);
                    findRecycleRepositoryList()
                }
            })

        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Row>
            <Col lg={{ span: 24 }} xxl={{ span: "18", offset: "3" }} xl={{ span: "18", offset: "3" }}>
                <div className="repository-recycle">
                    <Breadcrumb
                        firstText="回收站"
                    />

                    <Table
                        expandable={{ defaultExpandAllRows: false, expandedRowRender: null, expandIcon: () => null }}
                        columns={columns}
                        dataSource={recycleRepositoryList}
                        rowKey={record => record.id}
                    />

                    <Modal
                        title="确定删除"
                        getContainer={false}
                        visible={isModalVisible}
                        closable={false}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText={"确定"}
                        cancelText={"取消"}
                        okType="danger"
                        okButtonProps={{ type: "primary" }}
                    >
                        <Alert message=" 此知识库及其目录、文档、附件和评论将被永久删除" type="error" showIcon />
                        <div style={{ padding: "20px 0" }}>
                            <Form
                                form={confirmForm}
                                name="dependencies"
                                autoComplete="off"
                                style={{
                                    maxWidth: 600,
                                }}
                                layout="vertical"
                            >
                                <Form.Item
                                    label="知识库名称"
                                    name="confirmProjectName"
                                    rules={[
                                        {
                                            required: true,
                                            message: `请输入知识库名称`,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                //getFieldValue可以获得其他输入框的内容
                                                if (repositoryInfo?.name !== value) return Promise.reject(`请输入正确的知识库名字`);
                                                return Promise.resolve();
                                            }
                                        })
                                    ]}
                                >
                                    <Input value={confirmProjectName} onChange={(value) => setConfirmProjectName(value.target.value)} />
                                </Form.Item>
                            </Form>
                        </div>

                    </Modal>
                </div>
            </Col>
        </Row>
    )
}
export default RepositoryRecycleList;