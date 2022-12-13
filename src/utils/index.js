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

	try {
		const categories = await axios.get(`${API_URL}/categories`, {
			headers: { token: token, limit: num },
		});

		return categories;
	} catch (err) {
		return err;
	}
};

// Function for getting category playlists
export const getCategoryPlaylists = async (id) => {
	try {
		const categoryPlaylists = await axios.get(`${API_URL}/category_playlists`, {
			headers: {
				token: token,
				id: id,
			},
		});

		return categoryPlaylists;
	} catch (err) {
		return err;
	}
};

// Funtion for getting top items
export const getTopItems = async () => {
	try {
		const topItems = await axios.get(`${API_URL}/top_items`, {
			headers: { token: token },
		});

		return topItems;
	} catch (err) {
		return err;
	}
};

// Function for getting several playlist items
export const getPlaylistSongs = async (arr) => {
	try {
		const newArr = await arr.map((el) => {
			return axios.get(`${API_URL}/playlist_items`, {
				headers: { token: token, id: el },
			});
		});
		return Promise.all(newArr);
	} catch (err) {
		return err;
	}
};

// Function for getting one playlist details
export const getPlaylist = async (id) => {
	try {
		const playlist = await axios.get(`${API_URL}/playlist`, {
			headers: { token, id },
		});

		return playlist;
	} catch (err) {
		return err;
	}
};

// Function for getting new releases
export const getNewReleases = async () => {
	if (!token) {
		window.location.reload();
	}

	try {
		const newReleases = await axios.get(`${API_URL}/new_releases`, {
			headers: { token },
		});

		return newReleases;
	} catch (err) {
		return err;
	}
};

// Function for getting users playlists
export const getUserPlaylists = async () => {
	try {
		const playlists = await axios.get(`${API_URL}/user_playlists`, {
			headers: { token },
		});

		return playlists;
	} catch (err) {
		return err;
	}
};

// Function for getting recently listened to songs
export const getRecentSongs = async () => {
	try {
		const recentSongs = axios.get(`${API_URL}/recently_played`, {
			headers: { token },
		});

		return recentSongs;
	} catch (err) {
		return err;
	}
};

// Funtion for getting album details
export const getAlbumDetails = async (id) => {
	try {
		const albumDetails = await axios.get(`${API_URL}/album_details`, {
			headers: { token, id },
		});

		return albumDetails;
	} catch (err) {
		return err;
	}
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

// Function for getting an artists top tracks
export const getArtistTracks = async (id) => {
	try {
		const topTracks = axios.get(`${API_URL}/artist_top_tracks`, {
			headers: { token, id },
		});

		return topTracks;
	} catch (err) {
		return err;
	}
};

// Function for getting an artists albums
export const getArtistAlbums = async (id) => {
	try {
		const artistAlbums = await axios.get(`${API_URL}/artist_albums`, {
			headers: { token, id },
		});

		return artistAlbums;
	} catch (err) {
		return err;
	}
};

// Function for playing a song
export const playSong = async (context_uri, track_number) => {
	const device_id = localStorage.getItem("device_id");

	try {
		const track = track_number - 1;

		const play = await axios.get(`${API_URL}/play_song`, {
			headers: { token, context_uri, track, device_id },
		});

		console.log(play);

		return play;
	} catch (err) {
		return err;
	}
};

// Function for pausing song
export const pauseSong = async () => {
	try {
		const pause = await axios.get(`${API_URL}/pause`, {
			headers: { token },
		});

		return pause;
	} catch (err) {
		return err;
	}
};
