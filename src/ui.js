/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-05-28 15:09:43
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-06-02 14:32:29
 */

import wikiRoutes from "./Routers";
import {store} from "./stores"
import Header from "./home/home/components/Header";
import FirstMenu from "./home/home/components/FirstMenu";
import Search from "./home/search/components/Search";
import RepositoryLayout from "./repository/common/components/RepositoryLayout";
import BasicInfo from "./repository/setting/basicInfo/components/BasicInfo";
import Layout from "./home/home/components/Layout";
import ArchivedFree from "./common/components/ArchivedFree";
import HeaderCe from "./home/home/components/HeaderCe";
import Logo from "./home/home/components/Logo";
import RepositoryDoc from "./repository/document/components/RepositoryDoc";
import SettingHomeStore from "./setting/home/store/SettingHomeStore";
import SettingHome from "./setting/home/components/SettingHome";
export {
    wikiRoutes,
    store,
    Header,
    Search,
    RepositoryLayout, 
    BasicInfo,
    Layout,
    ArchivedFree,
    FirstMenu,
    HeaderCe,
    Logo,
    RepositoryDoc, 
    SettingHomeStore,
    SettingHome
}