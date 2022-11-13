import React from "react";
import { Link } from "react-router-dom";

function Header({ title, linkTo }) {
	return (
		<nav className="bg-indigo-400 absolute top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 shadow-xl">
			<div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-8 px-4">
				<Link className="text-white text-sm uppercase lg:inline-block font-semibold" to={linkTo}>
					{title}
				</Link>
				<ul className="flex-col md:flex-row list-none items-center md:flex">
					<div className="items-center flex">
						<span className="md:w-10 md:h-10 w-6 h-6 text-sm text-white inline-flex items-center justify-center rounded-full">
							<img
								alt="profile"
								className="w-full rounded-full align-middle border-none shadow-lg"
								src="https://static.miraheze.org/hololivewiki/thumb/9/9b/Kobo_Kanaeru_-_Portrait_01.png/640px-Kobo_Kanaeru_-_Portrait_01.png"
							/>
						</span>
					</div>
				</ul>
			</div>
		</nav>
	);
}

export default Header;
