import React from "react";
import { Form, Input, Modal } from "antd";
import RepositoryRecycleStore from "./store/RepositoryRecycleStore";
import { withRouter } from "react-router";


const RepositoryRecycleModal = (props) => {
    const { repositoryRecycleVisable, setRepositoryRecycleVisable } = props;
    const { recycleRepository } = RepositoryRecycleStore;
    const repositoryId = props.match.params.repositoryId;
    
    const recycleRepositoryFun = () => {
        // recycleRepository()
        const values = {
            id: repositoryId,
            recycle: "1"

        };
        console.log(values)
        recycleRepository(values).then(res => {
            if(res.code === 0){
                // recycleDocumentOrCategory(repository.type, repository.id)
                props.history.push({ pathname: `/setting/recycle` })
            }
        })
        setRepositoryRecycleVisable(false)
    }
    const handleCancel = () => {
        setRepositoryRecycleVisable(false)
    }


    return (
        <Modal title="删除知识库" visible={repositoryRecycleVisable} onOk={() => recycleRepositoryFun()} onCancel={handleCancel}>
            <div>是否把知识库移动到回收站?</div>
        </Modal>
    )
}

export default withRouter(RepositoryRecycleModal);