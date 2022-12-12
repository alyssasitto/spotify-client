import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArtist, getArtistAlbums, getArtistTracks } from "../../utils";
import Navbar from "../../components/Navbar/Navbar";
import AlbumDetails from "../../components/AlbumDetails/AlbumDetails";
import { useNavigate } from "react-router-dom";

require("./Artist.css");

function Artist() {
	const [artist, setArtist] = useState(null);
	const [topItems, setTopItems] = useState(null);
	const [albums, setAlbums] = useState(null);
	const [albumsArr, setAlbumsArr] = useState(null);
	const [singlesArr, setSinglesArr] = useState(null);
	const [showAlbum, setShowAlbum] = useState("");
	const [albumId, setAlbumId] = useState("");
	const [loading, setLoading] = useState(true);

	const param = useParams();

	const navigate = useNavigate();
	const back = () => {
		navigate(-1);
	};

	const viewAlbum = (id) => {
		setAlbumId(id);
		setShowAlbum("show");
	};

	const getArtistDetails = async () => {
		try {
			const details = await getArtist(param.artist);
			setArtist(details.data.body.artists.items[0]);

			const id = details.data.body.artists.items[0].id;

			const albumsResult = await getArtistAlbums(id);
			const excludeFeatures = albumsResult.data.items.filter((el) => {
				if (el.album_group === "album" || el.album_group === "single") {
					return el;
				}
			});
			const uniqueArr = [
				...new Map(
					excludeFeatures.map((item) => [item["name"], item])
				).values(),
			];

			let filteredSinglesArr = uniqueArr.filter((el) => {
				if (el.album_group === "single") {
					return el;
				}
			});

			let filteredAlbumsArr = uniqueArr.filter((el) => {
				if (el.album_group === "album") {
					return el;
				}
			});

			setSinglesArr(filteredSinglesArr);
			setAlbumsArr(filteredAlbumsArr);

			console.log("THESE ARE THE SINGLES", singlesArr);
			console.log("THESE ARE THE ALBUMS", albumsArr);

			setAlbums(uniqueArr);

			const topItemsResult = await getArtistTracks(id);
			setTopItems(topItemsResult.data.tracks);

			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getArtistDetails();
	}, []);

	// const l = uniqueArr(excludeFeatures);

	// console.log("THIS IS THE ARTIST", artist);
	// console.log("THIS IS THE ALBUMS", albums);
	// console.log("THIS IS THE TOP ITEMS", topItems);

	console.log("THESE ARE THE SINGLES", singlesArr);
	console.log("THESE ARE THE ALBUMS", albumsArr);

	return (
		<div className="artist-page">
			<div className="artist-back-btn">
				<img
					src="images/left-arrow.svg"
					onClick={back}
					className="left-arrow"
					alt="Left arrow icon"
				></img>
			</div>
			{loading && <p>loading...</p>}
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
								return (
									<div
										onClick={() => viewAlbum(el.album.id)}
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
			<Navbar />
		</div>
	);
}

export default Artist;
