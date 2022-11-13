import React from "react";
import { classNames } from "./Utils";

function ButtonContent({ icon, text }) {
	return (
		<>
			{icon ?? ""} <span className={classNames("", text ? "ml-1" : "")}>{text ?? ""}</span>
		</>
	);
}

export default ButtonContent;
