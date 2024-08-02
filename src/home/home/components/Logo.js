import React from "react";
import { withRouter } from "react-router";
import { productWhiteImg, productWhitePureImg } from "thoughtware-core-ui";
import "./Logo.scss";

const Logo = (props) => {
    const { isShowText, theme } = props;
    const goHomePage = (router) => {
        props.history.push("/index/home")
        sessionStorage.setItem("menuKey", "home")
    }
    return <>
        {
            isShowText ? <div className='sward-logo-text' onClick={() => goHomePage()}>
                <img src={ theme === "default" ? productWhiteImg.sward :  productWhitePureImg.sward} alt={'logo'} className="logo-img" />
                <div className='logo-text' >sward</div>
            </div>
                :
                <div className='sward-logo' onClick={() => goHomePage()}>
                    <img src={theme === "default" ? productWhiteImg.sward :  productWhitePureImg.sward} alt={'logo'} className="logo-img" />
                </div>
        }
    </>


}

export default withRouter(Logo);