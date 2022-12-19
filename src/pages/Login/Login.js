import axios from "axios";

require("./Login.css");

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
	return (
		<div className="login-page">
			<img src="images/spotify-logo-white.png"></img>
			<a href={`${API_URL}/login`}>Login with spotify</a>
		</div>
	);
}

export default Login;
