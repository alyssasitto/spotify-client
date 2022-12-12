import { Link } from "react-router-dom";

require("./RecentSongs.css");

function RecentSongs(props) {
	const back = () => {
		props.setShowRecents("");
	};

	return (
		<div className={"recent-songs slide-container " + props.showRecents}>
			<div className="heading">
				<img
					src="images/left-arrow.svg"
					onClick={back}
					className="left-arrow"
					alt="Left arrow icon"
				></img>
				<h1>Recently played</h1>
			</div>
			<div className="songs">
				{props.recentSongs.data.items.map((el) => {
					return (
						<div className="song-container">
							<div className="song-details">
								<img src={el.track.album.images[0].url} className="cover"></img>
								<div>
									<p className="track-name">{el.track.name}</p>
									<div className="small-details">
										{el.track.explicit && (
											<img src="images/explicit.png" className="explicit"></img>
										)}
										<p class="song-type">{el.track.album.album_type}</p>
										<img src="images/bullet.png" className="bullet"></img>
										<span className="artist-link">
											<Link to={`/artist/${el.track.artists[0].name}`}>
												{el.track.artists[0].name}
											</Link>
										</span>
									</div>
								</div>
							</div>
							<img src="images/ellipsis.svg" className="ellipsis"></img>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default RecentSongs;
