import React from "react";
import { Form, Input, Modal } from "antd";
import ArchivedStore from "../store/NodeArchivedStore";
import { removeNodeInTree } from "../../../common/utils/treeDataAction";
import { withRouter } from "react-router";


const NodeArchivedModal = (props) => {
    const { nodeArchivedVisable, setNodeArchivedVisable, node, repositoryCatalogueList } = props;
    const { archivedNode } = ArchivedStore;
    const [form] = Form.useForm();
    const repositoryId = props.match.params.repositoryId;
    
    const archivedNodeFun = () => {
        // archivedNode()
        form.validateFields().then((fieldsValue) => {
            const values = {
                ...fieldsValue,
                status: "archived",
                id: node.id,
                type: node.type

            };
            console.log(values)
            archivedNode(values).then(res => {
                if(res.code === 0){
                    archivedDocumentOrCategory(node.type, node.id)
                }
            })
        })
        setNodeArchivedVisable(false)
    }
    const handleCancel = () => {
        setNodeArchivedVisable(false)
    }

    const archivedDocumentOrCategory = (type, id) => {
        if (type === "category") {
            // deleteRepositoryLog(item.id).then(res => {
               
            // })
            const node = removeNodeInTree(repositoryCatalogueList, null, id)
            console.log(node)
            if (node) {
                if (node.type === "category") {
                    props.history.push(`/repositorydetail/${repositoryId}/folder/${node.id}`)
                }
                if (node.type === "document") {
                    props.history.push(`/repositorydetail/${repositoryId}/doc/${node.id}`)
                }
            } else {
                props.history.push(`/repositorydetail/${repositoryId}/survey`)
            }
        }
        if (type === "document") {
            // deleteDocument(item.id).then(res => {
              
            // })
            const node = removeNodeInTree(repositoryCatalogueList, null, id)
            console.log(node)
            if (node) {
                if (node.type === "category") {
                    props.history.push(`/repositorydetail/${repositoryId}/folder/${node.id}`)
                }
                if (node.type === "document") {
                    props.history.push(`/repositorydetail/${repositoryId}/doc/${node.id}`)
                }
            } else {
                props.history.push(`/repositorydetail/${repositoryId}/survey`)
            }
        }
    }

    return (
        <Modal title="归档文档" visible={nodeArchivedVisable} onOk={() => archivedNodeFun()} onCancel={handleCancel}>
            <Form
                name="basic"
                form = {form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
                labelAlign = "left"
            >
                <Form.Item
                    label="备注"
                    name="archivedDesc"
                    rules={[
                        {
                            required: false,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default withRouter(NodeArchivedModal);