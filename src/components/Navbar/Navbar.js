import { useContext } from "react";
import { Link } from "react-router-dom";
import { PlaybarContext } from "../../context/player.context";
import Player from "../Player/Player";

require("./Navbar.css");

function Navbar() {
	const { showPlaybar } = useContext(PlaybarContext);
	return (
		<div className={"navbar " + showPlaybar}>
			{showPlaybar.length > 0 && <Player />}

			<div>
				<ul>
					<li>
						<img src="images/spotify-home.png" className="nav-icon"></img>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<img src="images/search.png" className="nav-icon"></img>
						<Link to="/search">Search</Link>
					</li>
					<li>
						<img src="images/library.png" className="nav-icon"></img>
						<Link to="/library">Library</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
