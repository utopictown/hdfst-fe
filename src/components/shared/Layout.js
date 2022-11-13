import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children, title, linkTo }) {
	return (
		<div className="App">
			<Sidebar />
			<div className="relative md:ml-64 ">
				<Header title={title} linkTo={linkTo} />
				<main className="relative md:pt-32 pb-32 pt-12 pl-12 pr-12 bg-slate-100 h-screen">{children}</main>
			</div>
		</div>
	);
}

export default Layout;
