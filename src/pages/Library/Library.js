import { useState, useEffect, useContext } from "react";
import { getUserPlaylists } from "../../utils";
import { PlaybarContext } from "../../context/player.context";
import { UserContext } from "../../context/user.context";
import Navbar from "../../components/Navbar/Navbar";
import PlaylistDetails from "../../components/PlaylistDetails/PlaylistDetails";

require("./Library.css");

function Library() {
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [playlistId, setPlaylistId] = useState("");
	const [showPlaylist, setShowPlaylist] = useState("");
	const [error, setError] = useState(null);

	const { logout } = useContext(UserContext);

	const { showPlaybar } = useContext(PlaybarContext);

	const getItems = async () => {
		try {
			const playlistItems = await getUserPlaylists();

			const filteredPlaylists = playlistItems.data.body.items.filter((el) => {
				if (el.images.length > 0) {
					return el;
				}
			});

			setPlaylists(filteredPlaylists);

			setLoading(false);
		} catch {
			setError("something went wrong");
		}
	};

	const viewPlaylist = (id) => {
		setShowPlaylist("show");
		setPlaylistId(id);
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<div className={"library-page " + showPlaybar}>
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
					<PlaylistDetails
						playlistId={playlistId}
						showPlaylist={showPlaylist}
						setShowPlaylist={setShowPlaylist}
					/>

					<div className="library-heading">
						<h1>Your Library</h1>
						<button onClick={() => logout()} className="logout-btn">
							Logout
						</button>
					</div>
					<div className="playlists">
						{playlists.map((el) => {
							return (
								<div onClick={() => viewPlaylist(el.id)} className="playlist">
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
