import { useState, useContext } from "react";
import { UserContext } from "../context/user.context";
import axios from "axios";

const API_URL = "http://localhost:5005";

const token = localStorage.getItem("spotify_access_token");

// Function for getting categories
export async function getCategories(num) {
	if (!token) {
		window.location.reload();
	}

	const categories = await axios.get(`${API_URL}/categories`, {
		headers: { token: token, limit: num },
	});

	return categories;
}

// Function for getting category playlists
export async function getCategoryPlaylists(id) {
	const categoryPlaylists = await axios.get(`${API_URL}/category_playlists`, {
		headers: {
			token: token,
			id: id,
		},
	});

	return categoryPlaylists;
}

// Funtion for getting top items
export async function getTopItems() {
	const topItems = await axios.get(`${API_URL}/top_items`, {
		headers: { token: token },
	});

	return topItems;
}

// Function for getting playlist items
export async function getPLaylistItems(arr) {
	const newArr = await arr.map((el) => {
		return axios.get(`${API_URL}/playlist_items`, {
			headers: { token, id: el.id },
		});
	});

	return Promise.all(newArr);
}
