import { useEffect, useState, useContext } from "react";
import { getAlbumDetails } from "../../utils";
import { PlaybarContext } from "../../context/player.context";
import { Link } from "react-router-dom";

require("./AlbumDetails.css");

function AlbumDetails(props) {
	const [loading, setLoading] = useState(true);
	const [album, setAlbum] = useState([]);
	const [error, setError] = useState("");

	const { showPlaybar, playSong, player, setTrack } =
		useContext(PlaybarContext);

	const getAlbum = async () => {
		try {
			setLoading(true);
			setAlbum([]);
			setError("");
			const albumDetails = await getAlbumDetails(props.albumId);
			setAlbum(albumDetails.data.body);

			setLoading(false);
		} catch {
			setError(true);
			setLoading(false);
		}
	};

	const back = () => {
		props.setShowAlbum("");

		if (props.setHeight) {
			props.setHeight("");
		}
	};

	useEffect(() => {
		if (props.showAlbum === "show") {
			getAlbum();
		}

		if (props.setHeight && props.showAlbum === "show") {
			props.setHeight("height");
		}
	}, [props.albumId]);

	return (
		<div
			className={
				"album-details slide-container " + props.showAlbum + " " + showPlaybar
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

			{!loading && album && (
				<div>
					<div className="images">
						<img
							src="images/left-arrow.svg"
							onClick={back}
							className="left-arrow"
							alt="Left arrow icon"
						></img>
						<img src={album.images[0].url} className="album-image"></img>
					</div>
					<div className="details">
						<h1>{album.name}</h1>
						<div className="artist">
							<img src={album.images[0].url} className="artist-img"></img>
							<span className="artist-link">
								<Link to={`/artist/${album.artists[0].name}`}>
									{album.artists[0].name}
								</Link>
							</span>
						</div>
						<div className="release-details">
							<p className="album-heading">{album.album_type}</p>
							<img src="images/bullet.png" className="bullet"></img>
							<p>{album.release_date.slice(0, 4)}</p>
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
						{album.tracks.items &&
							album.tracks.items.map((el, index) => {
								return (
									<button
										onClick={async () =>
											await playSong(album.uri, el.track_number)
										}
										key={el.index}
										className="track"
									>
										<div>
											<p>{el.name}</p>
											<p className="name">
												{" "}
												{el.explicit && (
													<img
														src="images/explicit.png"
														className="explicit"
													></img>
												)}{" "}
												<span className="artist-link">
													<Link to={`/artist/${el.artists[0].name}`}>
														{el.artists[0].name}
													</Link>
												</span>
											</p>
										</div>
										<img src="images/ellipsis.svg" className="ellipsis"></img>
									</button>
								);
							})}
					</div>

					<footer>
						<small>{album.copyrights[0].text}</small>
					</footer>
				</div>
			)}
			{error && <p>Hmmm something went wrong...</p>}
		</div>
	);
}

export default AlbumDetails;
