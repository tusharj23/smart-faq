# Smart FAQ Module for SARAS AI Institute

This project implements a smart FAQ module for the SARAS AI Institute website, designed to handle user queries and return the most relevant FAQ entries using fuzzy search. The backend is built using **Node.js** and **Express.js**, while **Fuse.js** is used to perform fuzzy searching on FAQ data. The frontend is expected to interact with this backend to display search results.

## Features

- **Fuzzy Search**: Searches through the FAQs using **Fuse.js** for intelligent query matching.
- **CORS Enabled**: Cross-origin requests are enabled to allow frontend-backend communication.
- **Express API**: An API that handles user search queries and returns either the best match or asks the user for query clarification.

## Folder Structure

- `backend/`: Contains the backend code (Express.js server).
  - `server.js`: The main Express server handling the API.
  - `faqs.json`: The JSON file containing all FAQ data.
- `frontend/`: Contains the frontend code (React app).

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/tusharj23/smart-faq
cd smart-faq
```

### 2. Run the backend
```bash
cd backend
node server.js
```

### 3. Run the frontend
```bash
cd frontend
npm start
```




