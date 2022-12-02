import axios from "axios";

require("./Login.css");

const API_URL = "http://localhost:5005";

function Login() {
	return (
		<div className="login-page">
			<img src="images/spotify-logo-white.png"></img>
			<a href={`${API_URL}/login`}>Login with spotify</a>
		</div>
	);
}

export default Login;
