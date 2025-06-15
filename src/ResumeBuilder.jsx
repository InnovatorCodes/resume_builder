import { useState } from "react";
import "./ResumeBuilder.css";
import { v4 as uuidv4 } from "uuid";
import emailsvg from "./assets/email.svg";
import phonesvg from "./assets/phone.svg";
import locationsvg from "./assets/location.svg";
import Personal from "./components/Personal";
import Educations from "./components/Education";
import Experiences from "./components/Experience";

function EditDetails({ personalState, educationState, experienceState }) {
  return (
    <div className="edit-details">
      <ResetOptions
        setPersonal={personalState[1]}
        setEducations={educationState[1]}
        setExperiences={experienceState[1]}
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
    </div>
  );
}

function ResetOptions({ setPersonal, setEducations, setExperiences }) {
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
        company: "ABC Global",
        position: "Example Position 1",
        description: "abc",
        startdate: "05/2005",
        enddate: "06/2006",
      },
      {
        company: "DEF Global",
        position: "Example Position 2",
        description: "def",
        startdate: "07/2007",
        enddate: "present",
      },
    ];
    setPersonal(examplePersonal);
    setEducations(exampleEducations);
    setExperiences(exampleExperiences);
  }

  return (
    <div className="reset-options">
      <button className="clear" onClick={clearResume}>
        Clear Resume
      </button>
      <button className="load" onClick={loadExample}>
        Load Example
      </button>
      <button className="print"
        onClick={() => window.print()}>
        Print Resume
      </button>
    </div>
  );
}

function DisplayResume({ personal, educations, experiences }) {
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
    <div key={uuidv4()} className="education">
      <div className="date">
        {experience.startdate} - {experience.enddate}
      </div>
      <div className="details">
        <div className="school">{experience.company}</div>
        <div className="degree">{experience.position}</div>
        <div className="description">{experience.description}</div>
      </div>
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
      <div className="education-info">
        {educationComponents.length > 0 && (
          <div className="title">Education</div>
        )}
        {educationComponents.length > 0 && educationComponents}
      </div>
      <div className="experience-info">
        {experienceComponents.length > 0 && (
          <div className="title"> Professional Experience</div>
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
      company: "ABC Global",
      position: "Example Position 1",
      description: "abc",
      startdate: "05/2005",
      enddate: "06/2006",
    },
    {
      company: "DEF Global",
      position: "Example Position 2",
      description: "def",
      startdate: "07/2007",
      enddate: "present",
    },
  ]);
  return (
    <>
      <div className="header">MakeMyResume</div>
      <div className="resume-content">
        <EditDetails
          personalState={[personal, setPersonal]}
          educationState={[educations, setEducations]}
          experienceState={[experiences, setExperiences]}
        />
        <DisplayResume
          personal={personal}
          educations={educations}
          experiences={experiences}
        />
      </div>
    </>
  );
}

export default ResumeBuilder;
