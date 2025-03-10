import express from "express";
import axios from "axios";
import cors from "cors";
import { JSDOM } from "jsdom";

const app = express();
app.use(cors());

// Proxy route to fetch HTML and extract title
app.get("/fetch-title", async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Missing URL parameter" });
    }

    try {
        // Fetch HTML from S3
        const response = await axios.get(url);
        const dom = new JSDOM(response.data);
        const title = dom.window.document.title || "Title Unavailable";

        res.json({ title });
    } catch (error) {
        console.error("Error fetching title:", error);
        res.status(500).json({ error: "Failed to fetch title" });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
