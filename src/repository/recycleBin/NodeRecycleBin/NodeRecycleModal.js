import React from "react";
import { Form, Input, Modal } from "antd";
import NodeRecycleStore from "./store/NodeRecycleStore";
import { removeNodeInTree } from "../../../common/utils/treeDataAction";
import { withRouter } from "react-router";


const NodeRecycleModal = (props) => {
    const { nodeRecycleVisable, setNodeRecycleVisable, node, repositoryCatalogueList } = props;
    const { recycleNode } = NodeRecycleStore;
    const repositoryId = props.match.params.repositoryId;
    
    const recycleNodeFun = () => {
        // recycleNode()
        const values = {
            id: node.id,
            recycle: "1",
            type: node.type,
            treePath: node.treePath

        };
        console.log(values)
        recycleNode(values).then(res => {
            if(res.code === 0){
                recycleDocumentOrCategory(node.type, node.id)
            }
        })
        setNodeRecycleVisable(false)
    }
    const handleCancel = () => {
        setNodeRecycleVisable(false)
    }

    const recycleDocumentOrCategory = (type, id) => {
        if (type === "category") {

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
        <Modal title="归档文档" visible={nodeRecycleVisable} onOk={() => recycleNodeFun()} onCancel={handleCancel}>
            <div>是否把文档移动到回收站</div>
        </Modal>
    )
}

export default withRouter(NodeRecycleModal);