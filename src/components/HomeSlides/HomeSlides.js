import React, { useState } from "react";

import AlbumDetails from "../AlbumDetails/AlbumDetails";
import { getAlbumDetails } from "../../utils";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Import required modules
import { FreeMode, Pagination } from "swiper";

require("../Slides/Slides.css");

function HomeSlides(props) {
	const [show, setShow] = useState("");
	const [albumId, setAlbumId] = useState("");
	const [error, setError] = useState(null);

	const albums = JSON.parse(localStorage.getItem("new_releases"));

	// Function for getting the album details
	const viewAlbum = async (id) => {
		try {
			const albumDetails = await getAlbumDetails(id);
			localStorage.setItem("album", JSON.stringify(albumDetails.data.body));

			setShow("show");
		} catch {
			setError("Something went wrong");
		}
	};

	return (
		<div className="slides">
			<AlbumDetails
				show={show}
				setShow={setShow}
				albumId={albumId}
				setAlbumId={setAlbumId}
			/>

			<div>
				<h2>New Releases</h2>
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
					{albums.slice(0, 6).map((el) => {
						return (
							<div className="slide">
								<SwiperSlide key={el.id}>
									<div onClick={() => viewAlbum(el.id)}>
										<div
											style={{ backgroundImage: `url(${el.images[0].url})` }}
											className="img"
										></div>

										<p className="album-name">{el.name}</p>
									</div>
								</SwiperSlide>
							</div>
						);
					})}
				</Swiper>
			</div>

			<div>
				<h2>Hot right now</h2>
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
					{albums.slice(6, 12).map((el) => {
						return (
							<div className="slide">
								<SwiperSlide key={el.id}>
									<div onClick={() => viewAlbum(el.id)}>
										<div
											style={{ backgroundImage: `url(${el.images[0].url})` }}
											className="img"
										></div>

										<p className="album-name">{el.name}</p>
									</div>
								</SwiperSlide>
							</div>
						);
					})}
				</Swiper>
			</div>

			<div>
				<h2>Going viral</h2>
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
					{albums.slice(12, 18).map((el) => {
						return (
							<div className="slide">
								<SwiperSlide key={el.id}>
									<div onClick={() => viewAlbum(el.id)}>
										<div
											style={{ backgroundImage: `url(${el.images[0].url})` }}
											className="img"
										></div>

										<p className="album-name">{el.name}</p>
									</div>
								</SwiperSlide>
							</div>
						);
					})}
				</Swiper>
			</div>

			<div>
				<h2>Popular albums</h2>
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
					{albums.slice(18, 24).map((el) => {
						return (
							<div className="slide">
								<SwiperSlide key={el.id}>
									<div onClick={() => viewAlbum(el.id)}>
										<div
											style={{ backgroundImage: `url(${el.images[0].url})` }}
											className="img"
										></div>

										<p className="album-name">{el.name}</p>
									</div>
								</SwiperSlide>
							</div>
						);
					})}
				</Swiper>
			</div>

			<div>
				<h2>Modern hits</h2>
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
					{albums.slice(24, 30).map((el) => {
						return (
							<div className="slide">
								<SwiperSlide key={el.id}>
									<div onClick={() => viewAlbum(el.id)}>
										<div
											style={{ backgroundImage: `url(${el.images[0].url})` }}
											className="img"
										></div>

										<p className="album-name">{el.name}</p>
									</div>
								</SwiperSlide>
							</div>
						);
					})}
				</Swiper>
			</div>

			<div>
				<h2>Fresh new music</h2>
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
					{albums.slice(30, 36).map((el) => {
						return (
							<div className="slide">
								<SwiperSlide key={el.id}>
									<div onClick={() => viewAlbum(el.id)}>
										<div
											style={{ backgroundImage: `url(${el.images[0].url})` }}
											className="img"
										></div>

										<p className="album-name">{el.name}</p>
									</div>
								</SwiperSlide>
							</div>
						);
					})}
				</Swiper>
			</div>

			<div>
				<h2>Run that back</h2>
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
					{albums.slice(36, 42).map((el) => {
						return (
							<div className="slide">
								<SwiperSlide key={el.id}>
									<div onClick={() => viewAlbum(el.id)}>
										<div
											style={{ backgroundImage: `url(${el.images[0].url})` }}
											className="img"
										></div>

										<p className="album-name">{el.name}</p>
									</div>
								</SwiperSlide>
							</div>
						);
					})}
				</Swiper>
			</div>
			{error && <p>{error}</p>}
		</div>
	);
}

export default HomeSlides;
