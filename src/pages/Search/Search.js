import { useState, useEffect, useContext } from "react";
import { getCategories, getCategoryPlaylists } from "../../utils";

import Navbar from "../../components/Navbar/Navbar";
import CategoryPlaylists from "../../components/CategoryPlaylists/CategoryPlaylists";
import SearchResults from "../../components/SearchResults/SearchResults";

import { UserContext } from "../../context/user.context";
import { PlaybarContext } from "../../context/player.context";

require("./Search.css");

function Search() {
	const [categories, setCategories] = useState([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [searchItem, setSearchItem] = useState("");
	const [showSearchResults, setShowSearchResults] = useState("");
	const [showCategoryPlaylists, setShowCategoryPlaylists] = useState("");
	const [category, setCategory] = useState([]);
	const [categoryName, setCategoryName] = useState("");
	const [playlists, setPlaylists] = useState([]);

	const { showPlaybar } = useContext(PlaybarContext);
	const { getAccessToken } = useContext(UserContext);

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

	// Get the category options
	const getItems = async () => {
		try {
			const result = await getCategories(50);
			setCategories(result);

			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(true);
		}
	};

	// Function for viewing the individual category playlists
	const viewCategoryPlaylists = async (id, name) => {
		try {
			const details = await getCategoryPlaylists(id);
			setCategory(details.data.body.playlists.items.slice(0, 8));
			setCategoryName(name);

			setShowCategoryPlaylists("show");
		} catch (err) {
			setLoading(false);
			setError(true);
		}
	};

	// Function for displaying the search results slide
	const search = (e) => {
		e.preventDefault();
		setShowSearchResults("show");
	};

	// Function for handling the search a user types in
	const handleSearch = (e) => {
		setSearchItem(e.target.value);
	};

	useEffect(() => {
		getAccessToken();
		getItems();
	}, []);

	return (
		<div className={"search-page " + showPlaybar}>
			{loading && (
				<div className="loading-page">
					<img
						src="images/spotify-loading-gif.gif"
						className="loading-icon"
					></img>
				</div>
			)}
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

					{
						<SearchResults
							searchItem={searchItem}
							showSearchResults={showSearchResults}
							setShowSearchResults={setShowSearchResults}
						/>
					}

					<h1>Search</h1>
					<form className="search-container">
						<input
							onChange={handleSearch}
							type="text"
							name="searched-song"
							placeholder="What do you want to listen to?"
						></input>
						<button type="submit" onClick={search} className="search-btn">
							Search
						</button>
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

			{error && <p>Hmmm something went wrong...</p>}

			<Navbar />
		</div>
	);
}

export default Search;
