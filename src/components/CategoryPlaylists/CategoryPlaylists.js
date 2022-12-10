import AlbumDetails from "../AlbumDetails/AlbumDetails";
import { getAlbumDetails } from "../../utils";

import { useState, useEffect } from "react";
import { getPlaylistSongs } from "../../utils";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

require("./CategoryPlaylists.css");
function CategoryPlaylists(props) {
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(false);
	const [height, setHeight] = useState("");
	const [showAlbum, setShowAlbum] = useState("");
	const [albumId, setAlbumId] = useState("");
	const [error, setError] = useState(null);

	const back = () => {
		props.setShowCategoryPlaylists("");
	};

	const viewAlbum = (id) => {
		setAlbumId(id);
		setShowAlbum("show");
	};

	const getPlaylistDetails = async () => {
		try {
			setLoading(true);

			const playlistIds = props.category.map((el) => {
				return el.id;
			});

			const playlistResults = await getPlaylistSongs(playlistIds);
			setPlaylists(playlistResults);

			setLoading(false);

			console.log("THESE ARE THE IDS", playlistIds);
		} catch {
			setError("Something went wrong");
		}
	};

	useEffect(() => {
		if (props.showCategoryPlaylists === "show") {
			getPlaylistDetails();
		}
	}, [props.category]);

	return (
		<div
			className={
				"category-playlists slide-container " + props.showCategoryPlaylists
			}
		>
			<img
				src="images/left-arrow.svg"
				onClick={back}
				className="left-arrow"
				alt="Left arrow icon"
			></img>
			{loading && (
				<div>
					<p>loading...</p>
				</div>
			)}

			{!loading && (
				<div>
					<AlbumDetails
						showAlbum={showAlbum}
						setShowAlbum={setShowAlbum}
						albumId={albumId}
						setHeight={setHeight}
					/>

					<div className={"margin-helper " + height}>
						<h1>{props.categoryName}</h1>

						{props.category.map((playlist, index) => {
							return (
								<div className="category-slides">
									<h2>{playlist.name}</h2>
									<Swiper
										slidesPerView={"auto"}
										spaceBetween={30}
										freeMode={true}
										pagination={{
											clickable: true,
										}}
										modules={[FreeMode, Pagination]}
										className="mySwiper"
									>
										{playlists.length > 0 &&
											playlists[index].data.items.slice(0, 6).map((el) => {
												return (
													<div className="slide">
														{el.track !== null && (
															<SwiperSlide
																key={el.track.album.id}
																onClick={() => viewAlbum(el.track.album.id)}
															>
																<div>
																	<div
																		style={{
																			backgroundImage: `url(${el.track.album.images[0].url})`,
																		}}
																		className="img"
																	></div>

																	<p className="album-name">
																		{el.track.album.name}
																	</p>
																</div>
															</SwiperSlide>
														)}
													</div>
												);
											})}
									</Swiper>
								</div>
							);
						})}
					</div>
				</div>
			)}
			{error && <p>{error}</p>}
		</div>
	);
}

export default CategoryPlaylists;
