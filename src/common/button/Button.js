import React from "react";

import "./Button.scss"
const Button = (props) => {
	const { buttonText, children, onClick, type, style, className } = props;

	return (
		<div onClick={onClick} style = {style} className={`project-botton ${type === "primary" ? "project-primary" : "project-dashed"} ${className}`}>
			{children}
			{buttonText}
		</div>

	)
}
export default Button;