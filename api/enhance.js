export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }

  const { resume } = req.body;

  if (!resume || typeof resume !== "object") {
    return res.status(400).json({ error: "Missing or invalid resume object." });
  }

  const prompt = `You are a professional resume writer.
The user has provided a resume as a JSON object with fields such as "skills", "aboutMe", "experience", etc.
Improve the content in each section using better language, clarity, and impact.
Return your response strictly as a JSON object with the same keys and updated values.
Do NOT include any explanations or formatting outside of the JSON structure.`;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-1-nano",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: JSON.stringify(resume, null, 2) }
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    const data = await openaiRes.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: "No response from OpenAI" });
    }

    const jsonString = data.choices[0].message.content.trim();

    // Try parsing the returned JSON to ensure it's valid
    let updatedResume;
    try {
      updatedResume = JSON.parse(jsonString);
    } catch (err) {
        console.log(err);
      return res.status(500).json({ error: "OpenAI returned malformed JSON", raw: jsonString });
    }

    res.status(200).json({ updatedResume });
  } catch (err) {
    console.error("Error from OpenAI:", err);
    res.status(500).json({ error: "OpenAI API request failed." });
  }
}
