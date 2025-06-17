# Resume Builder with AI Enhancement

---

## Live Demo

Experience the app live: [makemyresume.vercel.app](https://makemyresume.vercel.app/)

---

## Overview

The Resume Builder is a modern web application designed to help users create professional and impactful resumes with ease. It provides a user-friendly interface for inputting personal details, education, experience, and skills. A key feature of this builder is its integration with the Google Gemini AI, which offers intelligent suggestions to enhance the quality and impact of the resume content, helping users stand out to potential employers.

## Features

* **Intuitive User Interface:** Easily input and manage all sections of your resume.
* **Real-time Preview:** See your resume take shape instantly as you type.
* **AI-Powered Content Improvement:** Leverage the Google Gemini API to get suggestions for:
    * Rewriting bullet points for stronger impact.
    * Improving clarity and conciseness of descriptions.
    * Optimizing language for professionalism.
* **Print-Ready Format:** Generate a clean, printable version of your resume.
* **Local Storage Persistence:** Your resume data is saved locally in your browser, so you can continue editing even after closing the tab.
* **Load Example Data:** Quickly populate the builder with sample data to get started or see a reference.
* **Clear All Data:** Reset the builder to an empty state.

## Technologies Used

* **Frontend:**
    * **React:** A declarative, component-based JavaScript library for building user interfaces.
    * **Vite:** A fast build tool that significantly improves the frontend development experience.
    * **CSS:** For custom styling and responsive design.
* **Backend (Serverless Function):**
    * **Node.js:** JavaScript runtime environment.
    * **Vercel Serverless Functions:** For hosting the backend logic that interacts with the AI.
* **AI Integration:**
    * **Google Gemini API (`gemini-1.5-flash`):** Used for intelligent content generation and improvement.
* **Deployment:**
    * **Vercel:** Platform for static sites and serverless functions, enabling seamless continuous deployment.

## AI Integration Details

The application utilizes a Vercel Serverless Function to securely communicate with the Google Gemini API. When a user requests AI assistance (e.g., to improve a section), the serverless function sends the resume content (or a specific section) to the `gemini-1.5-flash` model. The model then processes the request based on carefully crafted prompts, offering improved, more impactful, and professional wording, which is then sent back to the client and presented to the user. This ensures sensitive API keys are never exposed on the client-side.

## Getting Started

Follow these steps to set up and run the Resume Builder locally on your machine.

### Prerequisites

* **Node.js:** Ensure you have Node.js (v18 or higher recommended) installed. You can download it from [nodejs.org](https://nodejs.org/).
* **Vercel CLI:** For local development and testing of serverless functions:
    ```bash
    npm install -g vercel
    ```

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/InnovatorCodes/resume_builder.git](https://github.com/InnovatorCodes/resume_builder.git)
    ```

2.  **Navigate into the project directory:**

    ```bash
    cd resume_builder
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

### Environment Variables

To connect to the Google Gemini API, you need an API key.

1.  **Get a Gemini API Key:**
    * Go to [Google AI Studio](https://aistudio.google.com/).
    * Log in with your Google account.
    * Generate a new API key.
2.  **Create a `.env` file:**
    * In the root of your project directory, create a file named `.env`.
    * Add your Gemini API key to this file:
        ```
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
        ```
        Replace `YOUR_GEMINI_API_KEY_HERE` with the actual key you obtained.
3.  **Configure on Vercel:**
    * For your deployed app to work, you **must** also add this environment variable in your Vercel project settings:
        * Go to your **Vercel Dashboard**.
        * Select your **Project**.
        * Go to **Settings > Environment Variables**.
        * Add `GEMINI_API_KEY` with its value for the relevant environments (e.g., "Production", "Preview", "Development").