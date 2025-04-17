<svelte:head>
	<title>Help - Re:Search</title>
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
		<h2>Help &amp; FAQ</h2>
		<div class="faq">
			<h3>How do I search for archived pages?</h3>
			<p>
				Simply enter your query on the home page. Our system uses advanced tokenization and
				similarity analysis to return results within your chosen time frame.
			</p>
			<h3>What is link rot and why does it matter?</h3>
			<p>
				Link rot refers to the gradual disappearance of web content over time. Our engine preserves
				historical snapshots to combat this issue.
			</p>
			<h3>How can I request removal of my content?</h3>
			<p>
				We provide a contact form for content creators. Submit your email, proof of ownership, and
				details of your removal request. Moderators will review your claim and respond via email.
			</p>
			<h3>Who do I contact for more assistance?</h3>
			<p>
				For further help, please email our support team at <a
					href="mailto:support@temporalsearchengine.com">support@temporalsearchengine.com</a
				>.
			</p>
		</div>
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
	/* Reuse header styles */
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
		max-width: 700px;
		width: 90%;
	}
	.faq h3 {
		margin-top: 1.5rem;
		color: #ffbf59;
	}
	.faq p {
		margin-top: 0.5rem;
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
