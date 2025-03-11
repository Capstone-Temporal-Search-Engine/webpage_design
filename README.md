# 🌐 Temporal Search Engine

A **Wayback Machine-style search engine** that allows users to search through archived web pages and view their **titles** before clicking.

## 🚀 Features

- **🔎 Search archived web pages** based on a time range.
- **📄 Display real page titles** extracted from saved HTML files.
- **⚡ Direct access to archived content** with proper CORS policy configuration.
- **🖥️ Fully functional locally** (no backend deployment required).

---

## 📁 Project Structure

```
/temporal-engine
├── /frontend    # Svelte app (User interface)
├── /public      # Static assets (if any)
├── README.md    # Project documentation
└── package.json # Dependencies & scripts
```

---

## 🛠 Setup & Installation

### 1️⃣ Clone the Project

```sh
git clone https://github.com/your-username/temporal-engine.git
cd temporal-engine
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Running the Project Locally

Start the Svelte Frontend:

```sh
cd frontend
npm run dev
```

The frontend runs at http://localhost:5173.

## 🔄 How It Works

1. The user searches for a term in the Svelte frontend.
2. The frontend requests search results from http://13.59.202.16/retrieve.
3. Each result includes a saved HTML file URL from S3.
4. The frontend directly accesses the HTML files from S3 thanks to proper CORS configuration.
5. The application extracts:
   - The page title (from the `<title>` tag).
6. The Svelte app displays the search results with the real metadata.

## ⚙️ Configurations

### Frontend (frontend/src):

- Uses `fetch()` to retrieve HTML content directly from S3.
- Dynamically extracts metadata from the HTML.
- Updates the search results UI with the extracted information.

### S3 Bucket (AWS):

- Stores saved HTML snapshots.
- Has CORS policy configured to allow direct access from the frontend application.
- Configuration example:
  ```json
  [
  	{
  		"AllowedHeaders": ["*"],
  		"AllowedMethods": ["GET"],
  		"AllowedOrigins": ["http://localhost:5173", "https://your-production-domain.com"],
  		"ExposeHeaders": []
  	}
  ]
  ```

## 📌 Notes

- **CORS Configuration**: The S3 bucket has been configured with appropriate CORS settings to allow direct access from the frontend.
- **Simplified Architecture**: By removing the proxy server, the application has a simpler architecture and deployment process.

## 📜 License

This project is open-source. Feel free to modify and contribute!

## 👨‍💻 Contributors

### 🔥 Sankalp Pandey – Svelte Developer & System Integrator

- **Rebuilt the project in Svelte** to improve interactivity and performance.
- Implemented **direct S3 HTML fetching** to dynamically extract webpage titles.
- Developed **new pages** (About, Team, and Help) for a more complete user experience.
- Enhanced **navigation and user flow**, improving overall **quality-of-life (QoL) features**.

### 🛠 Alexander Wells – Frontend Foundation & Initial UI Developer

- Designed and developed the **base HTML framework** for the project.
- Built the **initial search UI & dock system** to retrieve and display archived web pages.
- Established the **foundation for searching & rendering saved pages**.

## 💡 Future Improvements

- Enhance the UI design for a better user experience.
- Optimize search algorithms for faster queries.
- Add more detailed metadata extraction capabilities.

Happy coding!
