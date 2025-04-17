<svelte:head>
	<title>Browse - Re:Search</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<header class="navbar">
	<h1 class="logo"><a href="/">Re:Search</a></h1>
	<nav class="nav-links">
		<ul>
			<li><a href="/about">About</a></li>
			<li><a href="/help">Help</a></li>
			<li><a href="/team">Team</a></li>
			<li><a href="/report">Takedown</a></li>
		</ul>
	</nav>
</header>

<main class="content_page">
	<div class="content-container">
		<h2>Key Features &amp; Architecture</h2>
		<ul>
			<li>
				<strong>Autonomous Spider:</strong> Crawls the web, follows robots.txt, and employs teleportation
				to avoid traps.
			</li>
			<li>
				<strong>Efficient Tokenizer:</strong> Processes HTML, removes tags, and calculates TF-IDF and
				PageRank values.
			</li>
			<li>
				<strong>Incremental Indexing:</strong> Archives only significant changes to reduce redundancy.
			</li>
			<li>
				<strong>Temporal Query Interface:</strong> Allows users to search for webpages as they appeared
				at specific points in time.
			</li>
			<li>
				<strong>Robust Backend:</strong> Utilizes query-document similarity algorithms and a specialized
				database schema (Map, Dictionary, Postings, Versions, Blacklist).
			</li>
		</ul>
		<p>
			This system brings together modern search engine techniques and the unique challenges of
			digital preservation, ensuring that users have reliable access to lost media.
		</p>
	</div>
</main>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Montserrat', sans-serif;
	}
	/* Reuse header styles from About page */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px; /* Adjust height as needed */
		background: transparent;
		backdrop-filter: blur(10px);
		color: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		z-index: 1000; /* Ensures it's always on top */
	}

	.navbar a {
		color: white;
		text-decoration: none;
		font-weight: normal;
	}

	.nav-links {
		padding-top: 15px;
		display: flex;
		justify-content: right; /* Centers links horizontally */
		align-items: right;
		width: 100%; /* Takes full width */
		font-family: Arial;
		padding-right: 40px;
	}

	.nav-links ul {
		display: flex;
		list-style: none;
		padding: 2px;
		margin: 0;
		gap: 20px; /* Adds spacing between items */
		font-family: 'Inter', sans-serif; /* Change to any font you prefer */
	}

	.nav-links ul li {
		display: inline;
		font-family: 'Inter', sans-serif; /* Change to any font you prefer */
	}

	.nav-links a {
		font-size: 1.1rem;
		color: white;
		text-decoration: none;
		font-weight: normal;
		letter-spacing: 0.5px;
		position: relative;
		display: inline-block;
		padding: 5px 0;
	}

	/* Create animated gradient lines */
	.nav-links a::after,
	.nav-links a::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background: linear-gradient(to right, rgb(245, 204, 81), rgb(255, 64, 0)); /* Red to Cyan */
		bottom: -5px;
		left: 0;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.4s ease-out;
	}

	.nav-links a::before {
		top: -5px;
		transform-origin: left;
	}

	.nav-links a:hover::after,
	.nav-links a:hover::before {
		transform: scaleX(1);
	}

	.logo {
		font-size: 40px;
		padding-top: 20px;
		padding-left: 20px;
	}

	/* Main Content Styles */
	main {
		padding-top: 80px;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(
			45deg,
			rgb(71, 2, 2),
			rgb(10, 12, 15),
			rgb(35, 1, 1),
			rgb(50, 10, 10)
		);
		background-size: 300% 300%;
		animation: gradientFlow 15s ease infinite;
	}
	.content-container {
		//background: rgba(0, 0, 0, 0.6);
		padding: 2rem;
		border-radius: 10px;
		color: white;
		max-width: 800px;
		width: 90%;
	}
	.content-container ul {
		margin: 1rem 0;
		line-height: 1.6;
	}
	@keyframes gradientFlow {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
