/*
 * @Descripttion: 系统头部
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2022-01-08 10:44:07
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 10:16:03
 */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { getUser } from 'thoughtware-core-ui';
import { observer, inject, Provider } from "mobx-react";
import Search from "../../search/components/Search";
import MessageList from "./MessageList";
import { productImg, productWhiteImg } from "thoughtware-core-ui";
import "./Header.scss";
import ProjectFeature from '../../../setting/version/ProjectFeature';
import HomeStore from '../store/HomeStore';
const Header = props => {
    const { systemRoleStore, AppLink, AvatarLink, HelpLink, SetIsShowText, isShowText } = props;
    
    // 登录者的信息
    const user = getUser();
    const store = {
        homeStore: HomeStore
    }
    useEffect(() => {
        if (user && user.userId) {
            systemRoleStore.getSystemPermissions(user.userId, "sward")
        }
        return;
    }, [])

    return (
        <Provider {...store}>
            <div className='frame-header'>
                <div className="frame-left">
                    <div className="frame-applink">
                        {
                            isShowText ? <svg className="img-25" aria-hidden="true" onClick={() => SetIsShowText(!isShowText)}>
                                <use xlinkHref="#icon-indentation-left"></use>
                            </svg>
                                :
                                <svg className="img-25" aria-hidden="true" onClick={() => SetIsShowText(!isShowText)}>
                                    <use xlinkHref="#icon-indentation-right"></use>
                                </svg>
                        }
                    </div>
                    {/* <div className='frame-menu-logo' onClick={() => props.history.push("/home")}>
                    <img src={productWhiteImg.sward} alt={'logo'} className="logo-img" />
                    <div className='logo-text'>sward</div>
                </div> */}
                </div>

                <div className='frame-header-search-wrap'></div>
                <div className={'frame-header-right'}>
                    <Search />
                    <MessageList />
                    <HelpLink />
                    <ProjectFeature />
                    <AppLink />
                    <AvatarLink {...props} />
                </div>
            </div>
        </Provider>

    )
}
export default withRouter(inject('systemRoleStore')(observer(Header)));