import { useState, useEffect, useContext } from "react";
import { getCategories } from "../../utils";

import Navbar from "../../components/Navbar/Navbar";

require("./Search.css");
// import Slides from "../../components/Slides/Slides";

function Search() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		getItems();
	}, []);

	return (
		<div className={"search-page "}>
			{loading && <p>loading...</p>}
			{!loading && (
				<div>
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
