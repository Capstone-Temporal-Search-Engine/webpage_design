<script>
	import { onMount } from 'svelte';

	let archivedPage = '';

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		archivedPage = params.get('dock') || '';
	});

	function goBack() {
		window.history.back();
	}
</script>

<svelte:head>
	<title>Temporal SE HTML Dock</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<header class="navbar">
	<h1 class="logo"><a href="/" target="_self">Re:Search</a></h1>
	<button class="back_button" on:click={goBack}>Back to Results</button>
</header>

<main class="content_container">
	<iframe class="overlay_frame" src={archivedPage}></iframe>
</main>

<style>
	/* Global Reset & Font */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Montserrat', sans-serif;
	}

	/* Navbar / Top Bar Styles */
	.navbar {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background: linear-gradient(
			45deg,
			rgb(71, 2, 2),
			rgb(10, 12, 15),
			rgb(35, 1, 1),
			rgb(50, 10, 10)
		);
		background-size: 300% 300%;
		animation: gradientFlow 15s ease infinite;
		backdrop-filter: blur(10px);
		color: white;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		z-index: 1000;
	}

	.logo {
		padding-top: 15px;
		padding-left: 30px;
		font-size: 1.5rem;
		font-weight: normal;
		padding-bottom: 20px;
	}

	.logo a {
		text-decoration: none;
		color: white;
	}

	/* Page Content */
	.content_container {
		width: 100%;
		height: 100vh;
		padding-top: 60px; /* Prevents top bar from covering content */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.overlay_frame {
		width: 100%;
		height: 100%;
		border: none;
	}

	button {
		--green: rgb(231, 72, 58);
		font-size: 15px;
		padding: 0.7em 2.7em;
		letter-spacing: 0.06em;
		position: relative;
		font-family: inherit;
		border-radius: 0.6em;
		overflow: hidden;
		transition: all 0.3s;
		line-height: 1.4em;
		border: 2px solid var(--green);
		background: linear-gradient(
			to right,
			rgba(27, 253, 156, 0.1) 1%,
			transparent 40%,
			transparent 60%,
			rgba(27, 253, 156, 0.1) 100%
		);
		color: var(--green);
		box-shadow:
			inset 0 0 10px rgba(27, 253, 156, 0.4),
			0 0 9px 3px rgba(27, 253, 156, 0.1);
	}

	button:hover {
		color: #82ffc9;
		box-shadow:
			inset 0 0 10px rgba(156, 27, 25, 0.6),
			0 0 9px 3px rgba(255, 7, 7, 0.87);
	}

	button:before {
		content: '';
		position: absolute;
		left: -4em;
		width: 4em;
		height: 100%;
		top: 0;
		transition: transform 0.4s ease-in-out;
		background: linear-gradient(
			to right,
			transparent 1%,
			rgba(27, 253, 156, 0.1) 40%,
			rgba(27, 253, 156, 0.1) 60%,
			transparent 100%
		);
	}

	button:hover:before {
		transform: translateX(15em);
	}
</style>
