import { useState } from "react";
import "./ResumeBuilder.css";
import { v4 as uuidv4 } from "uuid";
import emailsvg from "./assets/email.svg";
import phonesvg from "./assets/phone.svg";
import locationsvg from "./assets/location.svg";
import Personal from "./components/Personal";
import Educations from "./components/Education";
import Experiences from "./components/Experience";
import Skills from "./components/Skills";

function EditDetails({
  personalState,
  educationState,
  experienceState,
  skillsState,
}) {
  return (
    <div className="edit-details">
      <ResetOptions
        aboutMe={personalState[0].about}
        skills={skillsState[0]}
        experience={experienceState[0]}
        setPersonal={personalState[1]}
        setEducations={educationState[1]}
        setExperiences={experienceState[1]}
        setSkills={skillsState[1]}
      />
      <Personal personal={personalState[0]} setPersonal={personalState[1]} />
      <Educations
        educations={educationState[0]}
        setEducations={educationState[1]}
      />
      <Experiences
        experiences={experienceState[0]}
        setExperiences={experienceState[1]}
      />
      <Skills skills={skillsState[0]} setSkills={skillsState[1]} />
    </div>
  );
}

function ResetOptions({
  aboutMe,
  skills,
  experience,
  setPersonal,
  setEducations,
  setExperiences,
  setSkills,
}) {
  function clearResume() {
    document.querySelector(".clear").classList.add("animate");
    document
      .querySelector(".clear")
      .addEventListener("animationend", () =>
        document.querySelector(".clear").classList.remove("animate"),
      );
    setPersonal({});
    setEducations([]);
    setExperiences([]);
    setSkills([]);
  }

  function loadExample() {
    document.querySelector(".load").classList.add("animate");
    document
      .querySelector(".load")
      .addEventListener("animationend", () =>
        document.querySelector(".load").classList.remove("animate"),
      );
    const examplePersonal = {
      name: "John Doe",
      email: "johndoe@abc.com",
      phone: "1234567890",
      address: "City, Country",
      about:
        "I am a motivated Computer Science student with a strong background in software development and a passion for building intuitive user experiences. With experience in JavaScript, React, and Node.js, I enjoy solving real-world problems through efficient and creative code. I thrive in collaborative environments and am always eager to learn and grow. My goal is to contribute meaningfully to impactful tech projects and become a full-stack developer.",
    };
    const exampleEducations = [
      {
        school: "ABC University",
        degree: "Example Degree 1",
        startdate: "01/2001",
        enddate: "02/2002",
      },
      {
        school: "DEF University",
        degree: "Example Degree 2",
        startdate: "03/2003",
        enddate: "04/2004",
      },
    ];
    const exampleExperiences = [
      {
        title: "Software Engineering Intern",
        description:
          "Completed a 3-month internship at ABC Technologies (May 2024 – July 2024), where I contributed to building scalable web applications using React, Node.js, and MongoDB. Developed dynamic UI components, collaborated in Agile sprints, and optimized backend APIs, resulting in a 30% improvement in load time.",
      },
      {
        title: "Machine Learning Research Assistant",
        description:
          "Worked as a research assistant at DEF University (Jan 2024 – Apr 2024), focusing on developing deep learning models for image classification using TensorFlow. Handled data preprocessing, model training, and evaluation, leading to a 15% increase in prediction accuracy for the published prototype.",
      },
    ];
    const exampleSkills = ["JavaScript", "React", "CSS"];
    setPersonal(examplePersonal);
    setEducations(exampleEducations);
    setExperiences(exampleExperiences);
    setSkills(exampleSkills);
  }

  async function aiEnhance() {
    const res = await fetch("/api/ai_enhance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aboutMe, skills, experience }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div className="reset-options">
      <button className="clear" onClick={clearResume}>
        Clear Resume
      </button>
      <button className="load" onClick={loadExample}>
        Load Example
      </button>
      <button className="print" onClick={() => window.print()}>
        Print Resume
      </button>
      <button className="ai" onClick={aiEnhance}>
        Enhance with AI
      </button>
    </div>
  );
}

function DisplayResume({ personal, educations, experiences, skills }) {
  const educationComponents = educations.map((education) => (
    <div key={uuidv4()} className="education">
      <div className="date">
        {education.startdate} - {education.enddate}
      </div>
      <div className="details">
        <div className="school">{education.school}</div>
        <div className="degree">{education.degree}</div>
      </div>
    </div>
  ));

  const experienceComponents = experiences.map((experience) => (
    <div key={uuidv4()} className="experience">
      <p>
        <span>{experience.title + ": "}</span>
        {experience.description}
      </p>
    </div>
  ));

  return (
    <div className="display-resume">
      <div className="header">
        <div className="name">{personal.name}</div>
        <div className="contact">
          {personal.email && (
            <div className="email">
              <img src={emailsvg} alt="" />
              {personal.email}
            </div>
          )}
          {personal.phone && (
            <div className="phone">
              <img src={phonesvg} alt="" />
              {personal.phone}
            </div>
          )}
          {personal.address && (
            <div className="address">
              <img src={locationsvg} alt="" />
              {personal.address}
            </div>
          )}
        </div>
      </div>
      <div className="about-me">
        {personal.about && (
          <div className="about">
            <div className="title">About Me</div>
            <p>{personal.about}</p>
          </div>
        )}
      </div>
      <div className="skills-education">
        <div className="skills-info">
          {skills && skills.length > 0 && (
            <>
              <div className="title">Skills</div>
              <ul
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.7rem",
                  marginTop: "1rem",
                }}
              >
                {skills.map((skill) => (
                  <li
                    key={skill}
                    style={{
                      background: "#eee",
                      color: "#222",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "1rem",
                      listStyle: "none",
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="education-info">
          {educationComponents.length > 0 && (
            <div className="title">Education</div>
          )}
          {educationComponents.length > 0 && educationComponents}
        </div>
      </div>
      <div className="experience-info">
        {experienceComponents.length > 0 && (
          <div className="title">Experience</div>
        )}
        {experienceComponents.length > 0 && experienceComponents}
      </div>
    </div>
  );
}

function ResumeBuilder() {
  const [personal, setPersonal] = useState({
    name: "John Doe",
    email: "johndoe@abc.com",
    phone: "1234567890",
    address: "City, Country",
    about:
      "I am a motivated Computer Science student with a strong background in software development and a passion for building intuitive user experiences. With experience in JavaScript, React, and Node.js, I enjoy solving real-world problems through efficient and creative code. I thrive in collaborative environments and am always eager to learn and grow. My goal is to contribute meaningfully to impactful tech projects and become a full-stack developer.",
  });
  const [educations, setEducations] = useState([
    {
      school: "ABC University",
      degree: "Example Degree 1",
      startdate: "01/2001",
      enddate: "02/2002",
    },
    {
      school: "DEF University",
      degree: "Example Degree 2",
      startdate: "03/2003",
      enddate: "04/2004",
    },
  ]);
  const [experiences, setExperiences] = useState([
    {
      title: "Software Engineering Intern",
      description:
        "Completed a 3-month internship at ABC Technologies (May 2024 – July 2024), where I contributed to building scalable web applications using React, Node.js, and MongoDB. Developed dynamic UI components, collaborated in Agile sprints, and optimized backend APIs, resulting in a 30% improvement in load time.",
    },
    {
      title: "Machine Learning Research Assistant",
      description:
        "Worked as a research assistant at DEF University (Jan 2024 – Apr 2024), focusing on developing deep learning models for image classification using TensorFlow. Handled data preprocessing, model training, and evaluation, leading to a 15% increase in prediction accuracy for the published prototype.",
    },
  ]);
  const [skills, setSkills] = useState(["JavaScript", "React", "CSS"]);
  return (
    <>
      <div className="header">MakeMyResume</div>
      <div className="resume-content">
        <EditDetails
          personalState={[personal, setPersonal]}
          educationState={[educations, setEducations]}
          experienceState={[experiences, setExperiences]}
          skillsState={[skills, setSkills]}
        />
        <DisplayResume
          personal={personal}
          educations={educations}
          experiences={experiences}
          skills={skills}
        />
      </div>
    </>
  );
}

export default ResumeBuilder;
