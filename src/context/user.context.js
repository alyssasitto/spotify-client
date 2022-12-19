import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const API_URL = process.env.REACT_APP_API_URL;

function UserProviderWrapper(props) {
	const [token, setToken] = useState(undefined);

	// Function for logging out
	const logout = () => {
		localStorage.removeItem("spotify_access_token");
		localStorage.removeItem("spotify_refresh_token");
		localStorage.removeItem("spotify_token_expires_in");
		localStorage.removeItem("spotify_token_timestamp");
		localStorage.removeItem("device_id");
		localStorage.removeItem("time");
		localStorage.removeItem("top_items");
		localStorage.removeItem("new_releases");
		localStorage.removeItem("current_album");
		localStorage.removeItem("current_song");
		localStorage.removeItem("currently_playing");

		setToken(undefined);
		window.location.reload();
	};

	// Function for checking if the token has expired
	const hasTokenExpired = () => {
		if (
			localStorage.getItem("spotify_token_timestamp") &&
			localStorage.getItem("spotify_token_expires_in")
		) {
			const timestamp = localStorage.getItem("spotify_token_timestamp");
			const expires_in = localStorage.getItem("spotify_token_expires_in");

			// Get the time passed by subtracting the timestamp from the current time
			const timePassed = Date.now() - Number(timestamp);
			// Return true or false based on whether or not the time passed divided by 100 is greater than the expire time
			return timePassed / 100 > Number(expires_in);
		}
	};

	// Function for refreshing token
	const refreshToken = () => {
		if (
			!localStorage.getItem("spotify_refresh_token") ||
			localStorage.getItem("spotify_refresh_token") === "undefined"
		) {
			logout();
		} else {
			axios
				.get(`${API_URL}/refresh_token`, {
					headers: {
						refresh_token: localStorage.getItem("spotify_refresh_token"),
					},
				})
				.then((response) => {
					localStorage.setItem("spotify_access_token", response.data);
					localStorage.setItem("spotify_token_timestamp", Date.now());
					const date = new Date();
					const time = date.toLocaleTimeString();
					localStorage.setItem("time", time);

					window.location.reload();
				})
				.catch(() => {
					logout();
				});
		}
	};

	// Function for getting the access token from api
	const getAccessToken = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		// Check if theres an error param in the url, if the stored token is undefined, or if the hasTokenExpired() function returns false
		// If any of the conditions are true call the refreshToken() function
		const error = urlParams.get("error");

		if (error || hasTokenExpired()) {
			refreshToken();
		}

		// Check if theres a token in local storage. If theres is and its not equal to null use that token
		if (
			localStorage.getItem("spotify_access_token") &&
			localStorage.getItem("spotify_access_token") !== null
		) {
			return setToken(localStorage.getItem("spotify_access_token"));
		}

		// If the current url has a "access_token" param the user is signing in for the first time
		if (urlParams.get("access_token")) {
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

			// Save the time of signing in to local storage
			const date = new Date();
			const time = date.toLocaleTimeString();
			localStorage.setItem("time", time);

			// Add a timestamp with the current time to comare to the expires in time to determine if the access token is expired
			localStorage.setItem("spotify_token_timestamp", Date.now());

			return setToken(urlParams.get("access_token"));
		}

		// Return false if none of the conditions are met
		return false;
	};

	useEffect(() => {
		getAccessToken();
	}, []);

	return (
		<UserContext.Provider value={{ getAccessToken, logout, token }}>
			{props.children}
		</UserContext.Provider>
	);
}

export { UserContext, UserProviderWrapper };
