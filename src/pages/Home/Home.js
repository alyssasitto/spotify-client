import { useContext } from "react";
import { UserContext } from "../../context/user.context";

function Home() {
	const { logout } = useContext(UserContext);
	return (
		<div>
			<p>this is the home page</p>
			<button onClick={() => logout()}>logout</button>
		</div>
	);
}

export default Home;
