import axios from "axios";
import { useEffect, useState } from "react";
import { getPlaylist } from "../../utils";

require("./PlaylistDetails.css");

function PlaylistDetails(props) {
	const [loading, setLoading] = useState(true);
	const [playlist, setPlaylist] = useState([]);
	const [error, setError] = useState("");

	const back = () => {
		props.setShowPlaylist("");
	};

	const getPlaylistDetails = async () => {
		try {
			setLoading(true);

			const playlistDetails = await getPlaylist(props.playlistId);
			setPlaylist(playlistDetails.data.body);

			setLoading(false);
		} catch {
			setError("Something went wrong");
		}
	};

	useEffect(() => {
		getPlaylistDetails();
	}, [props.playlistId]);

	console.log("THIS IS THE PLAYLIST", playlist);

	return (
		<div className={"playlist-page slide-container " + props.showPlaylist}>
			<img
				src="images/left-arrow.svg"
				onClick={back}
				className="left-arrow"
				alt="Left arrow icon"
			></img>

			{loading && (
				<div>
					<img
						src="images/left-arrow.svg"
						onClick={back}
						className="left-arrow"
						alt="Left arrow icon"
					></img>
					<p>loading...</p>
				</div>
			)}
			{!loading && (
				<div>
					<div className="images">
						<img
							src="images/left-arrow.svg"
							onClick={back}
							className="left-arrow"
							alt="Left arrow icon"
						></img>
						<img src={playlist.images[0].url} className="album-image"></img>
					</div>

					<div className="details">
						<h1>{playlist.name}</h1>
						<div className="artist">
							<img src={playlist.images[0].url} className="artist-img"></img>
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
							return (
								<div key={index} className="track">
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
											{el.track.artists[0].name}
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
