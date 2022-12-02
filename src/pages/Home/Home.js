import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";

import { getOneCategory } from "../../utils";

function Home() {
	// Make a state variable for the category playlists that will be displayed
	const [category, setCategory] = useState([]);
	const [loading, setLoading] = useState(true);
	const { logout } = useContext(UserContext);
	const [error, setError] = useState("");

	const token = localStorage.getItem("spotify_access_token");

	// Call function to get category playlists
	async function getItems() {
		try {
			const { data } = await getOneCategory();
			// Set the category state to the response
			setCategory(data);

			setLoading(false);
		} catch {
			setError("something went wrong");
		}
	}

	useEffect(() => {
		if (!token) {
			window.location.reload();
		}

		getItems();
	}, []);

	console.log(category);

	return (
		<div>
			{loading && <p>loading...</p>}
			{!loading && (
				<div>
					<p>this is the home page</p>
					<button onClick={() => logout()}>logout</button>
				</div>
			)}
		</div>
	);
}

export default Home;
