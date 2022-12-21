import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { useQuery } from "react-query";
import Navbar from "../../components/Navbar/Navbar";
import RecentSongs from "../../components/RecentSongs/RecentSongs";
import AlbumDetails from "../../components/AlbumDetails/AlbumDetails";
import { PlaybarContext } from "../../context/player.context";

import { getTopItems, getNewReleases, getRecentSongs } from "../../utils";
import HomeSlides from "../../components/HomeSlides/HomeSlides";

require("./Home.css");

function Home() {
	// Make a state variable for the category playlists that will be displayed

	const [topItems, setTopItems] = useState(
		localStorage.getItem("top_items")
			? JSON.parse(localStorage.getItem("top_items"))
			: []
	);
	const [newReleases, setNewReleases] = useState(
		localStorage.getItem("new_releases")
			? JSON.parse(localStorage.getItem("new_releases"))
			: []
	);

	const [recentSongs, setRecentSongs] = useState([]);
	const [showRecents, setShowRecents] = useState("");
	const [showAlbum, setShowAlbum] = useState("");
	const [albumId, setAlbumId] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const time = localStorage.getItem("time");

	const { getAccessToken } = useContext(UserContext);
	const { showPlaybar } = useContext(PlaybarContext);

	// Function for showing recently listened to songs
	const showRecentSongs = () => {
		setShowRecents("show");
	};

	const getGreeting = (date) => {
		const timeHour =
			date.slice(0, 2) !== NaN ? date.slice(0, 2) : date.slice(0, 1);
		const amOrpm = date.slice(date.length - 2);

		if (amOrpm.toLowerCase() === "am") {
			return "Good morning";
		}

		if (Number(timeHour) === 12 || Number(timeHour) < 7) {
			return "Good afternoon";
		}

		if (Number(timeHour) > 7) {
			return "Good evening";
		}

		console.log("HOUUURRR", timeHour);

		return "Hello";
	};

	// Call function to get category playlists
	const getItems = async () => {
		try {
			// If the key "new_releases" is equal to undefined call the getNewReleases function and set the result in localstorage
			if (!localStorage.getItem("new_releases")) {
				const newReleasesResult = await getNewReleases();
				setNewReleases(newReleasesResult.data.body.albums.items);
				localStorage.setItem(
					"new_releases",
					JSON.stringify(newReleasesResult.data.body.albums.items)
				);
			}

			// If the key "top_items" is equal to undefined call the getTopItems function and set the result in localstorage
			if (!localStorage.getItem("top_items")) {
				const items = await getTopItems();
				setTopItems(items.data);
				localStorage.setItem("top_items", JSON.stringify(items.data));
			}

			// Get users recently played songs
			const recentSongsResult = await getRecentSongs();
			setRecentSongs(recentSongsResult);

			// After everything has been resolved set loading to false
			setLoading(false);
		} catch {
			setLoading(false);
			setError(true);
		}
	};

	// Function for showing album
	const viewAlbum = (id) => {
		setAlbumId(id);
		setShowAlbum("show");
	};

	useEffect(() => {
		getAccessToken();
		getItems();
	}, [topItems, newReleases]);

	return (
		<div className={"home-page " + showPlaybar}>
			<div>
				{loading && (
					<div className="loading-page">
						<img
							src="images/spotify-loading-gif.gif"
							className="loading-icon"
						></img>
					</div>
				)}
				{!loading && (
					<div>
						<RecentSongs
							recentSongs={recentSongs}
							showRecents={showRecents}
							setShowRecents={setShowRecents}
						/>

						<AlbumDetails
							showAlbum={showAlbum}
							setShowAlbum={setShowAlbum}
							albumId={albumId}
						/>

						<div>
							<div className="greeting">
								<h1>{getGreeting(time)}</h1>

								<img
									src="images/clock.png"
									onClick={showRecentSongs}
									alt="Clock icon"
									className="clock"
								></img>
							</div>
						</div>

						<div className="top-items">
							{topItems &&
								topItems.body.items.slice(0, 6).map((el, index) => {
									return (
										<div
											key={index}
											onClick={() => viewAlbum(el.album.id)}
											className="top-item-container"
										>
											<img src={el.album.images[0].url}></img>
											<p>{el.name}</p>
										</div>
									);
								})}
						</div>

						<HomeSlides albums={newReleases} />
					</div>
				)}
			</div>
			{error && <p>Hmmm something went wrong...</p>}
			<Navbar />
		</div>
	);
}

export default Home;
