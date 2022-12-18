import { useEffect, useContext } from "react";
import { PlaybarContext } from "../../context/player.context";

require("./Player.css");

function Player() {
	const { currentSong, playState, currentAlbum, pause, resume } =
		useContext(PlaybarContext);

	useEffect(() => {}, [currentSong]);

	return (
		<div className="player-container">
			<div className="playing-container">
				<div className="playing-helper">
					{currentSong !== undefined && currentSong.album && (
						<img
							src={currentSong.album.images[0].url}
							className="playing-cover"
						></img>
					)}

					{currentAlbum !== undefined && currentAlbum.images && (
						<div
							style={{
								backgroundImage: "url(" + currentAlbum.images[0].url + ")",
							}}
							className="playing-cover"
						></div>
					)}
					<div className="details-helper">
						<p className="current-song">{currentSong.name}</p>
						<p className="current-artist">{currentSong.artists[0].name}</p>
					</div>
				</div>

				<div className="buttons">
					{!playState && (
						<button
							onClick={() => {
								const uri = currentSong.album
									? currentSong.album.uri
									: currentAlbum.uri;

								resume(uri, currentSong.track_number);
							}}
						>
							<img src="images/play.png" className="play-state"></img>
						</button>
					)}

					{playState && (
						<button onClick={() => pause()}>
							<img src="images/pause.png" className="play-state"></img>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Player;
