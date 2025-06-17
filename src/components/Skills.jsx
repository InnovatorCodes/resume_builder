import { useState } from "react";
import addsvg from "../assets/add.svg";

function Skills({ skills, setSkills }) {
  const [input, setInput] = useState("");

  function addSkill(e) {
    e.preventDefault();
    if (input.trim() && !skills.includes(input.trim())) {
      setSkills([...skills, input.trim()]);
      setInput("");
    }
  }

  function removeSkill(skill) {
    setSkills(skills.filter((s) => s !== skill));
  }

  return (
    <div className="skills">
      <div className="title">
        <h1>Skills</h1>
      </div>
      <form onSubmit={addSkill} style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a skill"
        />
        <button type="submit">
          <img src={addsvg} alt="Add Skill" />
        </button>
      </form>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        {skills.map((skill) => (
          <li
            className="skill-item"
            key={skill}
            style={{
              background: "#eee",
              display: "flex",
              alignItems: "center",
            }}
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              style={{
                marginLeft: "0.5rem",
                color: "red",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
