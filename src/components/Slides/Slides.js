import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getPLaylistItems } from "../../utils";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper";

require("./Slides.css");

function Slides(props) {
	const [items, setItems] = useState([]);
	const [error, setError] = useState("");

	const getItems = async () => {
		const playlistItems = await getPLaylistItems(
			props.category.data.body.playlists.items
		);

		setItems(playlistItems);
	};

	useEffect(() => {
		getItems();
	}, []);

	console.log("LOKOSKO", items);

	return <div className="playlists"></div>;
}

export default Slides;
