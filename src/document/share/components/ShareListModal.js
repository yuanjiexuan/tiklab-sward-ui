import { Tree, Modal, message } from 'antd';
import React, { useState } from 'react';
import "./ShareListModal.scss";
import ShareModal from './ShareModal';
import { observer } from "mobx-react";
import CommentStore from "../../document/store/CommentStore";
const { TreeNode } = Tree;
const ShareListModal = (props) => {
    const { shareListVisible, setShareListVisible, repositoryCatalogueList, findCategoryChildren } = props;
    const [nodeIds, setNodeIds] = useState([])
    const [shareVisible, setShareVisible] = useState(false)
    const { createShare, updateShare } = CommentStore;
    const [expandedTree, setExpandedTree] = useState([])
    const [checkedNodes, setCheckedNodes] = useState([])


    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }

    const setOpenOrClose = expanded => {
        const id = expanded.node.key
        if (isExpandedTree(id)) {
            setExpandedTree(expandedTree.filter(item => item !== id))
        } else {
            findCategoryChildren(id, expanded.node.dimension)
            setExpandedTree(expandedTree.concat(id));
        }
    }

    const onSelect = (value, node, extra) => {
        console.log('selected', value, node, extra);
    };
    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        const list = info.checkedNodes;
        setNodeIds(checkedKeys)
        setCheckedNodes(list)
        // let nodeIds = []
        // list.map(item => {
        //     nodeIds.push(item.key)
        // })
        // setNodeIds(nodeIds)

    };
    const onFinish = () => {
        if (checkedNodes.length > 0) {
            console.log(checkedNodes)
            let treePathIds = [];
            checkedNodes.forEach(item => {
                let treePath = item.dataRef.treePath;
                if (treePath) {
                    treePath = treePath.split(";")
                    treePath.pop()
                    console.log(treePath)
                    treePathIds = treePathIds.concat(treePath)
                }

            })
            console.log(treePathIds)
            let ids = nodeIds.concat(treePathIds)
            ids = [...new Map(ids.map(item => [item, item])).values()];
            console.log(ids);
            setNodeIds(ids)
            setShareVisible(true)
        } else {
            message.warn("请选择要分享的目录或文档")
        }

    }
    const renderTreeNodes = data =>
        data?.map(item => {
            if (item.children) {
                return (
                    <TreeNode
                        title={item.name}
                        key={item.id}
                        dataRef={item}
                        type={item.type}
                        icon={({ type }) => {
                            return <>
                                {
                                    item.type === "category" && <svg className="share-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-folder" ></use>
                                    </svg>
                                }

                                {
                                    item.documentType === "document" && <svg className="share-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-file"></use>
                                    </svg>
                                }
                                {
                                    item.documentType === "markdown" && <svg className="share-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-minmap"></use>
                                    </svg>
                                }
                            </>
                        }}
                    >
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode
                title={item.name}
                icon={({ type }) => {
                    return <>
                        {
                            item.type === "category" && <svg className="share-icon" aria-hidden="true">
                                <use xlinkHref="#icon-folder" ></use>
                            </svg>
                        }

                        {
                            item.documentType === "document" && <svg className="share-icon" aria-hidden="true">
                                <use xlinkHref="#icon-file"></use>
                            </svg>
                        }
                        {
                            item.documentType === "markdown" && <svg className="share-icon" aria-hidden="true">
                                <use xlinkHref="#icon-minmap"></use>
                            </svg>
                        }
                    </>
                }}
                type={item.type}
                key={item.id}
                dataRef={item}
            />;
        });
    return (
        <>
            <Modal
                title="选择分享目录"
                visible={shareListVisible}
                cancelText="取消"
                okText="确认"
                onOk={() => onFinish()}
                onCancel={() => setShareListVisible(false)}
                className="share-list-modal"
            >
                <div className="share-list">
                    <Tree
                        checkable
                        showIcon
                        onSelect={onSelect}
                        onCheck={onCheck}
                        expandedKeys={expandedTree}
                        onExpand={(expandedKeys, expanded) => setOpenOrClose(expanded)}
                    >
                        {renderTreeNodes(repositoryCatalogueList)}
                    </Tree>
                </div>


            </Modal>
            <ShareModal
                nodeIds={nodeIds}
                shareVisible={shareVisible}
                setShareVisible={setShareVisible}
                createShare={createShare}
                updateShare={updateShare}
            />
        </>


    );
};

export default observer(ShareListModal);