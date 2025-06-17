import { useState } from "react";

function AIEnhancer({
  personal,
  education,
  experience,
  skills,
  comments,
  setComments,
  setAIContent,
  setAIModalOpen,
}) {
  async function aiEnhance() {
    const res = await fetch("/api/enhance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resume: { personal, education, experience, skills },
        comments,
      }),
    });
    const data = await res.json();
    setAIContent(data.updatedResume || JSON.stringify(data, null, 2));
    setAIModalOpen(true);
  }
  const [loading, setLoading] = useState(false);
  return (
    <div className="ai-enhancer">
      <div>
        You can provide specific instructions for the AI or more details about
        yourself, such as &ldquo;Make my experience section more concise&ldquo;,
        &ldquo;Use a more formal tone&ldquo;, or &ldquo;Highlight leadership
        skills&ldquo;. Leave blank for general improvements.
      </div>
      <textarea
        className="ai-comments"
        placeholder="Add comments or instructions for AI (optional)"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        style={{
          width: "100%",
          minHeight: "2.5rem",
          margin: "0.5rem 0",
          borderRadius: "0.5rem",
          padding: "0.5rem",
          fontSize: "1rem",
        }}
      />
      <button
        className="ai"
        onClick={() => {
          setLoading(true);
          aiEnhance().finally(() => setLoading(false));
        }}
        disabled={loading}
      >
        {loading ? "Enhancing..." : "Enhance with AI"}
      </button>
    </div>
  );
}

export default AIEnhancer;
