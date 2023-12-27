import React from "react";
import {DomainMessageNotice} from "thoughtware-message-ui";

/**
 * 项目域消息通知方案
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DomainMessageNoticeContent = props =>{
    const repositoryId = props.match.params.repositoryId;
    return (
        <DomainMessageNotice
            {...props}
            domainId={repositoryId}  // 项目id
            bgroup={"sward"} // 产品code
        />
    )

}

export default DomainMessageNoticeContent
