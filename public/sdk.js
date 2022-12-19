// Code for getting the device id from spotify webplayback sdk

window.onSpotifyWebPlaybackSDKReady = () => {
	const token = localStorage.getItem("spotify_access_token");
	const player = new Spotify.Player({
		name: "Web Playback SDK Quick Start Player",
		getOAuthToken: (cb) => {
			cb(token);
		},
		volume: 0.5,
	});

	// Ready
	player.addListener("ready", ({ device_id }) => {
		localStorage.setItem("device_id", device_id);
		console.log("Ready with Device ID", device_id);
	});

	// Not Ready
	player.addListener("not_ready", ({ device_id }) => {
		console.log("Device ID has gone offline", device_id);
	});

	player.addListener("initialization_error", ({ message }) => {
		console.error(message);
	});

	player.addListener("authentication_error", ({ message }) => {
		console.error(message);
	});

	player.addListener("account_error", ({ message }) => {
		console.error(message);
	});

	player.activateElement();

	player.setVolume(0.5).then(() => {
		console.log("Volume updated!");
	});

	player.connect();
};
