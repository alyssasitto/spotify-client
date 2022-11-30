import { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/user.context";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
	const token = localStorage.getItem("access_token");
	const { getAccessToken } = useContext(UserContext);

	useEffect(() => {
		getAccessToken();
	}, []);
	return (
		<div>
			{token && (
				<div>
					<Home />
				</div>
			)}

			{!token && <Login />}
		</div>
	);
}

export default App;
