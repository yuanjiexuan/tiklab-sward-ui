/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-06-01 14:44:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-25 10:09:01
 */

const setDevRouter = [
    {
        title: "用户与权限",
        icon: 'systemuser',
        id: '/setting/orga',
        purviewCode: "orga",
        code: 1,
        children: [
            
            {
                title: '用户',
                id: '/setting/user',
                easId: '/user/user',
                purviewCode: "user",
                islink: true,
                code: 1 - 2,
            },
            {
                title: "部门",
                id: '/setting/orga',
                easId: '/user/orga',
                purviewCode: "orga",
                islink: true,
                code: 1 - 1,

            },
            {
                title: '用户组',
                id: '/setting/userGroup',
                easId: '/user/userGroup',
                purviewCode: "user_group",
                islink: true,
                code: 1-3,
            },
            {

                title: "用户目录",
                id: '/setting/dir',
                easId: '/user/dir',
                purviewCode: "user_dir",
                islink: true,
                code: 1 - 4,
            },
            {
                title: '权限',
                id: "/setting/systemRole",
                purviewCode: "SysPermission",
                code: 2
            },
        ]
    },
    {
        title: "消息",
        icon: 'systemmessage',
        id: '/setting/messageNotice',
        purviewCode: "SysMessage",
        code: 4,
        children: [
            {
                title: "消息通知方案",
                id: '/setting/messageNotice',
                purviewCode: "SysMessageNotice",
                code: 4 - 1
            },
            {
                title: '消息发送方式',
                id: '/setting/messageSendType',
                purviewCode: "SysMessageSendType",
                code: 4 - 2,
            }
        ]
    },
    {
        title: "系统集成",
        icon: 'systemIntergrtion',
        id: '/setting/loadData',
        code: 9,
        children: [
            {
                title: '地址配置',
                id: '/setting/urlData',
                code: 9-1,
            },
            {
                title: 'Confluence导入',
                id: '/setting/loadData',
                code: 9-2,
            }
        ]
    },
    {
        title: "安全",
        icon: 'systemlog',
        id: '/setting/log',
        // purviewCode: "SysLog",
        code: 10,
        children: [
            {
                title: '操作日志',
                id: '/setting/log',
                code: 10 - 1,
            },
            {
                title: '备份与恢复',
                id: '/setting/backup',
                code: 10 - 2,
            }
        ]
    },

    {
        title: "应用",
        icon: 'systemversion',
        id: '/setting/version',
        icon: 'systemversion',
        code: 11,
        children: [
            {
                title: '版本与许可证',
                id: "/setting/version",
                code: 11 - 1,
            },
            {
                title: '应用访问权限',
                id: "/setting/productAuth",
                code: 11 - 2,
            }
        ]
    },
    {
        title: '归档',
        icon: 'systemreset',
        id: '/setting/archived',
        code: "recycle",
        iseEnhance: true
    },
    {
        title: '回收站',
        icon: 'systemrecycle',
        id: '/setting/recycle',
        code: "recycle",
        iseEnhance: true
    },
    {
        title: "基础数据",
        icon: 'systemcenter',
        id: '/setting/systemFeature',
        code: 12,
        children: [
            {
                title: '模板',
                id: "/setting/template",
                code: 12 - 1,
            },
            {
                title: '用户组',
                id: '/setting/usersystemgroup',
                purviewCode: "user_group",
                code: 12 - 18,
            },
            {
                title: '虚拟角色',
                id: '/setting/virtual',
                code: "virtual",
            },
            {
                title: '系统功能',
                id: '/setting/systemFeature',
                purviewCode: "SysFeatrueSys",
                code: 12 - 3,
            },
            {
                title: '系统角色',
                id: '/setting/systemRoleBuilt',
                purviewCode: "SysRoleSys",
                code: 12 - 4,
            },
            {
                title: '项目功能',
                id: '/setting/projectFeature',
                purviewCode: "SysFeatrueProject",
                code: 12 - 5,
            },
            {
                title: '项目角色',
                id: '/setting/projectRole',
                purviewCode: "SysRoleProject",
                code: 12 - 6
            },
            {
                title: '消息通知方式',
                id: '/setting/messageNoticeSystem',
                purviewCode: "SysMessageNotice",
                code: 12 - 7,
            },
            {
                title: '项目消息通知方式',
                id: '/setting/projectMessageNotice',
                purviewCode: "SysMessageType",
                code: 12 - 8,
            },
            {
                title: '消息类型',
                id: '/setting/messageType',
                purviewCode: "SysMessageType",
                code: "messageType",
            },

            {
                title: '日志模板',
                id: '/setting/myLogTemplateList',
                // purviewCode: "SysLogTemplate",
                code: 12 - 10,
            },
            {
                title: '日志类型',
                id: '/setting/projectLogTypeList',
                // purviewCode: "SysLogType",
                code: 12 - 11,
            },
            {
                title: '待办模板',
                id: '/setting/todoTempList',
                purviewCode: "SysSetting",
                code: 12 - 12,
            },
            {
                title: '待办类型',
                id: '/setting/todoTypeTask',
                purviewCode: "SysSetting",
                code: 12 - 13,
            }
        ]
    }
];

const setPrdRouter = [
    {
        title: "用户与权限",
        icon: 'systemuser',
        id: '/setting/orga',
        purviewCode: "orga",
        code: 1,
        children: [
            
            {
                title: '用户',
                id: '/setting/user',
                easId: '/user/user',
                purviewCode: "user",
                islink: true,
                code: 1 - 2,
            },
            {
                title: "部门",
                id: '/setting/orga',
                easId: '/user/orga',
                purviewCode: "orga",
                islink: true,
                code: 1 - 1,

            },
            {
                title: '用户组',
                id: '/setting/userGroup',
                easId: '/user/userGroup',
                purviewCode: "user_group",
                islink: true,
                code: 1 - 3,
            },
            {

                title: "用户目录",
                id: '/setting/dir',
                easId: '/user/dir',
                purviewCode: "user_dir",
                islink: true,
                code: 1 - 4,
            },
            {
                title: '权限',
                id: "/setting/systemRole",
                purviewCode: "SysPermission",
                code: 2
            },
        ]
    },
    {
        title: "消息",
        icon: 'systemmessage',
        id: '/setting/messageNotice',
        purviewCode: "SysMessage",
        code: 4,
        children: [
            {
                title: "消息通知方案",
                id: '/setting/messageNotice',
                purviewCode: "SysMessageNotice",
                code: 4 - 1
            },
            {
                title: '消息发送方式',
                id: '/setting/messageSendType',
                purviewCode: "SysMessageSendType",
                code: 4 - 2,
            }
        ]
    },
    {
        title: "系统集成",
        icon: 'systemIntergrtion',
        id: '/setting/loadData',
        code: 9,
        children: [
            {
                title: '地址配置',
                id: '/setting/urlData',
                code: 9 - 1,
            }
        ]
    },
    {
        title: "安全",
        icon: 'systemlog',
        id: '/setting/log',
        // purviewCode: "SysLog",
        code: 10,
        children: [
            {
                title: '操作日志',
                id: '/setting/log',
                code: 10 - 1,
            },
            {
                title: '备份与恢复',
                id: '/setting/backup',
                code: 10 - 2,
            }
        ]
    },
    {
        title: "应用",
        icon: 'systemversion',
        id: '/setting/version',
        icon: 'systemversion',
        code: 11,
        children: [
            {
                title: '版本与许可证',
                id: "/setting/version",
                code: 11 - 1,
            },
            {
                title: '应用访问权限',
                id: "/setting/productAuth",
                code: 11 - 2,
            }
        ]
    },
    {
        title: '归档',
        icon: 'systemreset',
        id: '/setting/archived',
        code: "recycle",
        iseEnhance: true
    },
    {
        title: '回收站',
        icon: 'systemdelete',
        id: '/setting/recycle',
        code: "recycle",
        iseEnhance: true
    },
];

export { setDevRouter, setPrdRouter };