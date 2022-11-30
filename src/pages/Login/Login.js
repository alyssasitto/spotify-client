import axios from "axios";

const API_URL = "http://localhost:5005";

function Login() {
	return (
		<div>
			<a href={`${API_URL}/login`}>Login</a>
		</div>
	);
}

export default Login;
