import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user.context";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";

import IsLoggedIn from "./components/IsLoggedIn/IsLoggedIn";
import IsLoggedOut from "./components/IsLoggedOut/IsLoggedOut";

require("./index.css");

function App() {
	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={
						<IsLoggedOut>
							<Login />
						</IsLoggedOut>
					}
				></Route>
				<Route
					path="/home"
					element={
						<IsLoggedIn>
							<Home />
						</IsLoggedIn>
					}
				></Route>

				<Route path="*" element={<Error />}></Route>
			</Routes>
		</div>
	);
}

export default App;
