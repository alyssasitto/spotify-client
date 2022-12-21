import { useEffect, useContext } from "react";
import { PlaybarContext } from "../../context/player.context";

require("./Player.css");

function Player() {
	const { currentTrack, currentState, player } = useContext(PlaybarContext);

	useEffect(() => {}, [currentTrack]);

	return (
		<div className="player-container">
			<div className="playing-container">
				<div className="playing-helper">
					{currentTrack && (
						<>
							<img
								src={currentTrack.album.images[0].url}
								className="playing-cover"
							></img>

							<div className="details-helper">
								<p className="current-song">{currentTrack.name}</p>
								<p className="current-artist">{currentTrack.artists[0].name}</p>
							</div>
						</>
					)}
				</div>

				<div className="btns-container">
					<button onClick={() => player.previousTrack()}>
						<img src="images/left-play.png" className="seek-btn"></img>
					</button>
					<div className="buttons">
						{currentState && currentState.paused === false && (
							<button onClick={() => player.pause()}>
								<img src="images/pause.png" className="play-state"></img>
							</button>
						)}
						{currentState && currentState.paused === true && (
							<button onClick={() => player.resume()}>
								<img src="images/play.png" className="play-state"></img>
							</button>
						)}
					</div>
					<button onClick={() => player.nextTrack()}>
						<img src="images/right-play.png" className="seek-btn"></img>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Player;
