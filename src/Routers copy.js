/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-26 08:59:04
 */
import React from 'react';
import AsyncComponent from './common/lazy/SyncComponent.js'
import { Redirect } from "react-router-dom";

const Login = AsyncComponent(() => import('./login/Login.js'))
const Logout = AsyncComponent(() => import('./login/Logout.js'))
const Home = AsyncComponent(() => import('./home/home/components/Home.js'))
const ProjectNotFound = AsyncComponent(() => import("./setting/common/components/ProjectNotFond.js"))

// 收藏
const Collect = AsyncComponent(() => import("./home/collect/components/Collect"))

const NoFoundPage = AsyncComponent(() => import('./login/NoFoundPage.js'));
const NoAccessPage = AsyncComponent(() => import('./login/SystemNoAccessPage.js'));
const ProjectNoAccessPage = AsyncComponent(() => import('./login/ProjectNoAccessPage.js'));
const ExcludeProductUserContent = AsyncComponent(() => import('./login/ExcludeProductUserPage.js'))

const Index = AsyncComponent(() => import('./home/home/components/Layout.js'))
const RepositoryDetail = AsyncComponent(() => import('./repository/common/components/RepositoryLayout.js'))
const Survey = AsyncComponent(() => import('./repository/overview/components/Survey.js'))
const DynamicList = AsyncComponent(() => import("./repository/overview/components/DynamicList.js"))
const FocusDocumentList = AsyncComponent(() => import("./home/home/components/FocusDocumentList.js"))
const LogDetail = AsyncComponent(() => import('./repository/category/CategoryDetail.js'))


// 知识库
const Repository = AsyncComponent(() => import('./repository/repository/components/RepositoryList.js'))
const RepositoryAdd = AsyncComponent(() => import('./repository/repository/components/RepositoryAdd.js'))
const DocumentEdit = AsyncComponent(() => import("./document/document/components/DocumentEdit.js"))
const DocumnetExamine = AsyncComponent(() => import("./document/document/components/DocumnetExamine.js"))

const MarkdownDocumentEdit = AsyncComponent(() => import("./document/markdown/components/markdownEdit.js"))
const MarkdownDocumentView = AsyncComponent(() => import("./document/markdown/components/markdownView.js"))

const RepositorySet = AsyncComponent(() => import("./repository/setting/common/components/RepositorySet.js"))
const RepositoryDomainRole = AsyncComponent(() => import('./repository/user/RepositoryDomainRole.js'))
const RepositoryDomainUser = AsyncComponent(() => import('./repository/user/RepositoryDomainUser.js'))
const RepositoryBasicInfo = AsyncComponent(() => import('./repository/setting/basicInfo/components/BasicInfo.js'))

// 归档
const Template = AsyncComponent(() => import('./setting/template/components/TemplateList.js'))
const TemplateEdit = AsyncComponent(() => import('./setting/template/components/TemplateEdit.js'))
const TemplatePreview = AsyncComponent(() => import('./setting/template/components/TemplatePreview.js'))
// 分享文档页面
const ShareDocument = AsyncComponent(() => import('./document/share/components/ShareDocument.js'))
const SharePage = AsyncComponent(()=> import('./document/share/components/ShareLayout.js'))
const ShareCategory = AsyncComponent(() => import('./document/share/components/PassWord.js'))
const ShareCategoryDetail = AsyncComponent(() => import('./document/share/components/ShareCategoryDetail.js'))
const ShareMarkdown = AsyncComponent(() => import("./document/share/components/ShareMarkdown.js"))
// 分享文档页面
const PassWord = AsyncComponent(() => import('./document/share/components/PassWord.js'))

const SettingHome = AsyncComponent(() => import('./setting/home/components/SettingHome.js'))
const LoadData = AsyncComponent(() => import('./setting/loadData/LoadData.js'))
// 消息
const SystemMessageSendType = AsyncComponent(() => import('./setting/message/SystemMessageSendType.js'))
const SystemMessageType = AsyncComponent(() => import('./setting/message/SystemMessageType.js'))
const SystemMessageTemplate = AsyncComponent(() => import('./setting/message/SystemMessageTemplate.js'))
const SystemMessageNotice = AsyncComponent(() => import('./setting/message/SystemMessageNotice.js'))
const SystemMessageNoticeBase = AsyncComponent(() => import('./setting/message/SystemMessageNoticeBase.js'))
const ProjectMessageNoticeContent = AsyncComponent(() => import("./setting/message/ProjectMessageNoticeContent.js"))
const DomainMessageNoticeContent = AsyncComponent(() => import("./repository/setting/projectMessage/DomainMessageNoticeContent.js"))

const Setting = AsyncComponent(() => import('./setting/common/components/Setting.js'))

const SystemFeature = AsyncComponent(() => import('./setting/privilege/SystemFeature.js'))
const SystemRoleBuilt = AsyncComponent(() => import('./setting/privilege/SystemRoleBuilt.js'))
const SystemRole = AsyncComponent(() => import('./setting/privilege/SystemRole.js'))
const ProjectFeature = AsyncComponent(() => import('./setting/privilege/ProjectFeature.js'))
const ProjectRole = AsyncComponent(() => import('./setting/privilege/ProjectRole.js'))

//组织用户
const OrgaContent = AsyncComponent(() => import('./setting/orga/Orga.js'))
const OrgaUser = AsyncComponent(() => import('./setting/orga/User.js'))
const ProjectDirectory = AsyncComponent(() => import("./setting/user/ProjectDirectory.js"))
const ProjectUserGroup = AsyncComponent(() => import("./setting/user/ProjectUserGroup.js"))
const ProjectSystemUserGroup = AsyncComponent(() => import("./setting/user/ProjectSystemUserGroup.js"))
const ProjectVirtualRoleList = AsyncComponent(() => import("./setting/user/ProjectVirtualRoleList.js"))
// 系统集成
const UrlData = AsyncComponent(() => import('./setting/systemIntegration/components/UrlData.js'));

//工时
const TaskListContent = AsyncComponent(() => import('./setting/todo/TaskList.js'))
const TodoTempListContent = AsyncComponent(() => import('./setting/todo/TodoTempList.js'))
const MyTodoTaskContent = AsyncComponent(() => import('./setting/todo/MyTodoTask.js'))
const TodoTypeListContent = AsyncComponent(() => import('./setting/todo/TodoTypeList.js'))

const LogList = AsyncComponent(() => import('./setting/log/Log.js'))
const LogTemplateList = AsyncComponent(() => import('./setting/log/MyLogTemplateList.js'))
const ProjectLogTypeList = AsyncComponent(() => import('./setting/log/LogTypeList.js'))

const LicenceVersion = AsyncComponent(() => import('./setting/version/Version.js'))
const LicenceProductAuth = AsyncComponent(() => import('./setting/version/Product.js'))
const VailProductUserPage =  AsyncComponent(() => import('./login/VaildProductUserPage.js'))
const BackupRecoveryContent = AsyncComponent(() => import('./setting/backups/Backups.js'))
const Dnd = AsyncComponent(() => import("./repository/common/components/dnd.js"))

const Routes = [
    {
        path: "/login",
        exact: true,
        component: Login,
    },
    {
        path: "/Dnd",
        exact: true,
        component: Dnd,
    },
    {
        path: "/logout",
        exact: true,
        component: Logout,
    },
    {
        path: "/noAuth",
        exact: true,
        component: ExcludeProductUserContent,
    },
    {
        exact: true,
        path: '/404',
        component: NoFoundPage,
    },
    {
        exact: true,
        path: '/noaccess',
        component: NoAccessPage,
    },
    {
        path: "/share/:shareId",
        component: SharePage,
        routes: [
              {
                    path: "/share/:shareId/doc/:id",
                    component: ShareDocument,
                },
                {
                    path: "/share/:shareId/category/:id",
                    component: ShareCategoryDetail,
                },
                {
                    path: "/share/:shareId/markdown/:id",
                    component: ShareMarkdown,
                },
                {
                    path: "/share/:shareId/markdownView/:id",
                    component: ShareMarkdown,
                },
                
        ]
    },
    {
        path: "/passWord/:shareId",
        exact: true,
        component: PassWord,
    },
    {
        path: "/",
        component: () => <Redirect to="/index/home" />,
        exact: true,
    },
    {
        path: "/index",
        component: Index,
        routes: [
            {
                path: "/index/home",
                exact: true,
                component: Home,
                key: 'home'
            },
            {
                path: "/index/focusDocumentList",
                exact: true,
                component: FocusDocumentList,
                key: 'focusDocumentList'
            },
            {
                path: "/index/404",
                exact: true,
                component: ProjectNotFound,
                key: 'NotFound'
            },
            {
                path: "/index/repository",
                exact: true,
                component: Repository,
                key: 'repository'

            },
            {
                path: "/index/repositoryAdd",
                exact: true,
                component: RepositoryAdd,
                key: 'home'
            },
            {
                path: "/index/template",
                exact: true,
                component: Template,
                key: 'template'
            },
            {
                path: "/index/repositorydetail/:repositoryId",
                component: RepositoryDetail,
                routes: [
                    {   
                        path: "/index/repositorydetail/:id/noAccess",
                        exact: true,
                        component: ProjectNoAccessPage
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/survey",
                        component: Survey
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/dynamicList",
                        component: DynamicList
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/focusDocumentList",
                        component: FocusDocumentList
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/doc/:id",
                        component: DocumnetExamine
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/docEdit/:id",
                        component: DocumentEdit
                    },

                    {
                        path: "/index/repositorydetail/:repositoryId/docEdit/:id",
                        component: DocumentEdit
                    },

                    {
                        path: "/index/repositorydetail/:repositoryId/markdownEdit/:id",
                        component: MarkdownDocumentEdit
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/markdownView/:id",
                        component: MarkdownDocumentView
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/folder/:id",
                        component: LogDetail
                    },
                    {
                        path: "/index/repositorydetail/:repositoryId/repositorySet",
                        component: RepositorySet,
                        routes: [
                            {
                                path: "/index/repositorydetail/:repositoryId/repositorySet/basicInfo",
                                component: RepositoryBasicInfo
                            },
                            {
                                path: "/index/repositorydetail/:repositoryId/repositorySet/user",
                                component: RepositoryDomainUser,
                                exact: true
                            },
                            {
                                path: "/index/repositorydetail/:repositoryId/repositorySet/domainRole",
                                component: RepositoryDomainRole
                            },
                            {
                                path: "/index/repositorydetail/:repositoryId/repositorySet/messagenotice",
                                component: DomainMessageNoticeContent,
                            }
                        ]
                    },
                    
                ]
            },
            {
                path: "/index/repositorySet/:repositoryId",
                component: RepositorySet,
                routes: [
                    {
                        path: "/index/repositorySet/:repositoryId/basicInfo",
                        component: RepositoryBasicInfo
                    },
                    {
                        path: "/index/repositorySet/:repositoryId/user",
                        component: RepositoryDomainUser,
                        exact: true
                    },
                    {
                        path: "/index/repositorySet/:repositoryId/domainRole",
                        component: RepositoryDomainRole
                    },
                    {
                        path: "/index/repositorySet/:repositoryId/messagenotice",
                        component: DomainMessageNoticeContent,
                    }
                ]
            },
            {
                path: "/index/collect",
                exact: true,
                component: Collect,
                key: 'collect'
            },
            
        ]
    },
    {
        path: "/setting",
        component: Setting,
        key: 'Setting',
        routes: [
            
            {
                path: "/setting/home",
                component: SettingHome,
                row: true,
                exact: true
            },
            {
                path: "/setting/orga",
                component: OrgaContent,
                row: true,
                exact: true
            },
            {
                path: "/setting/template",
                exact: true,
                component: Template,
                key: 'template'
            },
            {
                path: "/setting/templateAdd",
                component: TemplateEdit,
                exact: true
            },
            {
                path: "/setting/templateView/:templateId",
                component: TemplatePreview,
                exact: true
            },
            {
                path: "/setting/templateAdd/:templateId",
                component: TemplateEdit,
                exact: true
            },
            {
                path: "/setting/user",
                component: OrgaUser,
                exact: true
            },
            {
                path: "/setting/dir",
                component: ProjectDirectory,
                exact: true
            },
            {
                path: "/setting/userGroup",
                component: ProjectUserGroup,
                exact: true
            },
            {
                path: "/setting/usersystemgroup",
                component: ProjectSystemUserGroup,
                exact: true
            },
            {
                path: "/setting/virtual",
                component: ProjectVirtualRoleList,
                exact: true
            },
            // 系统功能管理
            {
                path: "/setting/systemFeature",
                component: SystemFeature,
                exact: true
            },
            // 系统内置角色管理
            {
                path: "/setting/systemRoleBuilt",
                component: SystemRoleBuilt,
                exact: true
            },
            // 系统角色管理
            {
                path: "/setting/systemRole",
                component: SystemRole,
                exact: true
            },
            // 项目功能管理
            {
                path: "/setting/projectFeature",
                component: ProjectFeature,
                exact: true
            },
            // 项目角色管理
            {
                path: "/setting/projectRole",
                component: ProjectRole,
                exact: true
            },
            {
                path: "/setting/messageNotice",
                component: SystemMessageNotice,
                row: true,
                exact: true
            },
            {
                path: "/setting/messageNoticeSystem",
                component: SystemMessageNoticeBase,
                row: true,
                exact: true
            },
            {
                path: "/setting/projectMessageNotice",
                component: ProjectMessageNoticeContent,
                row: true,
                exact: true
            },
            
            {
                path: "/setting/messageTemplate",
                component: SystemMessageTemplate,
                row: true,
                exact: true
            },
            {
                path: "/setting/messageType",
                component: SystemMessageType,
                row: true,
                exact: true
            },
            {
                path: "/setting/messageSendType",
                component: SystemMessageSendType,
                row: true,
                exact: true
            },

            {
                path: "/setting/taskList",
                component: TaskListContent,
                exact: true
            },
            {
                path: "/setting/myTodoTask",
                component: MyTodoTaskContent,
                exact: true
            },
            {
                path: "/setting/todoTypeTask",
                component: TodoTypeListContent,
                exact: true
            },
            {
                path: "/setting/todoTempList",
                component: TodoTempListContent,
                exact: true
            },
            {
                path: "/setting/log",
                component: LogList,
                exact: true
            },
            {
                path: "/setting/myLogTemplateList",
                component: LogTemplateList,
                exact: true
            },
            {
                path: "/setting/projectLogTypeList",
                component: ProjectLogTypeList,
                exact: true
            },
            {
                path: "/setting/loadData",
                component: LoadData,
                exact: true
            },
            {
                path: "/setting/urlData",
                component: UrlData,
                exact: true
            },
            {
                path: "/setting/version",
                component: LicenceVersion,
                exact: true
            },
            {
                path: "/setting/productAuth",
                component: LicenceProductAuth,
                exact: true
            },
            {
                path: "/setting/backup",
                component: BackupRecoveryContent,
                exact: true
            }
        ]
    },
]
export default Routes;