import React from "react";
import { classNames } from "./Utils";

export function Button({ children, className, ...rest }) {
	return (
		<button
			type="button"
			className={classNames("p-1 px-3 rounded-md ease-in-out transition duration-300", className)}
			{...rest}
		>
			{children}
		</button>
	);
}
