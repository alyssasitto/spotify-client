import { createContext, useState, useEffect } from "react";
import { pauseSong, playSong } from "../utils";

const PlaybarContext = createContext();

function PlaybarProviderWrapper(props) {
	const [currentSong, setCurrentSong] = useState(null);
	const [currentAlbum, setCurrentAlbum] = useState(null);
	const [showPlaybar, setShowPlaybar] = useState("");
	const [playState, setPlayState] = useState(false);
	const [player, setPlayer] = useState(undefined);
	const [currentTrack, setCurrentTrack] = useState(null);
	const [currentState, setCurrentState] = useState(null);

	const clickSong = (song, album) => {
		setCurrentSong(song);
		setCurrentAlbum(album);
		localStorage.setItem("current_song", JSON.stringify(song));
		localStorage.setItem("current_album", JSON.stringify(album));

		setPlayState(true);

		setShowPlaybar("show-playbar");
	};

	const pause = async () => {
		const result = await pauseSong();
		setPlayState(false);

		return result;
	};

	const resume = async (uri, track) => {
		const timestamp = JSON.parse(localStorage.getItem("currently_playing")).body
			.progress_ms;

		const result = await playSong(uri, track, timestamp);

		setPlayState(true);

		return result;
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
	});

	return (
		<PlaybarContext.Provider
			value={{
				showPlaybar,
				clickSong,
				currentSong,
				playState,
				currentAlbum,
				currentSong,
				currentTrack,
				currentState,
				player,

				pause,
				resume,
			}}
		>
			{props.children}
		</PlaybarContext.Provider>
	);
}

export { PlaybarProviderWrapper, PlaybarContext };
