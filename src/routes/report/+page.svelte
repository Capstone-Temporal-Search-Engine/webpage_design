<script>
    let email = '';
    let websites = '';
    let reason = '';
    let proof = [];
    let submitted = false;

    async function handleSubmit(event){
        event.preventDefault();

        const formData = new FormData();
        formData.append('content_type', 'website');
        formData.append('priority', 'high');
        formData.append('content_url', websites);
        formData.append('email', email);
        formData.append('description', reason);
        for (let file of proof){
            formData.append('documents', file);
        }

        // put logic for uploading here
        const response = await fetch('http://127.0.0.1:5000/create-request', {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            throw new Error(`Server Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Form Submitted:", result);

        // display submission message
        submitted = true;
    }
</script>

<svelte:head>
    <title>Re:Search</title>
    <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
    />
</svelte:head>

<header class="navbar">
    <!-- Logo -->
    <h1 class="logo"><a href="/">Re:Search</a></h1>

    <!-- Desktop Navigation -->
    <nav class="nav-links">
        <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/help">Help</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/report">Takedown</a></li>
        </ul>
    </nav>
</header>

<main class="center_page">
    <div class="content-container">
        {#if !submitted}
            <div class="center_title">
                <h1>Takedown Request</h1>
            </div>

            <form on:submit|preventDefault={handleSubmit} class="form-container" style="flex-direction: column; gap: 1.5rem; align-items: stretch;">
                <!-- Email -->
                <div class="form">
                    <input class="input input-alt" type="email" placeholder="Your Email" bind:value={email} required />
                </div>

                <!-- Websites -->
                <div class="form">
                    <textarea class="input input-alt" placeholder="Website Link" bind:value={websites} rows="3" required></textarea>
                </div>

                <!-- Reason -->
                <div class="form">
                    <textarea class="input input-alt" placeholder="Reason For Takedown" bind:value={reason} rows="3" required></textarea>
                </div>

                <!-- Proof -->
                <div class="form">
                    <input class="input input-alt" type="file" multiple on:change="{e => proof = Array.from(e.target.files)}" />
                </div>

                <!-- Submit Button -->
                <button type="submit" class="search_button">Submit Takedown Request</button>
            </form>
        {:else}
            <div class="success-message">
                <h2>Takedown Request Submitted</h2>
                <p>Our content moderators will look through the information provided and get back with you as soon as possible!</p>
            </div>
        {/if}
    </div>
</main>

<style>
    /* Global Reset */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }

    .success-message {
        background-color: transparent;
        backdrop-filter: blur(15px);
        border-radius: 15px;
        padding: 30px;
        width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
        box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        animation: floatIn 0.8s ease-out;
        border: 1px solid rgba(250, 68, 68, 0.4);
    }

    .success-message h2 {
        font-size: 2rem;
        color: white;
        margin-bottom: 10px;
        text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
    }

    .success-message p {
        font-size: 1.1rem;
        color: rgb(235, 235, 235);
        line-height: 1.5;
        margin-top: 5px;
    }

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

    main {
        padding-top: 80px; /* Pushes content down so it doesn’t get hidden */
    }

    /* Background with Blur & Subtle Gradient */
    .center_page {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 200px;
        align-items: center;
        min-height: 100vh;
        position: relative;
        overflow: hidden;

        /* Animated Gradient */
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

    /* Gradient Animation */
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

    /* Floating Glass Effect */
    .search_box {
        background-color: transparent;
        backdrop-filter: blur(15px);
        border-radius: 15px;
        #box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        padding: 25px;
        width: 800px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        #border: 1px solid rgb(250, 68, 68);
        animation: floatIn 0.8s ease-out;
    }

    /* Updated Search Form */
    .form {
        position: relative;
        display: flex;
        align-items: center;
        border-radius: 20px;
        border: 1px solid transparent;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease-in-out;
    //padding: 5px;
        width: 100%;
        justify-content: center;
        text-color: white;
    }

    .form-container {
        position: relative;
        display: flex;
        align-items: center;
        /*border-radius: 20px;*/
        /*border: 1px solid transparent;*/
        /*backdrop-filter: blur(10px);*/
        /*transition: all 0.3s ease-in-out;*/
    //padding: 5px;
        width: 100%;
        justify-content: center;
        text-color: white;
    }

    /* Updated Input Field */
    .input {
        flex: 1;
        border-radius: 20px;
        outline: none;
        border: none;
        border-bottom: var(--border-height) solid var(--border-before-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-family:
                -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                'Helvetica Neue', sans-serif;
        background-color: #5b1c1c; /* Reddish tone */
        justify-content: center;
        color: white;
        padding: 10px 1rem;
        padding-right: 2.5rem; /* Space for reset button */
        transition: 0.25s ease-in-out;
        width: 100%;
    }

    .input-border {
        position: absolute;
        background: var(--border-after-color);
        width: 0%;
        height: 2px;
        bottom: 0;
        left: 0;
        transition: width 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
    }

    /* Input focus effect */
    .input:focus {
        outline: none;
    }

    .input:focus + .input-border {
        width: 100%;
    }

    .form-control {
        position: relative;
        --width-of-input: 300px;
    }

    .input-alt {
        font-size: 1.2rem;
        padding-inline: 1em;
        padding-block: 0.8em;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .input-border-alt {
        height: 3px;
        background: linear-gradient(90deg, #ff6464 0%, #ffbf59 50%, #47c9ff 100%);
        transition: width 0.4s cubic-bezier(0.42, 0, 0.58, 1);
    }

    .input-alt:focus + .input-border-alt {
        width: 100%;
    }
    .input::placeholder {
        color: rgb(151, 150, 150);
    }

    .form:hover {
        border: 1px solid rgba(246, 205, 155, 0.82);
    }

    /* Updated Reset Button */
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

    /* Show reset button only when input has text */
    .input:not(:placeholder-shown) ~ .reset {
        opacity: 1;
    }

    /* Remove default browser search cancel button */
    .input::-webkit-search-cancel-button {
        display: none;
    }

    /* Search Button */
    .search_button {
        background: linear-gradient(135deg, rgb(133, 29, 24), rgb(76, 20, 20));
        color: white;
        border: none;
        padding: 12px 20px;
        margin-top: 10px;
        border-radius: 10px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.2s ease;
        border: 1px solid rgb(250, 68, 68);
    }

    .search_button:hover {
        background: linear-gradient(135deg, rgb(49, 43, 43), rgb(215, 47, 5));
        transform: scale(1.05);
        box-shadow: 0px 4px 10px rgba(255, 8, 8, 0.3);
    }

    /* Date Selection */
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
        margin-top: 10px;
        background: #5b1c1c;
        color: white;
        font-size: 16px;
        outline: none;
        transition: all 0.3s ease;
        color-scheme: dark;
    }

    .search_date:hover,
    .search_date:focus {
        border-color: rgba(246, 205, 155, 0.82);
    //box-shadow: 0px 4px 10px rgba(100, 70, 37, 0.2);
    }

    .date_text {
        color: white;
        font-size: 18px;
        margin-top: 10px;
    }

    .logo {
        font-size: 40px;
        padding-top: 20px;
        padding-left: 20px;
    }

    /* Title */
    .center_title h1 {
        font-size: 3rem;
        color: white;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        animation: pulseGlow 2s infinite alternate;
    }

    .center_title a {
        text-decoration: none;
        color: white;
        transition: 0.3s;
    }

    .center_title a:hover {
        text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.8);
    }

    /* Title Animation */
    @keyframes pulseGlow {
        from {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        to {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
        }
    }
</style>