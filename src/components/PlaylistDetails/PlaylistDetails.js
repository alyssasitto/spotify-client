import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { getPlaylist, playSong } from "../../utils";
import { PlaybarContext } from "../../context/player.context";
import { Link } from "react-router-dom";

require("./PlaylistDetails.css");

function PlaylistDetails(props) {
	const [loading, setLoading] = useState(true);
	const [playlist, setPlaylist] = useState([]);
	const [error, setError] = useState("");

	const { clickSong, showPlaybar } = useContext(PlaybarContext);

	const back = () => {
		props.setShowPlaylist("");
	};

	const play = async (uri, track, song) => {
		const playResult = await playSong(uri, track);

		clickSong(song);

		return playResult;
	};

	const getPlaylistDetails = async () => {
		try {
			setLoading(true);

			props.setShowPlaylist("show");

			const playlistDetails = await getPlaylist(props.playlistId);
			setPlaylist(playlistDetails.data.body);

			setLoading(false);
		} catch {
			setError("Something went wrong");
		}
	};

	useEffect(() => {
		if (props.showPlaylist === "show") {
			getPlaylistDetails();
		}
	}, [props.playlistId]);

	return (
		<div
			className={
				"playlist-page slide-container " +
				props.showPlaylist +
				" " +
				showPlaybar
			}
		>
			<img
				src="images/left-arrow.svg"
				onClick={back}
				className="left-arrow"
				alt="Left arrow icon"
			></img>

			{loading && (
				<div className="loading-page">
					<img
						src="images/spotify-loading-gif.gif"
						className="loading-icon"
					></img>
				</div>
			)}
			{!loading && (
				<div className="content">
					<div className="images">
						<img
							src="images/left-arrow.svg"
							onClick={back}
							className="left-arrow"
							alt="Left arrow icon"
						></img>
						{playlist.images && playlist.images.length > 0 && (
							<img src={playlist.images[0].url} className="album-image"></img>
						)}
					</div>

					<div className="details">
						<h1>{playlist.name}</h1>
						<div className="artist">
							{playlist.images && playlist.images.length > 0 && (
								<img src={playlist.images[0].url} className="artist-img"></img>
							)}
							<p>{playlist.owner.display_name}</p>
						</div>
						<div className="options">
							<button className="btn">
								<img src="images/heart.png"></img>
							</button>
							<div className="btn-helper">
								<button className="btn">
									<img src="images/replay.png"></img>
								</button>
								<div className="play-btn">
									<button>
										<img src="images/right-arrow.png"></img>
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="tracks">
						{playlist.tracks.items.map((el, index) => {
							console.log("the playlist", playlist);
							console.log("the song", el);
							return (
								<div
									key={index}
									onClick={() =>
										play(el.track.album.uri, el.track.track_number, el.track)
									}
									className="track"
								>
									<div>
										<p>{el.track.name}</p>
										<p className="name">
											{" "}
											{el.track.explicit && (
												<img
													src="images/explicit.png"
													className="explicit"
												></img>
											)}{" "}
											<span className="artist-link">
												<Link to={`/artist/${el.track.artists[0].name}`}>
													{el.track.artists[0].name}
												</Link>
											</span>
										</p>
									</div>
									<img src="images/ellipsis.svg" className="ellipsis"></img>
								</div>
							);
						})}
					</div>
				</div>
			)}

			{error && <p>{error}</p>}
		</div>
	);
}

export default PlaylistDetails;
