import React, { Fragment, useEffect, useState, useRef } from "react";
import { SearchOutlined } from '@ant-design/icons';
import "../components/Search.scss"
import SearchStore from "../store/Search";
import { observer } from "mobx-react";
import { useDebounce, useThrottle } from "../../../common/utils/debounce";
import { getUser } from "thoughtware-core-ui";
import { Empty, Modal } from "antd";
import { withRouter } from "react-router";
const Search = (props) => {
    const { isShowText, theme } = props;

    const { getSearch, searchDocumentList, searchWikiList, getSearchSore, setKeyWord, findDocumentRecentList,
        findRecentRepositoryList } = SearchStore;
    const [searchModal, setSearchModal] = useState(false);

    const [show, setShow] = useState(false);
    const [isSeach, setIsSeach] = useState(false);
    const dropDown = useRef();
    const userId = getUser().id;
    const tenant = getUser().tenant;
    const inputRef = useRef();
    const [showLong, setShowLong] = useState(false)
    const searchBox = useRef();
    const findRecent = () => {
        const recentParams = {
            masterId: userId,
            model: "document",
            orderParams: [{
                name: "recentTime",
                orderType: "asc"
            }]
        }
        findDocumentRecentList(recentParams)
        findRecentRepositoryList({ model: "repository" })

    }

    useEffect(() => {
        if (searchModal) {
            findRecent()
        }
        return null;
    }, [searchModal])
    // 输入中
    const changeValue = (value) => {

        search(value)
    }

    // 防抖
    const search = useDebounce((value) => {
        const keyWord = value.target.value;
        if (keyWord) {
            getSearch(value.target.value)
            setIsSeach(true)
        } else {
            findRecent()
            setIsSeach(false)
        }
    }, 500)



    const toRepository = (repository) => {
        props.history.push(`/index/repositorydetail/${repository.id}/survey`)
        setSearchModal(false)
    }
    const toWorkItem = (id, repository) => {

        // localStorage.setItem("repository", repository.id)
        props.history.push(`/index/repositorydetail/${repository.id}/doc/${id}`)
        setSearchModal(false)
    }




    return (
        <div>
            {
                isShowText ?
                    <div className="search-text first-menu-text-item" onClick={() => setSearchModal(true)}>
                        <svg className="icon-18" aria-hidden="true">
                            <use xlinkHref={`#icon-search-${theme}`} ></use>
                        </svg>
                        <div>搜索</div>
                    </div>

                    :
                    <div className="first-menu-link-item" data-title-right="搜索" onClick={() => setSearchModal(true)}>
                        <svg className="icon-18" aria-hidden="true">
                            <use xlinkHref={`#icon-search-${theme}`} ></use>
                        </svg>
                    </div>

            }
            <div ref={searchBox}>
                <Modal
                    visible={searchModal}
                    cancelText="取消"
                    onOk={() => setSearchModal(false)}
                    onCancel={() => setSearchModal(false)}
                    okText="确定"
                    width={800}
                    footer={null}
                    className="search-modal"
                    getContainer={() => searchBox.current}
                    closable={false}
                >
                    <div className={`show-box `}>
                        <div className="search-input-box">

                            <svg className="icon-20" aria-hidden="true">
                                <use xlinkHref="#icon-searchtop" ></use>
                            </svg>
                            <input
                                className={`search-input`}
                                onChange={changeValue}
                                // onFocus={showBox}
                                // ref={inputRef}
                                placeholder="搜索文档，知识库"

                            />
                            <svg className="svg-icon close-icon" aria-hidden="true" onClick={() => setSearchModal(false)}>
                                <use xlinkHref="#icon-close"></use>
                            </svg>
                        </div>
                        {
                            isSeach ? <div className="search-result-box">
                                {
                                    (searchWikiList?.length !== 0 || searchDocumentList?.length !== 0) ? <Fragment>
                                        {
                                            searchWikiList.length > 0 && <div className="sort-box">
                                                <div className="sort-title">知识库</div>
                                                {
                                                    searchWikiList.map((wikiItem) => {
                                                        return <div className="item-box" key={wikiItem.id}>
                                                            <div className="item-one" onClick={() => toRepository(wikiItem)}>
                                                                <img
                                                                    src={version === "cloud" ? (upload_url + wikiItem.iconUrl + "?tenant=" + tenant) : (upload_url + wikiItem.iconUrl)}
                                                                    alt=""
                                                                />
                                                                <span>{wikiItem.name}</span>
                                                                <div className="item-desc">
                                                                    {wikiItem.createTime}
                                                                </div>
                                                            </div>


                                                        </div>
                                                    })
                                                }
                                            </div>
                                        }

                                        {
                                            searchDocumentList.length > 0 && <div className="sort-box">
                                                <div className="sort-title">文档</div>
                                                {
                                                    searchDocumentList.map((documentItem) => {
                                                        return <div className="item-box" key={documentItem.id}>
                                                            <div className="item-one" onClick={() => toWorkItem(documentItem.node.id, documentItem.node.wikiRepository)}>
                                                                <svg className="img-icon" aria-hidden="true">
                                                                    <use xlinkHref="#icon-file"></use>
                                                                </svg>
                                                                <span>{documentItem.node.name}</span>
                                                                <div className="item-desc">
                                                                    {documentItem.node.wikiRepository.name}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    })
                                                }
                                            </div>
                                        }

                                    </Fragment>
                                        :
                                        <Empty image="/images/nodata.png" description="暂时没有数据~" />
                                }
                            </div>
                                :
                                <div className="search-result-box">
                                    <div className="sort-box">
                                        <div className="sort-title">常用知识库</div>
                                        {
                                            searchWikiList.length > 0 ?
                                                <>
                                                    {
                                                        searchWikiList.map((wikiItem) => {
                                                            return <div className="item-box" key={wikiItem.id}>
                                                                <div className="item-one" onClick={() => toRepository(wikiItem)}>
                                                                    <img
                                                                        src={version === "cloud" ? (upload_url + wikiItem.iconUrl + "?tenant=" + tenant) : (upload_url + wikiItem.iconUrl)}
                                                                        alt=""
                                                                    />
                                                                    <span>{wikiItem.name}</span>
                                                                    <div className="item-desc">
                                                                        {wikiItem.createTime}
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        })
                                                    }
                                                </>

                                                :
                                                <Empty image="/images/nodata.png" description="暂时没有数据~" />
                                        }
                                    </div>
                                    <div className="sort-box">
                                        <div className="sort-title">最近查看文档</div>
                                        {
                                            searchDocumentList.length > 0 ? <>
                                                {
                                                    searchDocumentList.map((documentItem) => {
                                                        return <div className="item-box" key={documentItem.id}>
                                                            <div className="item-one" onClick={() => toWorkItem(documentItem.modelId, documentItem.wikiRepository)}>
                                                                <svg className="img-icon" aria-hidden="true">
                                                                    <use xlinkHref="#icon-file"></use>
                                                                </svg>
                                                                <span>{documentItem.name}</span>
                                                                <div className="item-desc">
                                                                    {documentItem.wikiRepository?.name}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    })
                                                }
                                            </>
                                                :
                                                <Empty image="/images/nodata.png" description="暂时没有数据~" />
                                        }
                                    </div>

                                </div>


                        }

                    </div>
                </Modal>


            </div>
        </div>
    )
}
export default withRouter(observer(Search));