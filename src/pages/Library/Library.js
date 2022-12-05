import { useState, useEffect, useContext } from "react";
import { getUserPlaylists } from "../../utils";
import Navbar from "../../components/Navbar/Navbar";

require("./Library.css");

function Library() {
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function getItems() {
		try {
			const playlistItems = await getUserPlaylists();
			setPlaylists(playlistItems.data.body.items);

			setLoading(false);
		} catch {
			setError("something went wrong");
		}
	}

	useEffect(() => {
		getItems();
	}, []);

	console.log("USER PLAYLISTS ===>", playlists);
	return (
		<div className={"library-page "}>
			{loading && <p>loading...</p>}
			{!loading && (
				<div>
					<h1>Your Library</h1>
					<div className="playlists">
						{playlists.map((el) => {
							return (
								<div className="playlist">
									{el.images.length === 0 && (
										<img
											src="images/spotify-black-icon.png"
											className="playlist-img"
										></img>
									)}

									{el.images.length > 0 && (
										<img src={el.images[0].url} className="playlist-img"></img>
									)}

									<div className="playlist-details">
										<p className="playlist-name">{el.name}</p>
										<div className="small-details">
											<p>Playlist</p>
											<img src="images/bullet.png" className="bullet"></img>
											<p>{el.owner.display_name}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
			<Navbar />
		</div>
	);
}

export default Library;
