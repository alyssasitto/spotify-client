import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
	getArtist,
	getArtistAlbums,
	getArtistTracks,
	playSong,
} from "../../utils";
import { PlaybarContext } from "../../context/player.context";
import Navbar from "../../components/Navbar/Navbar";
import AlbumDetails from "../../components/AlbumDetails/AlbumDetails";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";

require("./Artist.css");

function Artist() {
	const [artist, setArtist] = useState(null);
	const [topItems, setTopItems] = useState(null);
	const [albumsArr, setAlbumsArr] = useState(null);
	const [singlesArr, setSinglesArr] = useState(null);
	const [showAlbum, setShowAlbum] = useState("");
	const [albumId, setAlbumId] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const { showPlaybar } = useContext(PlaybarContext);
	const { getAccessToken } = useContext(UserContext);

	const param = useParams();

	const navigate = useNavigate();
	const back = () => {
		navigate(-1);
	};

	const viewAlbum = (id) => {
		setAlbumId(id);
		setShowAlbum("show");
	};

	// Function for getting the artists details
	const getArtistDetails = async () => {
		try {
			// Use the name from the url as the argument for the getArtist function
			const details = await getArtist(param.artist);
			setArtist(details.data.body.artists.items[0]);

			// Get the id for that artist from the reult of the getArtist function
			const id = details.data.body.artists.items[0].id;

			// Use the id for the paramater to get the albums from the getArtistAlbums function
			const albumsResult = await getArtistAlbums(id);

			// Return only the albums that contain a "album" or "single" album_group value
			const excludeFeatures = albumsResult.data.items.filter((el) => {
				if (el.album_group === "album" || el.album_group === "single") {
					return el;
				}
			});

			// Filter the albums so there are no duplicates
			const uniqueArr = [
				...new Map(
					excludeFeatures.map((item) => [item["name"], item])
				).values(),
			];

			// Make an array of only albums that contain "single" value
			let filteredSinglesArr = uniqueArr.filter((el) => {
				if (el.album_group === "single") {
					return el;
				}
			});

			// Make an array of only albums that contain "album" value
			let filteredAlbumsArr = uniqueArr.filter((el) => {
				if (el.album_group === "album") {
					return el;
				}
			});

			setSinglesArr(filteredSinglesArr);
			setAlbumsArr(filteredAlbumsArr);

			// Get the artists top albums
			const topItemsResult = await getArtistTracks(id);
			setTopItems(topItemsResult.data.tracks);

			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(true);
		}
	};

	useEffect(() => {
		getAccessToken();
		getArtistDetails();
	}, []);

	return (
		<div className={"artist-page " + showPlaybar}>
			<div className="artist-back-btn">
				<img
					src="images/left-arrow.svg"
					onClick={back}
					className="artist-left-arrow"
					alt="Left arrow icon"
				></img>
			</div>
			{loading && (
				<div className="loading-page">
					<img
						src="images/spotify-loading-gif.gif"
						className="loading-icon"
					></img>
				</div>
			)}
			{!loading && artist && (
				<div>
					<AlbumDetails
						showAlbum={showAlbum}
						setShowAlbum={setShowAlbum}
						albumId={albumId}
					/>

					<div
						className="image-heading"
						style={{ backgroundImage: "url(" + artist.images[0].url + ")" }}
					>
						{/* <img src={artist.images[0].url}></img> */}
						<h1 className="artist-heading">{artist.name}</h1>
					</div>

					<div className="top-artist-songs-container recent-songs">
						<h2>Popular</h2>
						<div className="artist-songs flex-container">
							{topItems.slice(0, 5).map((el, index) => {
								console.log(el);
								return (
									<div
										onClick={async () =>
											await playSong(el.album.uri, el.track_number)
										}
										className="song-container"
									>
										<div className="song-details">
											<p>{index + 1}</p>
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

						{albumsArr.length > 0 && (
							<div className="artist-albums-container">
								<h2>Albums</h2>
								<div className="artist-albums flex-container">
									{albumsArr.map((el) => {
										return (
											<div
												onClick={() => viewAlbum(el.id)}
												className="song-container"
											>
												<div className="song-details">
													<img src={el.images[0].url} className="cover"></img>
													<div>
														<p className="track-name">{el.name}</p>
														<p>{el.artists[0].name}</p>
													</div>
												</div>
												<img
													src="images/ellipsis.svg"
													className="ellipsis"
												></img>
											</div>
										);
									})}
								</div>
							</div>
						)}

						{singlesArr.length > 0 && (
							<div className="artist-singles-container">
								<h2>Singles</h2>
								<div className="singles-container flex-container">
									{singlesArr.map((el) => {
										return (
											<div
												onClick={() => viewAlbum(el.id)}
												className="song-container"
											>
												<div className="song-details">
													<img src={el.images[0].url} className="cover"></img>
													<div>
														<p className="track-name">{el.name}</p>
														<p>{el.artists[0].name}</p>
													</div>
												</div>
												<img
													src="images/ellipsis.svg"
													className="ellipsis"
												></img>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
			{error && <p>Hmmm somthing went wrong...</p>}
			<Navbar />
		</div>
	);
}

export default Artist;
