<script>
	// Sample team member data based on the proposal
	let teamMembers = [
		{
			name: 'Sankalp Pandey',
			role: 'Web Crawler & Query Similarity',
			description:
				'A senior CS major specializing in EEG-based deep learning models and AI-powered healthcare solutions. Focused on developing the web crawler and query-document similarity algorithms.'
		},
		{
			name: 'Blake Wood',
			role: 'Backend & Spider Development',
			description:
				'A senior CS major experienced in full stack development. Responsible for backend website interactions, database setup, asset creation, and working on the spider.'
		},
		{
			name: 'Alexander Wells',
			role: 'Website & Query Interface',
			description:
				'A senior CS major responsible for website development and linking user queries to the query-document similarity process.'
		},
		{
			name: 'Phuong Tran',
			role: 'Front-end & Cloud Storage',
			description:
				'A senior CS major with experience in both front-end and back-end development. Handles database management and cloud storage integration.'
		},
		{
			name: 'Angel Pinzon',
			role: 'Spider Framework & Front-end Assistance',
			description:
				'A senior Computer Engineering major skilled in tokenization and system-on-chip design. Assists with front-end development and implements parts of the spider framework.'
		},
		{
			name: 'Blayten Jones',
			role: 'Project Management & Integration',
			description:
				'A senior double major in CS and CEng, experienced in natural language processing. Manages project specifications, creates query similarity algorithms, and integrates various components.'
		}
	];
</script>

<svelte:head>
	<title>Team - Re:Search</title>
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
		<h2>Meet the Team</h2>
		<div class="team-grid">
			{#each teamMembers as member}
				<div class="team-card">
					<h3>{member.name}</h3>
					<p class="role">{member.role}</p>
					<p>{member.description}</p>
				</div>
			{/each}
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
		font-family: 'Montserrat', sans-serif; /* Change to any font you prefer */
	}

	.nav-links ul li {
		display: inline;
		font-family: 'Montserrat', sans-serif; /* Change to any font you prefer */
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
		max-width: 900px;
		width: 90%;
		text-align: center;
	}
	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		margin-top: 20px;
	}
	.team-card {
		background: rgba(255, 255, 255, 0.1);
		padding: 1rem;
		border-radius: 8px;
		transition: transform 0.3s ease;
	}
	.team-card:hover {
		transform: translateY(-5px);
	}
	.team-card img {
		width: 100%;
		border-radius: 50%;
		margin-bottom: 10px;
	}
	.role {
		font-style: italic;
		color: #ffbf59;
		margin-bottom: 0.5rem;
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
