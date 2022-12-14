import { createContext, useState, useEffect } from "react";
import { pauseSong, playSong } from "../utils";

const PlaybarContext = createContext();

function PlaybarProviderWrapper(props) {
	const [currentSong, setCurrentSong] = useState(null);
	const [currentAlbum, setCurrentAlbum] = useState(null);
	const [showPlaybar, setShowPlaybar] = useState("");
	const [playState, setPlayState] = useState(false);

	const clickSong = (song, album) => {
		console.log("THIS IS THE SONG", song);
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

		console.log("THE TIMESTAMP", timestamp);
		const result = await playSong(uri, track, timestamp);

		setPlayState(true);

		return result;
	};

	return (
		<PlaybarContext.Provider
			value={{
				showPlaybar,
				clickSong,
				currentSong,
				playState,
				currentAlbum,
				currentSong,
				pause,
				resume,
			}}
		>
			{props.children}
		</PlaybarContext.Provider>
	);
}

export { PlaybarProviderWrapper, PlaybarContext };
