<svelte:head>
	<title>About - Re:Search</title>
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
		<h2>About Re:Search</h2>
		<section>
			<h3>Abstract</h3>
			<p>
				Lost media has long challenged humanity’s advancement—examples like the burning of the
				Library of Alexandria and link rot affecting nearly 38% of webpages highlight this problem.
				Our project aims to build a temporal search engine that marries the robustness of modern
				search algorithms with time-based retrieval, ensuring that digital information remains
				accessible despite the passing of time.
			</p>
		</section>
		<section>
			<h3>Problem &amp; Objective</h3>
			<p>
				Link rot and content drift cause significant loss of information. With an average website
				half-life of just two years, critical historical and scientific data are at risk. Our
				objective is to develop a system that archives webpages with time stamps, using an
				incremental indexing approach combined with a dynamic web crawler and tokenizer, so that
				users can retrieve webpages as they appeared at a given point in time.
			</p>
		</section>
		<section>
			<h3>Background &amp; Related Work</h3>
			<p>
				Traditional tools like the Wayback Machine have paved the way for digital preservation, yet
				they remain limited in handling informational queries and ease of use. Our proposal draws on
				concepts such as query-document similarity, TF-IDF tokenization, and PageRank while learning
				from past initiatives (e.g., Internet Archive, Archive.Today, Stillio, and research by Dr.
				Susan Gauch).
			</p>
		</section>
	</div>
</main>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Montserrat', sans-serif;
	}

	h2 {
		justify-conent: center;
		font-size: 30px;
	}

	/* Header Styles */
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

	.logo {
		font-size: 40px;
		padding-top: 20px;
		padding-left: 20px;
	}

	.content-container {
		//background: rgba(0, 0, 0, 0.6);
		padding: 2rem;
		border-radius: 10px;
		color: white;
		max-width: 800px;
		width: 90%;
	}
	.content-container h3 {
		margin-top: 1.5rem;
		color: #ffbf59;
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
