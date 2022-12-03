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
		const items = await getPLaylistItems(props.category);

		console.log(items);
	};

	useEffect(() => {
		getItems();
	}, []);

	return <div className="playlists"></div>;
}

export default Slides;
