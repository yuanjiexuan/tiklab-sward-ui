
import React, { useState } from "react";
import { Modal, Button } from 'antd';
import "./ArchivedFree.scss";
import nodeArchived from "../../assets/images/nodeArchived.png";
import nodeRecycle from "../../assets/images/nodeRecycle.png";
import repositoryArchived from "../../assets/images/repositoryArchived.png";
import repositoryRecycle from "../../assets/images/repositoryRecycle.png";
// import Button from "../../common/button/Button";
const ArchivedFree = (props) => {
    const { archivedFreeVisable, setArchivedFreeVisable } = props;
    const [imgUrl, setImgUrl] = useState(nodeArchived);
    const [activeImage, setActiveImage] = useState("nodeArchived");
    const goBuy = () => {
        if(version === "cloud"){
            window.open("https://work.thoughtware.cn/#/enterprise/application/sward")
        }else {
            window.open("https://thoughtware.cn/account/subscribe/apply/sward")
        }
    }
    const list = [
        {
            id: "nodeArchived",
            imgUrl: nodeArchived,
            title: "归档文档，目录"
        },
        {
            id: "nodeRecycle",
            imgUrl: nodeRecycle,
            title: "文档，目录回收站"
        },
        {
            id: "repositoryArchived",
            imgUrl: repositoryArchived,
            title: "归档知识库"
        },
        {
            id: "repositoryRecycle",
            imgUrl: repositoryRecycle,
            title: "知识库回收站"
        }
    ]

    const changeImage = (imgUrl, id) => {
        setImgUrl(imgUrl)
        setActiveImage(id)
    }
    return <Modal
        // title="甘特图"
        width={980}
        height={500}
        footer={null}
        visible={archivedFreeVisable}
        className="archived-free-modal"
        onCancel={() => setArchivedFreeVisable(false)}
    >
        <div className="archived-free">
            <div className="archived-free-introduce">
                <div className="archived-title">数据安全</div>
                <div className="archived-desc">
                    回收站，归档
                </div>

                <div className="archived-desc-box">
                    {
                        list.map(item => {
                            return <div className={`archived-desc-item ${item.id === activeImage ? 'archived-desc-active-item' : ''}`}
                                onClick={() => changeImage(item.imgUrl, item.id)}
                                onMouseEnter={() => changeImage(item.imgUrl, item.id)}
                                key={item.id}
                            >
                                <svg className="icon-14" aria-hidden="true">
                                    <use xlinkHref="#icon-radio"></use>
                                </svg>{item.title}
                            </div>
                        })
                    }
                </div>

                <Button type="primary" size={"middle"} block onClick={() => goBuy()}>
                    立即购买
                </Button>
            </div>
            <div className="archived-free-image">
                <div>
                    <img src={imgUrl} alt="" width={"100%"} />
                </div>
            </div>
        </div>
    </Modal>
}

export default ArchivedFree;