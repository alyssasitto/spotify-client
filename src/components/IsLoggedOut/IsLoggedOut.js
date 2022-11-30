import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { Navigate } from "react-router-dom";

function IsLoggedOut({ children }) {
	const { token } = useContext(UserContext);

	// Check if there's no token, if there isn't return the children. If there is redirect to the home page
	if (!token) {
		return children;
	} else {
		return <Navigate to={"/home"} />;
	}
}

export default IsLoggedOut;
