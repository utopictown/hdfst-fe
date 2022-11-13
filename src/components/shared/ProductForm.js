import React from "react";
import { Button } from "./Button";

function ProductForm({ onSubmit, handleOnChange, errorData, data }) {
	return (
		<form className="p-8 bg-white rounded-md" onSubmit={onSubmit}>
			<div className="flex flex-col mb-8 text-slate-600">
				<label htmlFor="name">Product Name</label>
				<input
					defaultValue={data.name ?? ""}
					onChange={handleOnChange}
					name="name"
					id="name"
					className="border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
				/>
				{errorData.name ? <span className="text-red-500 text-sm">{errorData.name}</span> : ""}
			</div>
			<div className="flex flex-col mb-8 text-slate-600">
				<label htmlFor="description">Description</label>
				<textarea
					defaultValue={data.description ?? ""}
					rows={6}
					onChange={handleOnChange}
					name="description"
					id="description"
					className="border-b-2 focus-visible:outline-none focus-within:border-slate-700 transition duration-150"
				/>
				{errorData.description ? <span className="text-red-500 text-sm">{errorData.description}</span> : ""}
			</div>
			<Button type="submit" className={"text-white bg-blue-400 hover:bg-blue-500"}>
				Submit
			</Button>
		</form>
	);
}

export default ProductForm;
