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
	const [show, setShow] = useState("");
	const [error, setError] = useState(null);

	const back = () => {
		props.setShowCategoryPlaylists("");
	};

	async function viewAlbum(id) {
		try {
			const albumDetails = await getAlbumDetails(id);
			localStorage.setItem("album", JSON.stringify(albumDetails.data.body));

			setShow("show");
		} catch {
			setError("Something went wrong");
		}
	}

	async function getPlaylistDetails() {
		setLoading(true);

		const playlistIds = props.category.map((el) => {
			return el.id;
		});

		const playlistResults = await getPlaylistSongs(playlistIds);
		setPlaylists(playlistResults);

		setLoading(false);

		console.log("THESE ARE THE IDS", playlistIds);
	}

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
			{loading && (
				<div>
					<img
						src="images/left-arrow.svg"
						onClick={back}
						className="left-arrow"
						alt="Left arrow icon"
					></img>
					<p>loading...</p>
				</div>
			)}

			{!loading && (
				<div>
					<AlbumDetails show={show} setShow={setShow} setHeight={setHeight} />
					<img
						src="images/left-arrow.svg"
						onClick={back}
						className="left-arrow"
						alt="Left arrow icon"
					></img>

					<div className={height}>
						<h1>{props.categoryName}</h1>

						{props.category.map((playlist, index) => {
							return (
								<div>
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
												console.log(el);
												return (
													<div className="slide">
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
		</div>
	);
}

export default CategoryPlaylists;
