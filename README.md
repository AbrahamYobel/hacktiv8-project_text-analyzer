# Text Analyzer Web App

A full-stack web application that analyzes input text using AI, classifies it into categories, and provides a short summary. Built using React for the frontend and Node.js/Express for the backend with Replicate API integration.

---

## 🧠 Features

- Text input and analysis using IBM Granite model via Replicate API
- AI-generated category classification and summarization
- Analysis history with timestamps
- Option to delete individual history entries
- Responsive frontend (mobile-friendly)

---

## 📦 Folder Structure

```
hacktiv8-project/
├── text-analyzer/         # Express backend
│   └── App.js
│   └── .env           # For REPLICATE_API_TOKEN
├── my-replicate-app/       # React frontend
│   └── index.js
└── README.md
```

---

## ⚙️ Backend Setup (Node.js + Express)

### 1. Install Dependencies

Navigate to the backend directory:
```bash
cd my-replicate-app
npm install express cors dotenv uuid
```

### 2. Create `.env` File

Add your Replicate API key:

```env
REPLICATE_API_TOKEN=your_replicate_api_key_here
```

### 3. Run Backend

```bash
node index.js
```

The server runs on: `http://localhost:3001`

---

## 💻 Frontend Setup (React.js)

### 1. Install Dependencies

Navigate to the React project directory:

```bash
cd text-analyzer
npm install axios
```

### 2. Run Frontend

```bash
npm start
```

Runs on: `http://localhost:3000`

Make sure both frontend and backend are running simultaneously.

---

## 🛠 Technologies Used

- **Frontend:** React, Axios, Tailwind (optional classes), Responsive Hooks
- **Backend:** Node.js, Express.js, CORS, dotenv, uuid
- **AI Integration:** Replicate API (IBM Granite 3.3 8B Instruct)

---

## 📌 Notes

- This app stores analysis history in memory only (non-persistent).
- To persist history, connect it to a database (e.g., MongoDB or SQLite).
- Ensure CORS and port compatibility when deploying.

---


"# hacktiv8-project_text-analyzer" 
"# hacktiv8-project_text-analyzer" 
"# hacktiv8-project_text-analyzer" 
"# hacktiv8-project_text-analyzer" 
