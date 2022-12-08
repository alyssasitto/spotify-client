import { useState, useEffect, useContext } from "react";
import {
	getCategories,
	getCategoryPlaylists,
	getPlaylistSongs,
} from "../../utils";

import Navbar from "../../components/Navbar/Navbar";
import CategoryPlaylists from "../../components/CategoryPlaylists/CategoryPlaylists";
import axios from "axios";

require("./Search.css");
// import Slides from "../../components/Slides/Slides";

function Search() {
	const [categories, setCategories] = useState([]);

	const [loading, setLoading] = useState(true);
	const [showCategoryPlaylists, setShowCategoryPlaylists] = useState("");
	const [category, setCategory] = useState([]);
	const [categoryCopy, setCategoryCopy] = useState(category);
	const [categoryName, setCategoryName] = useState("");
	const [playlists, setPlaylists] = useState([]);

	const colors = [
		"#E13300",
		"#283EA3",
		"#1E3264",
		"#E8115B",
		"#BC5900",
		"#148A08",
		"#D84000",
		"#E1118C",
		"#8D67AB",
		"#7358FF",
		"#E91429",
		"#8C1932",
		"#CDF564",
		"#F59B23",
		"#056952",
		"#E13300",
		"#283EA3",
		"#1E3264",
		"#E8115B",
		"#BC5900",
		"#148A08",
		"#D84000",
		"#E1118C",
		"#8D67AB",
		"#7358FF",
		"#E91429",
		"#8C1932",
		"#CDF564",
		"#F59B23",
		"#056952",
		"#E13300",
		"#283EA3",
		"#1E3264",
		"#E8115B",
		"#BC5900",
		"#148A08",
		"#D84000",
		"#E1118C",
		"#8D67AB",
		"#7358FF",
		"#E91429",
		"#8C1932",
		"#CDF564",
		"#F59B23",
		"#056952",
		"#E13300",
		"#283EA3",
		"#1E3264",
		"#E8115B",
		"#BC5900",
		"#148A08",
		"#D84000",
		"#E1118C",
		"#8D67AB",
		"#7358FF",
		"#E91429",
		"#8C1932",
		"#CDF564",
		"#F59B23",
		"#056952",
	];

	async function getItems() {
		const result = await getCategories(50);
		setCategories(result);

		setLoading(false);
	}

	async function viewCategoryPlaylists(id, name) {
		console.log(id);
		const details = await getCategoryPlaylists(id);
		// localStorage.setItem("category", JSON.stringify(details.data.body));
		setCategory(details.data.body.playlists.items.slice(0, 8));
		setCategoryName(name);

		setShowCategoryPlaylists("show");
	}

	useEffect(() => {
		getItems();
	}, []);

	console.log("CARRYRYREWI", category);

	return (
		<div className={"search-page "}>
			{loading && <p>loading...</p>}
			{!loading && (
				<div>
					{category && (
						<CategoryPlaylists
							category={category}
							categoryName={categoryName}
							playlists={playlists}
							showCategoryPlaylists={showCategoryPlaylists}
							setShowCategoryPlaylists={setShowCategoryPlaylists}
						/>
					)}
					<h1>Search</h1>
					<form>
						<input
							type="text"
							name="searched-song"
							placeholder="What do you want to listen to?"
						></input>
					</form>

					<h2>Browse all</h2>
					<div className="categories">
						{categories &&
							categories.data.body.categories.items.map((el, index) => {
								return (
									<div
										className="category"
										style={{ backgroundColor: colors[index] }}
										key={el.id}
										onClick={() => viewCategoryPlaylists(el.id, el.name)}
									>
										<p>{el.name}</p>
										<img src={el.icons[0].url}></img>
									</div>
								);
							})}
					</div>
				</div>
			)}
			<Navbar />
		</div>
	);
}

export default Search;
