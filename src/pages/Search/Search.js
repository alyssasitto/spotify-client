import { useState, useEffect, useContext } from "react";
import { getCategories } from "../../utils";

import Navbar from "../../components/Navbar/Navbar";
// import Slides from "../../components/Slides/Slides";

function Search() {
	const [categories, setCategories] = useState([]);

	async function getItems() {
		const result = await getCategories(50);
		setCategories(result);
	}

	useEffect(() => {
		getItems();
	}, []);

	console.log("====>", categories);
	return (
		<div>
			<Navbar />
		</div>
	);
}

export default Search;
