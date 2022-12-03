import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import Navbar from "../../components/Navbar/Navbar";
import Slides from "../../components/Slides/Slides";
import { getCategories, getTopItems, getCategoryPlaylists } from "../../utils";

require("./Home.css");

const API_URL = "http://localhost:5005";

function Home() {
	// Make a state variable for the category playlists that will be displayed
	const [category, setCategory] = useState([]);
	const [topItems, setTopItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const { logout } = useContext(UserContext);
	const [error, setError] = useState("");

	const token = localStorage.getItem("spotify_access_token");

	// Call function to get category playlists
	async function getItems() {
		try {
			// Get one category
			const category = await getCategories(1);

			// Get the categories playlists
			const categoryPlaylists = await getCategoryPlaylists(
				category.data.body.categories.items[0].id
			);

			setCategory(categoryPlaylists);

			// Get users top items
			const items = await getTopItems();
			setTopItems(items.data);

			// After everything has been resolved set loading to false
			setLoading(false);
		} catch {
			setError("something went wrong");
		}
	}

	useEffect(() => {
		getItems();
	}, []);

	console.log("THE PLAYLISTS ===>", category);

	return (
		<div className="home-page">
			{loading && (
				<div>
					<p>loading...</p>
					<button onClick={() => logout()}>logout</button>
				</div>
			)}
			{!loading && (
				<div>
					<p>this is the home page</p>

					<button onClick={() => logout()}>logout</button>
				</div>
			)}
			<Navbar />
		</div>
	);
}

export default Home;
