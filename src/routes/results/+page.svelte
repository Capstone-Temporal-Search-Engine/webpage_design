<script>
	import { onMount } from 'svelte';

	let query = '';
	let d1 = '';
	let d2 = '';
	let results = [];
	let loading = false;
	let errorMessage = '';

	// Clears the search input
	function clearSearch() {
		query = '';
	}

	// Fetch results from your backend and use a proxy to get titles
	async function fetchResults(query, d1, d2) {
		const formData = new FormData();
		formData.append('start_time', Math.floor(new Date(d1).getTime() / 1000).toString());
		formData.append('end_time', Math.floor(new Date(d2).getTime() / 1000).toString());
		formData.append('query_term', query);

		try {
			const response = await fetch('http://13.59.202.16/retrieve', {
				method: 'POST',
				body: formData
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log('Fetched results:', data.results);

			// Fetch the HTML from S3 and extract the title directly
			results = await Promise.all(
				data.results.map(async (result) => {
					const url = result[1]; // S3 URL

					try {
						// Fetch the HTML directly from S3
						const htmlResponse = await fetch(url);
						const htmlText = await htmlResponse.text();

						// Parse the HTML to extract the title
						const parser = new DOMParser();
						const doc = parser.parseFromString(htmlText, 'text/html');
						const title = doc.querySelector('title')?.innerText || 'Title Unavailable';

						return {
							url,
							title
						};
					} catch (error) {
						console.error(`Error fetching title from ${url}:`, error);
						return {
							url,
							title: 'Title Unavailable'
						};
					}
				})
			);
		} catch (error) {
			console.error(error);
			errorMessage = 'Failed to retrieve results. Please try again later.';
		}
	}

	// Handles form submission and dynamically updates the results
	async function handleSubmit(event) {
		event.preventDefault(); // prevent default form submission
		document.title = `${query} | ${d1} ~ ${d2} - Re:Search`;
		loading = true;
		await fetchResults(query, d1, d2);
		loading = false;
	}

	// On mount, try to fetch initial search parameters from the URL and load results.
	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		query = params.get('q') || '';
		d1 = params.get('d1') || new Date(0).toISOString().split('T')[0];
		d2 = params.get('d2') || new Date().toISOString().split('T')[0];

		if (query && d1 && d2) {
			document.title = `${query} | ${d1} ~ ${d2} - Re:Search`;
			loading = true;
			await fetchResults(query, d1, d2);
			loading = false;
		} else {
			document.title = 'Error';
			errorMessage = 'Missing search parameters. Please try again.';
		}
	});

	// (Optional) If you need to extract further data using a hidden iframe.
	function extractTitle(event, index) {
		console.log(`Iframe for result ${index} loaded.`);
	}
</script>

<svelte:head>
	<title>{query} | {d1} ~ {d2} - Re:Search</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Header remains as in your original code -->
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
	<!-- Search Bar Section: Using a form with on:submit to dynamically update results -->
	<div class="search_bar_container">
		<form onsubmit={handleSubmit} class="search_box animate-fade-in">
			<!-- Animated Search Input -->
			<div class="form">
				<input
					class="input"
					type="search"
					name="q"
					bind:value={query}
					placeholder="Search..."
					required
				/>
				<button type="button" class="reset" onclick={clearSearch}>✖</button>
			</div>
			<!-- Date Range Selection -->
			<div class="date_container">
				<input id="d1" class="search_date" type="date" name="d1" bind:value={d1} required />
				<h4 class="date_text">to</h4>
				<input id="d2" class="search_date" type="date" name="d2" bind:value={d2} required />
			</div>
		</form>
	</div>

	<!-- Results Section -->
	<div class="content-container">
		{#if loading}
			<div class="loader-container">
				<div class="loader"></div>
			</div>
		{:else if errorMessage}
			<div class="error">
				<h3>Error</h3>
				<p>{errorMessage}</p>
			</div>
		{:else}
			<div class="results">
				{#if results.length > 0}
					{#each results as result, index}
						<div class="result">
							<h3>
								<a href={`/dock?dock=${encodeURIComponent(result.url)}`} target="_self">
									{result.title}
								</a>
							</h3>

							<!-- Optional hidden iframe -->
							<iframe
								src={result.url}
								style="display: none"
								onLoad={(event) => extractTitle(event, index)}
							></iframe>
						</div>
					{/each}
				{:else}
					<div class="result">
						<h3>No results found</h3>
						<p>Try modifying your search query.</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</main>

<style>
	/* Global Reset & Font */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Montserrat', sans-serif;
	}

	/* Header Styles */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background: transparent;
		backdrop-filter: blur(10px);
		color: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		z-index: 1000;
	}
	.navbar a {
		color: white;
		text-decoration: none;
		font-weight: normal;
	}
	.nav-links {
		padding-top: 15px;
		display: flex;
		justify-content: right;
		align-items: right;
		width: 100%;
		font-family: Arial;
		padding-right: 40px;
	}
	.nav-links ul {
		display: flex;
		list-style: none;
		padding: 2px;
		margin: 0;
		gap: 20px;
		font-family: 'Inter', sans-serif;
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
	.nav-links a::after,
	.nav-links a::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background: linear-gradient(to right, rgb(245, 204, 81), rgb(255, 64, 0));
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

	/* Main Page Background & Container */
	.content_page {
		padding-top: 80px;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
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

	/* Search Bar Styles */
	.search_bar_container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 15px;
	}

	.search_box {
		background-color: transparent;
		backdrop-filter: blur(15px);
		border-radius: 15px;
		padding: 25px;
		width: 800px;
		display: flex;
		flex-direction: column;
		gap: 15px;
		animation: floatIn 0.8s ease-out;
	}

	.form {
		position: relative;
		display: flex;
		align-items: center;
		border-radius: 20px;
		border: 1px solid transparent;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease-in-out;
		width: 100%;
		justify-content: center;
	}
	.input {
		flex: 1;
		border-radius: 20px;
		outline: none;
		border: none;
		background-color: #5b1c1c; /* Reddish tone */
		border: 1px solid transparent;
		color: white;
		padding: 10px 1rem;
		transition:
			border 0.3s ease-in-out,
			box-shadow 0.3s ease-in-out;
		width: 100%;
	}

	.input:focus,
	.input:hover {
		border: 1px solid rgba(246, 205, 155, 0.82);
	}

	/* Remove the default focus outline */
	.input:focus {
		outline: none !important;
	}

	.reset {
		background: none;
		border: none;
		color: white;
		font-size: 1rem;
		cursor: pointer;
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
		padding: 5px;
	}
	.input:not(:placeholder-shown) ~ .reset {
		opacity: 1;
	}
	.date_container {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.search_date {
		width: 100%;
		padding: 10px;
		border: 1px solid transparent;
		border-radius: 20px;
		background: #5b1c1c;
		color: white;
		font-size: 16px;
		outline: none;
		transition:
			border 0.3s ease-in-out,
			box-shadow 0.3s ease-in-out;
		color-scheme: dark;
	}

	/* Date input focus and hover effect */
	.search_date:hover,
	.search_date:focus {
		border: 1px solid rgba(246, 205, 155, 0.82);
	}

	/* Remove the default blue outline */
	.search_date:focus {
		outline: none !important;
	}

	.date_text {
		color: white;
		font-size: 18px;
	}

	/* Content Container for Results */
	.content-container {
		background: transparent;
		padding: 2rem;
		border-radius: 10px;
		color: white;
		max-width: 800px;
		width: 90%;
		text-align: center;
		margin-top: 5px;
	}

	/* Loader & Error Styles */
	.loading {
		font-size: 1.2rem;
		margin-top: 20px;
	}
	.error {
		background-color: #a83232;
		padding: 15px;
		border-radius: 8px;
		margin-top: 20px;
	}
	.error h3 {
		margin-bottom: 10px;
	}

	/* Results Styles */
	.results {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.result {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		padding: 20px;
		border-radius: 12px;
		text-align: left;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}
	.result:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
	}
	.result h3 a {
		font-size: 1.3rem;
		font-weight: 600;
		color: #fff;
		text-decoration: none;
		position: relative;
	}
	.result h3 a::after {
		content: '';
		position: absolute;
		width: 0%;
		height: 2px;
		bottom: -2px;
		left: 0;
		background: linear-gradient(to right, #f5cc51, #ff4000);
		transition: width 0.3s ease;
	}

	/* Ensure buttons don't have a focus outline */
	button:focus-visible {
		outline: none !important;
		box-shadow: none !important;
	}

	.result h3 a:hover::after {
		width: 100%;
	}
	.result p {
		margin-top: 10px;
		font-size: 1rem;
		color: #e0e0e0;
		line-height: 1.4;
	}

	/* Animated Gradient */
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

	/* Loader Styles */
	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
		width: 60px;
		aspect-ratio: 1;
		border: 4px solid;
		color: white;
		box-sizing: border-box;
		border-radius: 50%;
		background:
			radial-gradient(circle 5px, currentColor 95%, transparent),
			linear-gradient(currentColor 50%, transparent 0) 50%/4px 60% no-repeat;
		animation: l1 2s infinite linear;
	}
	.loader-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.loader:before {
		content: '';
		flex: 1;
		background: linear-gradient(currentColor 50%, transparent 0) 50%/4px 80% no-repeat;
		animation: inherit;
	}
	@keyframes l1 {
		100% {
			transform: rotate(1turn);
		}
	}
</style>
