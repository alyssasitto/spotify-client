import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import Navbar from "../../components/Navbar/Navbar";

import {
	getCategories,
	getTopItems,
	getCategoryPlaylists,
	getPLaylistItems,
	getNewReleases,
} from "../../utils";
import HomeSlides from "../../components/HomeSlides/HomeSlides";

require("./Home.css");

const API_URL = "http://localhost:5005";

function Home() {
	// Make a state variable for the category playlists that will be displayed
	const [category, setCategory] = useState([]);
	const [topItems, setTopItems] = useState([]);
	const [playlist, setPlaylist] = useState([]);
	const [newReleases, setNewReleases] = useState([]);
	const [loading, setLoading] = useState(true);
	const { logout } = useContext(UserContext);
	const [error, setError] = useState("");

	const token = localStorage.getItem("spotify_access_token");

	// Call function to get category playlists
	async function getItems() {
		try {
			// Get new releases
			const newReleasesResult = await getNewReleases();
			setNewReleases(newReleasesResult.data.body.albums.items);

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

	console.log("NEW RELEASES", newReleases);

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
					<div>
						<div className="greeting">
							<h1>Good evening</h1>
							<button onClick={logout}>Logout</button>
							<img
								src="images/clock.png"
								alt="Clock icon"
								className="small-img"
							></img>
						</div>
					</div>

					<div className="top-items">
						{topItems &&
							topItems.body.items.slice(0, 6).map((el, index) => {
								return (
									<div key={index} className="top-item-container">
										<img src={el.album.images[0].url}></img>
										<p>{el.name}</p>
									</div>
								);
							})}
					</div>

					<HomeSlides albums={newReleases} />
				</div>
			)}
			<Navbar />
		</div>
	);
}

export default Home;
