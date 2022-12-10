import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchResults } from "../../utils";

require("./SearchResults.css");

function SearchResults(props) {
	const [loading, setLoading] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const [error, setError] = useState("");
	const back = () => {
		props.setShowSearchResults("");
	};

	const getResults = async () => {
		try {
			setError(false);
			setLoading(true);
			setSearchResults([]);

			const results = await getSearchResults(props.searchItem);
			setSearchResults(results.data.body.tracks.items);

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

	console.log(searchResults);

	return (
		<div
			className={
				"search-results recent-songs slide-container " + props.showSearchResults
			}
		>
			<img
				src="images/left-arrow.svg"
				onClick={back}
				className="left-arrow"
				alt="Left arrow icon"
			></img>

			{loading && <p>loading...</p>}
			{!loading && searchResults && (
				<div className="songs search-result-songs">
					{searchResults.map((el) => {
						return (
							<div className="song-container">
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
											<p>{el.artists[0].name}</p>
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
