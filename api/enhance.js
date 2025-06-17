// api/improveResume.js (or api/index.js if you prefer)

import dotenv from "dotenv";
dotenv.config(); // Loads environment variables from .env if running locally

// Import the Google Generative AI client library
// You might need to install this: npm install @google/generative-ai
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Ensure the request is a POST request
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }

  // Extract the resume object from the request body
  const { resume,comments } = req.body;



  // Validate the resume object
  if (!resume || typeof resume !== "object" || Object.keys(resume).length === 0) {
    return res.status(400).json({ error: "Missing or invalid resume object. It must be a non-empty JSON object." });
  }

  // Initialize the Google Generative AI client
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error("GEMINI_API_KEY environment variable is not set.");
    return res.status(500).json({ error: "Server configuration error: API key missing." });
  }
  const genAI = new GoogleGenerativeAI(geminiApiKey);

  // Define the model you want to use
  // 'gemini-1.5-flash' is a good balance of cost and quality for this task.
  // Always check the latest available models and their free tier usage on Google AI Studio.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Construct the prompt for the AI
  // We'll instruct the model to act as a resume writer and return JSON.
  const prompt = `You are a professional resume writer.
The user has provided a resume as a JSON object with fields such as "skills", "aboutMe", "experience", "education" and "personal"
Your task is to improve the content in each section using better language, clarity, and impact.
Keep description for experience in a paragraph form.
Ensure the tone is professional and concise.

Return your response strictly as a JSON object with the exact same top-level keys as the input, containing the updated values. Do not change the structure in any way or form.
The user may provide additional information for you to incorporate or fill into the missing fields of the sections.
Leave out unrelated and unnecessary information from user comments. I have attached the user comments after the resume JSON with a demarkation of '--- USER COMMENTS ---'
Modify education only if necessary when certain education data is missing in the resume JSON but the user has provided the information in additional comments
Do NOT include any explanations, markdown code blocks, or formatting outside of the JSON structure itself.
Examples of sections:
"personal": {
  name: "John Doe",
  email: "johndoe@abc.com",
  phone: "1234567890",
  address: "City, Country",
  about: "I am a motivated Computer Science student.",
}
"education": [
  {
    school: "ABC University",
    degree: "Example Degree 1",
    startdate: "01/2001",
    enddate: "02/2002",
  },
]
"skills": ["React", "CSS"]
"experience": [
  {
    "title": "Software Engineer",
    "description": "Developed scalable web applications using React and Node.js."
  },
]

Here is the user's resume JSON to improve:
${JSON.stringify(resume, null, 2)}

--- USER COMMENTS ---
${comments || "None"}
`;

  try {
    // Send the prompt to the Gemini API
    // We combine the system prompt with the user's resume data in a single 'user' message part
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7, // A bit higher temperature can encourage more creative improvements
        maxOutputTokens: 2000, // Adjust based on expected output size, 800 might be too small for a full resume
        responseMimeType: "application/json" // Crucial for instructing Gemini to return JSON
      },
    });

    // Check if result is available and has candidates
    if (!result || !result.response || !result.response.candidates || result.response.candidates.length === 0) {
      console.error("Gemini API returned no candidates:", result);
      return res.status(500).json({ error: "No valid response from Gemini API" });
    }

    // Extract the text content from the Gemini response
    const jsonString = result.response.candidates[0].content.parts[0].text;

    // Try parsing the returned JSON to ensure it's valid
    let updatedResume;
    try {
      updatedResume = JSON.parse(jsonString);
    } catch (err) {
      console.error("Error parsing Gemini's JSON response:", err, "Raw response:", jsonString);
      return res.status(500).json({ error: "Gemini returned malformed JSON", raw: jsonString });
    }

    // Send the improved resume back to the client
    res.status(200).json({ updatedResume });

  } catch (err) {
    // Catch any errors during the API request or processing
    console.error("Error interacting with Gemini API:", err);
    // You might want to distinguish between network errors and API errors (e.g., rate limits)
    res.status(500).json({ error: "Gemini API request failed.", details: err.message });
  }
}