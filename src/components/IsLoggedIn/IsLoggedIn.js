import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { Navigate } from "react-router-dom";

function IsLoggedIn({ children }) {
	// const { token } = useContext(UserContext);
	const token = localStorage.getItem("spotify_access_token");

	// Check if there's a token, if there is then return the children. If not redirect to the login page
	if (token) {
		return children;
	} else {
		return <Navigate to={"/"} />;
	}
}

export default IsLoggedIn;
