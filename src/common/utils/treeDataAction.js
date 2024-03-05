const appendNodeInTree = (id, tree, obj, setType) => {
    if (id) {
        tree.forEach(ele => {
            if (ele.id === id) {
                switch (setType) {
                    case "inset":
                        ele.children ? ele.children.unshift(...obj) : ele.children = obj;
                        break;
                    case "overview":
                        ele.children = obj
                        break;
                    default:
                        ele.children ? ele.children.unshift(...obj) : ele.children = obj;
                        break
                }
            } else {
                if (ele.children) {
                    appendNodeInTree(id, ele.children, obj, setType)
                }
            }
        })
    } else {
        tree.unshift(...obj)
    }

    return tree
}

const removeNodeInTree = (tree, id, sort) => { // 通过id从数组（树结构）中移除元素
    if (!tree || !tree.length) {
        return
    }

    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === id) {
            tree.splice(i, 1);
        }
        
        removeNodeInTree(tree[i].children, id)
    }
}


const removeNodeAndSort = (tree, id, sort) => {
    if (!tree || !tree.length) {
        return null;
    }
    let node = null;
    if (id === "nullString") {
        tree.splice(sort, 1)
        // 为了删除之后方便重新进入新文档
        // 如果当前顺序大于1
        if(tree.length > 0) {
            if(sort <= tree.length -1){
                node = tree[sort]
            }else {
                node = tree[sort - 1]
            }
        }else {
            node = null
        }
        tree.map((item) => {
            if (item.sort > sort) {
                item.sort = item.sort - 1
            }
            return item;
        })
    } else {
        tree.forEach(ele => {
            
            if (ele.id === id) {
                
                ele.children.splice(sort, 1)
                if(ele.children.length > 0) {
                    if(sort <= ele.children.length -1){
                        node = ele.children[sort]
                    }else {
                        node = ele.children[sort - 1]
                    }
                }else {
                    node = ele;
                }
                ele.children.map((item) => {
                    if (item.sort > sort) {
                        item.sort = item.sort - 1
                    }
                })
            } else {
                if (ele.children) {
                    const foundNode = removeNodeAndSort(ele.children, id, sort);
                    if (foundNode) {
                        node = foundNode; // 设置找到的节点为当前节点
                    }
                }
            }
        })
    }
    return node;
}



const updataTreeSort = (tree, params, node) => { // 通过id从数组（树结构）中移除元素
    const { oldParentId, oldSort, parentId, sort } = params;
    const tree1 = removeNodeForUpdate(tree, oldParentId, oldSort, node.id)
    // const tree2 = insertNodeAndSort(tree1, parentId, sort, node)
    console.log(tree1)
}

const removeNodeForUpdate = (tree, parentId, sort, nodeId) => {

    if (!tree || !tree.length) {
        return
    }
    if (parentId === "nullString") {
        tree = tree.filter(item => {
            if (item.sort > sort && item.id != nodeId) {
                item.sort = item.sort - 1
            }
            return item.id !== nodeId
        })
    } else {
        tree.forEach(ele => {
            if (ele.id === parentId) {
                ele.children = ele.children.filter(item => {
                    if (item.sort > sort && item.id != nodeId) {
                        item.sort = item.sort - 1
                    }
                    return item.id !== nodeId
                })
            } else {
                if (ele.children) {
                    removeNodeForUpdate(ele.children, parentId, sort, nodeId)
                }
            }
        })
    }
    return tree;
}

const insertNodeAndSort = (tree, parentId, sort, node) => { // 通过id从数组（树结构）中移除元素
    if (!tree || !tree.length) {
        return
    }
    if (parentId === "nullString") {
        //  先把老的数组加一，之后再插入新数据，不然新数据也会被加一
        let moveIndex = null
        tree.forEach((item, index) => {
            if(item.sort === sort  && item.id != node.id){
                moveIndex = index
            }
            if (item.sort >= sort && item.id != node.id) {
                item.sort = item.sort + 1
            }
            
        })
        tree.splice(moveIndex, 0, node)
    } else {
        tree.forEach(ele => {
            if (ele.id === parentId) {
                let moveIndex = null
                console.log(ele.children)
                ele.children.map((item, index) => {
                    if (item.sort >= sort&& item.id != node.id) {
                        item.sort = item.sort + 1
                    }
                    if(item.id === node.id  && item.id != node.id){
                        moveIndex = index
                    }
                })
                ele.children.splice(moveIndex, 0, node)
            } else {
                if (ele.children) {
                    insertNodeAndSort(ele.children, id, sort, node)
                }
            }
        })
    }
    return tree;
}

const findNodeById = (tree, params) => {
    console.log("findNodeById", params)
    const { id, sort, dimension, oldDimension } = params;
    let node = null;
    let state = false;
    const readTree = (_tree, id) => {
        if (state) return;
        console.log(_tree)
        if(!_tree) return
        for (let i = 0; i < _tree.length; i++) {
            
            if (_tree[i].id === id) {
                state = true;
                node = _tree[i];
            } else {
                _tree[i].children !== null && readTree(_tree[i].children, id);
            }
        }
    };
    readTree(tree, id);
    if (node) {
        node.sort = sort;
        node.dimension = dimension;
        if (node.formatType === "category") {
            node.parentWikiCategory = params.parentWikiCategory;
        } else {
            node.wikiCategory = params.wikiCategory;
        }
        const distence = dimension - oldDimension;
        console.log(dimension, oldDimension)
        updateNode(node.children, distence)
    }
    return node;
};


const updateNode = (node, distence) => {
    if (!node || !node.length) {
        return
    }
    node.forEach(item => {
        item.dimension = item.dimension + distence;
        if(item.children != null){
            updateNode(item.children)
        }
        
        return item;
    })
}

const replaceTree = (tree, node) => {
    tree.forEach((item, index) => {
        if(item.id === node.id){
            tree[index] = node;
        }else {
            if (item.children) {
                replaceTree(item.children, node)
            }
        }
        return item;
    })
}

const updateNodeName = (tree, id, name) => {
    tree.forEach((item, index) => {
        if(item.id === id){
            tree[index].name = name;
        }else {
            if (item.children) {
                updateNodeName(item.children, id, name)
            }
        }
        return item;
    })
}
export { appendNodeInTree, removeNodeInTree,removeNodeAndSort,  updataTreeSort, findNodeById, replaceTree, updateNodeName };