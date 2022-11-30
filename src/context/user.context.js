import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

function UserProviderWrapper(props) {
	const [token, setToken] = useState(undefined);

	const logout = () => {
		localStorage.removeItem("spotify_access_token");
		localStorage.removeItem("spotify_refresh_token");
		localStorage.removeItem("spotify_token_expires_in");
		localStorage.removeItem("spotify_token_timestamp");

		setToken(undefined);
	};

	// Function for getting the access token from api
	const getAccessToken = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		// Check if theres a token in local storage. If theres is and its not equal to null use that token
		if (
			localStorage.getItem("spotify_access_token") &&
			localStorage.getItem("spotify_access_token") !== null
		) {
			return setToken(localStorage.getItem("spotify_access_token"));
		}

		// If the current url has a "access_token" param the user is signing in for the first time
		if (urlParams.has("access_token")) {
			// Save the access token to local storage
			localStorage.setItem(
				"spotify_access_token",
				urlParams.get("access_token")
			);

			// Save the refresh token to local storage
			localStorage.setItem(
				"spotify_refresh_token",
				urlParams.get("refresh_token")
			);

			// Save the expires in time to local storage
			localStorage.setItem(
				"spotify_token_expires_in",
				urlParams.get("expires_in")
			);

			// Add a timestamp with the current time to comare to the expires in time to determine if the access token is expired
			localStorage.setItem("spotify_token_timestamp", Date.now());

			return setToken(urlParams.get("access_token"));
		}

		return false;
	};

	useEffect(() => {
		getAccessToken();
	}, [token]);

	return (
		<UserContext.Provider value={{ getAccessToken, logout, token }}>
			{props.children}
		</UserContext.Provider>
	);
}

export { UserContext, UserProviderWrapper };
