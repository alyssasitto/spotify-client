import { createContext, useState, useEffect } from "react";
import axios from "axios";

const PlaybarContext = createContext();

const API_URL = process.env.REACT_APP_API_URL;

function PlaybarProviderWrapper(props) {
	const [showPlaybar, setShowPlaybar] = useState("");
	const [player, setPlayer] = useState(undefined);
	const [currentTrack, setCurrentTrack] = useState(null);
	const [currentState, setCurrentState] = useState(null);

	const token = localStorage.getItem("spotify_access_token");

	const playSong = async (context_uri, track_number) => {
		const device_id = localStorage.getItem("device_id");

		try {
			const track = track_number - 1;

			const play = await axios.get(`${API_URL}/play_song`, {
				headers: { token, context_uri, track, device_id },
			});

			setShowPlaybar("show-playbar");

			return play;
		} catch (err) {
			return err;
		}
	};

	useEffect(() => {
		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "Web Playback SDK",
				getOAuthToken: (cb) => {
					cb(localStorage.getItem("spotify_access_token"));
				},
				volume: 0.5,
			});

			setPlayer(player);

			player.addListener("ready", ({ device_id }) => {
				// Save id to local storage in order to play songs later on
				localStorage.setItem("device_id", device_id);
				console.log("Ready with Device ID", device_id);
			});

			player.addListener("not_ready", ({ device_id }) => {
				console.log("Device ID has gone offline", device_id);
			});

			player.addListener("player_state_changed", (state) => {
				console.log("THIS IS THE STATE ===>", state);
				if (!state) {
					return;
				}

				setCurrentTrack(state.track_window.current_track);
				setCurrentState(state);
			});

			player.activateElement();

			player.connect();
		};
	}, []);

	return (
		<PlaybarContext.Provider
			value={{
				showPlaybar,
				currentTrack,
				currentState,
				player,
				playSong,
			}}
		>
			{props.children}
		</PlaybarContext.Provider>
	);
}

export { PlaybarProviderWrapper, PlaybarContext };
