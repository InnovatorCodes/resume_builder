# AI-Powered Resume Builder

---

## Overview

Welcome to the **AI-Powered Resume Builder**! This application helps you craft professional and impactful resumes with the assistance of Artificial Intelligence. Built using **React** with **Vite** for a fast and modern frontend, it leverages **Vercel Serverless Functions** to integrate with the **Google Gemini API**, providing intelligent content suggestions and improvements for your resume sections.

Beyond just a static builder, this tool aims to elevate your resume by offering real-time, AI-driven advice on language, clarity, and impact, helping you stand out to recruiters and Applicant Tracking Systems (ATS).

## Features

* **Interactive Resume Editing:** Easily input and manage all standard resume sections (personal details, education, experience, skills, etc.).
* **AI Content Improvement:** Get intelligent suggestions for enhancing your resume's language, clarity, and impact, powered by the Google Gemini API.
* **Dynamic UI:** A responsive and intuitive user interface built with React.
* **Serverless Architecture:** Utilizes Vercel Serverless Functions for efficient and scalable API interactions.
* **Print Functionality:** Generate a print-ready version of your resume directly from the app.
* **Clear/Load Options:** Reset your resume or load a default example to get started quickly.

## Technologies Used

### Frontend

* **React:** A JavaScript library for building user interfaces.
* **Vite:** A fast build tool that provides a lightning-fast development experience for React applications.
* **CSS:** For styling the application, including media queries for responsiveness and print styles.

### Backend (Serverless Function)

* **Node.js:** JavaScript runtime environment.
* **Vercel Serverless Functions:** Platform to deploy server-side logic without managing servers.
* **Google Gemini API:** Utilized for AI-powered content generation and improvement (specifically `gemini-1.5-flash` or `gemini-2.0-flash` for optimal performance within the free tier).
* **`@google/generative-ai`:** Official Node.js client library for interacting with the Gemini API.

## Getting Started

Follow these instructions to set up and run the project locally, and deploy it to Vercel.

---

### Prerequisites

* **Node.js:** Ensure you have Node.js (v18 or later recommended) installed. You can download it from [nodejs.org](https://nodejs.org/).
* **Google Gemini API Key:** Obtain an API key from [Google AI Studio](https://aistudio.google.com/). This key will be used by your serverless function.
* **Vercel CLI:** Install the Vercel command-line interface globally:
    ```bash
    npm install -g vercel
    ```

---

### Installation (Local)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/InnovatorCodes/resume_builder.git
    ```

2.  **Navigate into the project directory:**

    ```bash
    cd resume_builder
    ```

3.  **Install frontend and backend (serverless function) dependencies:**

    ```bash
    npm install
    ```

4.  **Create a `.env` file in the project root:**

    ```
    touch .env
    ```

5.  **Add your Gemini API key to the `.env` file:**

    ```
    GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY_HERE
    ```
    Replace `YOUR_GOOGLE_GEMINI_API_KEY_HERE` with your actual API key.

---

### Running the Application (Local Development)

To run the React app and simulate the Vercel serverless environment locally:

1.  **Start the development server using Vercel CLI:**

    ```bash
    vercel dev
    ```

2.  **Open your browser:**

    Visit `http://localhost:3000` (or the port indicated by `vercel dev`) to access the AI-Powered Resume Builder. The AI features will be fully functional, communicating with your local serverless function.

---