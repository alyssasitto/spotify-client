import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user.context";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Library from "./pages/Library/Library";
import Artist from "./pages/Artist/Artist";
import Error from "./pages/Error/Error";

import IsLoggedIn from "./components/IsLoggedIn/IsLoggedIn";
import IsLoggedOut from "./components/IsLoggedOut/IsLoggedOut";

require("./index.css");

function App() {
	return (
		<div className="app">
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

				<Route
					path="/search"
					element={
						<IsLoggedIn>
							<Search />
						</IsLoggedIn>
					}
				></Route>

				<Route
					path="/library"
					element={
						<IsLoggedIn>
							<Library />
						</IsLoggedIn>
					}
				></Route>

				<Route
					path="/artist/:artist"
					element={
						<IsLoggedIn>
							<Artist />
						</IsLoggedIn>
					}
				></Route>

				<Route path="*" element={<Error />}></Route>
			</Routes>
		</div>
	);
}

export default App;
