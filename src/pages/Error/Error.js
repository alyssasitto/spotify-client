require("./Error.css");

function Error() {
	return (
		<div className="error-page">
			<img src="images/error-logo.png" className="error-logo"></img>
			<h1>Page not found</h1>
			<p>We can't seem to find the page you're looking for.</p>
			<a href="/home">Home</a>
		</div>
	);
}

export default Error;
