import React from "react";
import "./FirstMenu.scss";
import { withRouter } from "react-router";
import Logo from "./Logo";

const FirstMenu = (props) => {
    console.log(sessionStorage.getItem("menuKey"))
    const menuKey = (sessionStorage.getItem("menuKey") && props.location.pathname !== "/index") ? sessionStorage.getItem("menuKey") : "home";
    /**
         * 点击菜单跳转
         * @param {菜单信息} item 
         */
    const changeCurrentLink = item => {
        localStorage.removeItem("sprintId")
        props.history.push(item.to)
        sessionStorage.setItem("menuKey", item.key)
    }

    const routers = [
        {
            to: '/index',
            title: '首页',
            key: 'home',
            icon: "home-grey",
            actionIcon: "home-blue"
        },
        {
            to: '/repository',
            title: '知识库',
            key: 'repository',
            icon: "repository-grey",
            actionIcon: "repository-blue"
        },
        {
            to: '/collect',
            title: '收藏',
            key: 'setting',
            icon: "focus-grey",
            actionIcon: "focus-blue"
        }
    ]

    /**
     * 渲染左侧菜单
     * @returns 
     */
    const renderRouter = () => {
        if (routers) {
            return (
                <div className={'first-menu-link'}>
                    {
                        routers.map(item => {
                            return <div key={item.key}
                                onClick={() => changeCurrentLink(item)}
                                className={`first-menu-link-item ${menuKey === item.key ? 'first-menu-link-active' : null}`}
                            >
                                {
                                    menuKey === item.key ? <svg className="svg-icon" aria-hidden="true">
                                        <use xlinkHref={`#icon-${item.actionIcon}`}></use>
                                    </svg>
                                        :
                                        <svg className="svg-icon" aria-hidden="true">
                                            <use xlinkHref={`#icon-${item.icon}`}></use>
                                        </svg>
                                }

                                <span>
                                    {item.title}
                                </span>

                            </div>
                        })
                    }
                </div>
            )
        }
    }

    /**
    * 跳转到系统设置
    */
    const goSet = () => {
        props.history.push("/setting/version")
        sessionStorage.setItem("menuKey", "set")
    };

    return (
        <div className="first-menu">
            <Logo />
            {renderRouter()}
            <div className="first-menu-bottom">
                <div className="first-set" data-title-right="设置" onClick={() => goSet()}>
                    <svg aria-hidden="true" className="svg-icon">
                        <use xlinkHref="#icon-iconsetsys"></use>
                    </svg>
                </div>
            </div>
        </div>
    )
}
export default withRouter(FirstMenu);