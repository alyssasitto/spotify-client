import { useState, useEffect, useContext } from "react";
import { getUserPlaylists } from "../../utils";
import { PlaybarContext } from "../../context/player.context";
import Navbar from "../../components/Navbar/Navbar";
import PlaylistDetails from "../../components/PlaylistDetails/PlaylistDetails";

require("./Library.css");

function Library() {
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [playlistId, setPlaylistId] = useState("");
	const [showPlaylist, setShowPlaylist] = useState("");
	const [error, setError] = useState(null);

	const { showPlaybar } = useContext(PlaybarContext);

	const getItems = async () => {
		try {
			const playlistItems = await getUserPlaylists();
			setPlaylists(playlistItems.data.body.items);

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

	console.log("USER PLAYLISTS ===>", playlists);
	return (
		<div className={"library-page " + showPlaybar}>
			{loading && <p>loading...</p>}
			{!loading && (
				<div>
					<PlaylistDetails
						playlistId={playlistId}
						showPlaylist={showPlaylist}
						setShowPlaylist={setShowPlaylist}
					/>

					<h1>Your Library</h1>
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
