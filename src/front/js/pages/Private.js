import React from "react";
import { Context } from "../store/appContext";

export function Private() {
	const { actions } = React.useContext(Context);

	const handleLogout = () => {
		actions.logout();
	};

	return (
		<div className="text-center">
			<h3 className="text-white">This is your private Dashboard</h3>
			<button className="btn btn-outline-danger mt-3" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
}
