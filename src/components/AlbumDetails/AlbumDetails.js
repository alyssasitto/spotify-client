import { useEffect, useState } from "react";
import { getAlbumDetails } from "../../utils";

require("./AlbumDetails.css");

function AlbumDetails(props) {
	const back = () => {
		props.setShow("");

		if (props.setHeight) {
			props.setHeight("");
		}
	};

	const album = JSON.parse(localStorage.getItem("album"));
	console.log("THIS IS THE ALBUM", album);

	const tracks = album.tracks.items;

	if (props.setHeight && props.show === "show") {
		props.setHeight("height");
	}

	return (
		<div className={"album-details slide-container " + props.show}>
			{album && (
				<div>
					<div className="images">
						<img
							src="images/left-arrow.svg"
							onClick={back}
							className="left-arrow"
							alt="Left arrow icon"
						></img>
						<img src={album.images[0].url} className="album-image"></img>
					</div>
					<div className="details">
						<h1>{album.name}</h1>
						<div className="artist">
							<img src={album.images[0].url} className="artist-img"></img>
							<p>{album.artists[0].name}</p>
						</div>
						<div className="release-details">
							<p className="album-heading">{album.album_type}</p>
							<img src="images/bullet.png" className="bullet"></img>
							<p>{album.release_date.slice(0, 4)}</p>
						</div>
						<div className="options">
							<button className="btn">
								<img src="images/heart.png"></img>
							</button>
							<div className="btn-helper">
								<button className="btn">
									<img src="images/replay.png"></img>
								</button>
								<div className="play-btn">
									<button>
										<img src="images/right-arrow.png"></img>
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="tracks">
						{tracks &&
							tracks.map((el, index) => {
								return (
									<div key={el.index} className="track">
										<div>
											<p>{el.name}</p>
											<p className="name">
												{" "}
												{el.explicit && (
													<img
														src="images/explicit.png"
														className="explicit"
													></img>
												)}{" "}
												{el.artists[0].name}
											</p>
										</div>
										<img src="images/ellipsis.svg" className="ellipsis"></img>
									</div>
								);
							})}
					</div>

					<footer>
						<small>{album.copyrights[0].text}</small>
					</footer>
				</div>
			)}
		</div>
	);
}

export default AlbumDetails;
