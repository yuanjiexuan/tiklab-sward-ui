/*
 * @Descripttion: 敏捷开发项目详情页面左侧导航栏
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-16 10:58:01
 */

import React, { Fragment, useState, useEffect, useRef } from 'react';
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import RepositoryChangeModal from "./RepositoryChangeModal";
import RepositoryAside from '../../../common/repositoryAside/RepositoryAside';

const ProjectDetailAside = (props) => {
    const { isShowText, SetIsShowText  } = props;
    const theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "default";
    const repositoryId = props.match.params.repositoryId;
    //语言包
    const { t, i18n } = useTranslation();
    // 项目id
    // 菜单的形式，宽菜单，窄菜单

    // 当前选中菜单key
    const path = props.location.pathname.split("/")[3];
    // 路由
    const router = [
        {
            title: "概况",
            icon: 'survey-' + theme,
            defaultIcon: "survey-default",
            id: `/repository/${repositoryId}/overview`,
            key: "overview",
            encoded: "Survey"
        },
        {
            title: "文档",
            icon: 'doc-' + theme,
            defaultIcon: "doc-default",
            id: `/repository/${repositoryId}/doc`,
            key: "doc",
            encoded: "doc"
        },
        {   
            title: '收藏',
            icon: 'focus-' + theme,
            defaultIcon: "focus-default",
            id: `/repository/${repositoryId}/collect`,
            key: 'collect',
            encoded: "focus"
        }
    ];


 


    return (
        <Fragment>
            <RepositoryAside
                isShowText={isShowText}
                SetIsShowText={SetIsShowText}
                ChangeModal={RepositoryChangeModal}
                initRouters={router}
                backName = {"返回首页"}
                path={path}
                setUrl = {`/repository/${repositoryId}/set/basicInfo`}
                backUrl = {`/repository`}
            />

        </Fragment>
    )

}
export default withRouter(ProjectDetailAside);