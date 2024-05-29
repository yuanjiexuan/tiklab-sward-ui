import { Row, Col, Table, Space, Modal, Form, Alert, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../common/breadcrumb/breadcrumb';
import "./RepositoryArchivedList.scss";
import RepositoryArchivedStore from '../store/RepostoryArchivedStore';

const RepositoryArchivedList = (props) => {

    const { findArchivedRepository, recoverArchivedRepository, deleteRepository } = RepositoryArchivedStore;
    const [archivedRepositoryList, setArchivedRepositoryList] = useState([])

    const [confirmForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmProjectName, setConfirmProjectName] = useState();
    const [repositoryInfo, setRepositoryInfo] = useState()
    useEffect(() => {
        findArchivedRepositoryList()
        return
    }, [])

    const recoverArchived = (repository) => {
        const values = {
            id: repository.id,
            status: "nomal",
        };
        console.log(values)
        recoverArchivedRepository(values).then(res => {
            if (res.code === 0) {
                findArchivedRepositoryList()
            }
        })
    }

    const findArchivedRepositoryList = () => {
        const data = {
            status: "archived"
        }
        findArchivedRepository(data).then(res => {
            if (res.code === 0) {
                console.log(res.data)
                setArchivedRepositoryList(res.data)
            }
        })
    }

    const deRepository = (item) => {
        setIsModalVisible(true)
        setRepositoryInfo(item)
    }

    const goRepositorydetail = (repositoryId) => {

        props.history.push({ pathname: `/repositorydetail/${repositoryId}/survey` })
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <span className="recover-name" onClick={() => goRepositorydetail(record.id)}>{text}</span>,
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
                    findArchivedRepositoryList()
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
                <div className="repository-archived">
                    <Breadcrumb
                        firstText="归档知识库"
                    />

                    <Table
                        expandable={{ defaultExpandAllRows: false, expandedRowRender: null, expandIcon: () => null }}
                        columns={columns}
                        dataSource={archivedRepositoryList}
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
export default RepositoryArchivedList;