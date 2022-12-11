import { useState, useContext } from "react";
import { UserContext } from "../context/user.context";
import axios from "axios";

const API_URL = "http://localhost:5005";

const token = localStorage.getItem("spotify_access_token");

// Function for getting categories
export const getCategories = async (num) => {
	if (!token) {
		window.location.reload();
	}

	const categories = await axios.get(`${API_URL}/categories`, {
		headers: { token: token, limit: num },
	});

	return categories;
};

// Function for getting category playlists
export const getCategoryPlaylists = async (id) => {
	const categoryPlaylists = await axios.get(`${API_URL}/category_playlists`, {
		headers: {
			token: token,
			id: id,
		},
	});

	return categoryPlaylists;
};

// Funtion for getting top items
export const getTopItems = async () => {
	const topItems = await axios.get(`${API_URL}/top_items`, {
		headers: { token: token },
	});

	return topItems;
};

// Function for getting several playlist items
export const getPlaylistSongs = async (arr) => {
	const newArr = await arr.map((el) => {
		return axios.get(`${API_URL}/playlist_items`, {
			headers: { token: token, id: el },
		});
	});
	return Promise.all(newArr);
};

// Function for getting one playlist details
export const getPlaylist = async (id) => {
	const playlist = await axios.get(`${API_URL}/playlist`, {
		headers: { token, id },
	});

	return playlist;
};

// Function for getting new releases
export const getNewReleases = async () => {
	if (!token) {
		window.location.reload();
	}

	const newReleases = await axios.get(`${API_URL}/new_releases`, {
		headers: { token },
	});

	return newReleases;
};

// Function for getting users playlists
export const getUserPlaylists = async () => {
	const playlists = await axios.get(`${API_URL}/user_playlists`, {
		headers: { token },
	});

	return playlists;
};

// Function for getting recently listened to songs
export const getRecentSongs = async () => {
	const recentSongs = axios.get(`${API_URL}/recently_played`, {
		headers: { token },
	});

	return recentSongs;
};

// Funtion for getting album details
export const getAlbumDetails = async (id) => {
	const albumDetails = await axios.get(`${API_URL}/album_details`, {
		headers: { token, id },
	});

	return albumDetails;
};

// Function for getting search results
export const getSearchResults = async (search) => {
	try {
		const searchResults = await axios.get(`${API_URL}/search`, {
			headers: { token, search },
		});

		return searchResults;
	} catch (err) {
		return err;
	}
};

// Function for getting an indivdual artist
export const getArtist = async (search) => {
	try {
		const artist = await axios.get(`${API_URL}/artist`, {
			headers: { token, search },
		});

		return artist;
	} catch (err) {
		return err;
	}
};
