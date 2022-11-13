import { CubeIcon, TvIcon } from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";

const routerList = [
	{
		link: "/",
		name: "Dashboard",
		icon: <TvIcon className="h-4 w-4 mr-2" />,
	},
	{
		link: "/products",
		name: "Products",
		icon: <CubeIcon className="h-4 w-4 mr-2" />,
	},
];

function Sidebar() {
	return (
		<nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 hidden">
			<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
				<div className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden">
					<h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
						WaveTech Electronics
					</h6>
					<ul className="md:flex-col md:min-w-full flex flex-col list-none">
						{routerList.map((router, i) => {
							return (
								<li key={i} className="items-center">
									<NavLink
										className={({ isActive }) =>
											`text-xs uppercase py-3 font-bold ${
												isActive ? "text-slate-700" : "text-slate-500"
											} hover:text-slate-600 flex`
										}
										to={router.link}
									>
										{router.icon}
										{router.name.toUpperCase()}
									</NavLink>
								</li>
							);
						})}
					</ul>
					<hr className="my-4 md:min-w-full"></hr>
				</div>
			</div>
		</nav>
	);
}

export default Sidebar;
