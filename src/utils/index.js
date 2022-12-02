import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";
const token = localStorage.getItem("spotify_access_token");

// Function for getting one category
async function getOneCategory() {
	const categories = await axios.get(`${API_URL}/categories`, {
		headers: { token: token, limit: 1 },
	});

	const categoryDetails = await axios.get(`${API_URL}/category_details`, {
		headers: {
			token: token,
			id: categories.data.body.categories.items[0].id,
		},
	});

	return categoryDetails;
}

// Funtion for getting top items
async function topItems() {}

export { getOneCategory };
