import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user.context";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

import IsLoggedIn from "./components/IsLoggedIn/IsLoggedIn";
import IsLoggedOut from "./components/IsLoggedOut/IsLoggedOut";

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
			</Routes>
		</div>
	);
}

export default App;
