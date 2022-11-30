import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProviderWrapper(props) {
	const [token, setToken] = useState(undefined);

	const getAccessToken = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		if (
			localStorage.getItem("spotify_access_token") &&
			localStorage.getItem("spotify_access_token") !== null
		) {
			return setToken(localStorage.getItem("spotify_access_token"));
		}

		if (urlParams.has("access_token")) {
			localStorage.setItem(
				"spotify_access_token",
				urlParams.get("access_token")
			);

			localStorage.setItem(
				"spotify_refresh_token",
				urlParams.get("refresh_token")
			);

			localStorage.setItem(
				"spotify_token_expires_in",
				urlParams.get("expires_in")
			);

			return setToken(urlParams.get("access_token"));
		}

		return false;
	};

	useEffect(() => {
		getAccessToken();
	}, []);

	return (
		<UserContext.Provider value={{ getAccessToken }}>
			{props.children}
		</UserContext.Provider>
	);
}

export { UserContext, UserProviderWrapper };
