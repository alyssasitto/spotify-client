// import { useState, useEffect } from "react";

// require("./WebPlayback.css");

// function WebPlayback(props) {
// 	const track = {
// 		name: "",
// 		album: {
// 			images: [{ url: "" }],
// 		},
// 		artists: [{ name: "" }],
// 	};

// 	const [player, setPlayer] = useState(undefined);
// 	const [isPaused, setPaused] = useState(false);
// 	const [isActive, setActive] = useState(false);
// 	const [currentTrack, setCurrentTrack] = useState(track);
// 	const [trackCopy, setTrackCopy] = useState(currentTrack);

// 	useEffect(() => {
// 		// const deviceId = localStorage.getItem("device_id");

// 		// const script = document.createElement("script");
// 		// script.src = "https://sdk.scdn.co/spotify-player.js";
// 		// script.async = true;

// 		// document.body.appendChild(script);

// 		window.onSpotifyWebPlaybackSDKReady = () => {
// 			const player = new window.Spotify.Player({
// 				name: "Web Playback SDK",
// 				getOAuthToken: (cb) => {
// 					cb(localStorage.getItem("spotify_access_token"));
// 				},
// 				volume: 0.5,
// 			});

// 			setPlayer(player);

// 			player.addListener("ready", ({ device_id }) => {
// 				localStorage.setItem("device_id", device_id);
// 				console.log("Ready with Device ID", device_id);
// 			});

// 			player.addListener("not_ready", ({ device_id }) => {
// 				console.log("Device ID has gone offline", device_id);
// 			});

// 			player.addListener("player_state_changed", (state) => {
// 				if (!state) {
// 					return;
// 				}

// 				setCurrentTrack(state.track_window.current_track);
// 				localStorage.setItem(
// 					"current_track",
// 					JSON.stringify(state.track.current_track)
// 				);

// 				setPaused(state.paused);

// 				player.getCurrentState().then((state) => {
// 					!state ? setActive(false) : setActive(true);
// 				});
// 			});

// 			player.activateElement();

// 			player.connect();
// 		};
// 	}, []);

// 	console.log(player);

// 	return (
// 		<div className="player-container">
// 			<div className="playing-container">
// 				{currentTrack && (
// 					<div className="playing-helper">
// 						<img
// 							src={currentTrack.album.images[0].url}
// 							className="playing-cover"
// 						></img>

// 						<div className="details-helper">
// 							<p className="current-song">{currentTrack.name}</p>
// 							<p className="current-artist">{currentTrack.artists[0].name}</p>
// 						</div>
// 					</div>
// 				)}
// 				{/* <img
// 					src={current_track.album.images[0].url}
// 					className="now-playing__cover"
// 					alt=""
// 				/>

// 				<div className="now-playing__side">
// 					<div className="now-playing__name">{current_track.name}</div>

// 					<div className="now-playing__artist">
// 						{current_track.artists[0].name}
// 					</div>
// 				</div>

// 				<button
// 					className="btn-spotify"
// 					onClick={() => {
// 						player.previousTrack();
// 					}}
// 				>
// 					&lt;&lt;
// 				</button>

// 				<button
// 					className="btn-spotify"
// 					onClick={() => {
// 						player.togglePlay();
// 					}}
// 				>
// 					{is_paused ? "PLAY" : "PAUSE"}
// 				</button>

// 				<button
// 					className="btn-spotify"
// 					onClick={() => {
// 						player.nextTrack();
// 					}}
// 				>
// 					&gt;&gt;
// 				</button> */}
// 			</div>
// 		</div>
// 	);
// }

// export default WebPlayback;
