import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { getArtist, getSearchResults, playSong } from "../../utils";
import { Link } from "react-router-dom";
import { PlaybarContext } from "../../context/player.context";
import { useNavigate } from "react-router-dom";

require("./SearchResults.css");

function SearchResults(props) {
	const [loading, setLoading] = useState(true);
	const [artist, setArtist] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [error, setError] = useState("");

	const { clickSong, showPlaybar } = useContext(PlaybarContext);

	const back = () => {
		props.setShowSearchResults("");
	};

	const play = async (uri, track, song) => {
		const playResult = await playSong(uri, track);

		clickSong(song);

		return playResult;
	};

	const navigate = useNavigate();

	const viewArtist = (artist) => {
		navigate(`/artist/${artist}`);
	};

	const getResults = async () => {
		try {
			setError(false);
			setLoading(true);
			setSearchResults([]);

			const results = await getSearchResults(props.searchItem);
			setSearchResults(results.data.body.tracks.items);

			const artistResults = await getArtist(props.searchItem);
			setArtist(artistResults.data.body.artists.items[0]);

			setLoading(false);
		} catch {
			setLoading(false);
			setError("hmmm something went wrong");
		}
	};

	useEffect(() => {
		if (props.showSearchResults === "show") {
			getResults();
		}
	}, [props.showSearchResults]);

	console.log("THESE ARE THE SEARCH RESULTS", searchResults);
	console.log("THESE ARE THE ARTIST RESULTS ===>", artist);

	return (
		<div
			className={
				"search-results recent-songs slide-container " +
				props.showSearchResults +
				" " +
				showPlaybar
			}
		>
			<img
				src="images/left-arrow.svg"
				onClick={back}
				className="left-arrow custom-arrow"
				alt="Left arrow icon"
			></img>

			{loading && <p>loading...</p>}
			{!loading && searchResults && (
				<div className="songs search-result-songs">
					{artist &&
						artist.name.toLowerCase() === props.searchItem.toLowerCase() && (
							<div
								onClick={() => viewArtist(artist.name.toLowerCase())}
								className="artist-container"
							>
								<div className="song-details">
									<img
										src={artist.images[0].url}
										className="cover artist-cover"
									></img>
									<div>
										<p className="artist-name">{artist.name}</p>
										<p>Artist</p>
									</div>
								</div>
								<img src="images/right.png" className="small-right-arrow"></img>
							</div>
						)}

					{searchResults.map((el) => {
						return (
							<div
								onClick={() => play(el.album.uri, el.track_number, el)}
								className="song-container"
							>
								<div className="song-details">
									<img src={el.album.images[0].url} className="cover"></img>
									<div>
										<p className="track-name">{el.name}</p>
										<div className="small-details">
											{el.explicit && (
												<img
													src="images/explicit.png"
													className="explicit"
												></img>
											)}
											<p class="song-type">{el.album.album_type}</p>
											<img src="images/bullet.png" className="bullet"></img>
											<span className="artist-link">
												<Link to={`/artist/${el.artists[0].name}`}>
													{el.artists[0].name}
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
			)}
			{error && <p>{error}</p>}
		</div>
	);
}

export default SearchResults;
