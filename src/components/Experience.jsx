import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import expandsvg from "../assets/expand.svg";
import editsvg from "../assets/edit.svg";
import deletesvg from "../assets/delete.svg";

export default function Experiences({ experiences, setExperiences }) {
  const [visibility, setVisibility] = useState(false);
  let editIndex = null;
  const experienceComponents = experiences.map((experience, index) => (
    <div className="experience" key={uuidv4()}>
      <div className="title">{experience.title}</div>
      <button className="editbtn">
        <img
          src={editsvg}
          alt="Edit Experience"
          onClick={() => editExperienceDetails(index)}
        />
      </button>
      <button className="deletebtn">
        <img
          src={deletesvg}
          alt="Delete Experience"
          onClick={() => removeExperience(index)}
        />
      </button>
    </div>
  ));

  function changeVisibility() {
    setVisibility(!visibility);
  }

  function addExperience() {
    editIndex = null;
    const editDialog = document.querySelector("dialog.edit-experience");
    editDialog.querySelector("#title").value = "";
    editDialog.querySelector("#description").value = "";
    editDialog.showModal();
  }

  function editExperienceDetails(index) {
    editIndex = index;
    const editDialog = document.querySelector("dialog.edit-experience");
    editDialog.querySelector("#title").value = experiences[index].title;
    editDialog.querySelector("#description").value =
      experiences[index].description;
    editDialog.showModal();
  }

  function saveExperience() {
    const editDialog = document.querySelector("dialog.edit-experience");
    let newExperiences = [...experiences];
    editDialog.querySelector("#title").classList.add("touched");
    editDialog.querySelector("#description").classList.add("touched");
    let title = editDialog.querySelector("#title").value;
    let description = editDialog.querySelector("#description").value;
    if (title == "" || description == "") return;
    let newExperience = {
      title,
      description,
    };
    if (editIndex != null) newExperiences[editIndex] = newExperience;
    else newExperiences.push(newExperience);
    editIndex = null;
    setExperiences(newExperiences);
  }

  function EditExperience() {
    return (
      <dialog className="edit-experience">
        <h1>Edit Experience</h1>
        <div className="title">
          <label htmlFor="title">Title (required)</label>
          <input type="text" name="title" id="title" required />
        </div>
        <div className="description">
          <label htmlFor="description">Description (required)</label>
          <textarea name="description" id="description" />
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              editIndex = null;
              document.querySelector("dialog.edit-experience").close();
            }}
            className="cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => saveExperience()}
            className="save"
          >
            Save
          </button>
        </div>
      </dialog>
    );
  }

  function removeExperience(removeIndex) {
    let newExperiences = [...experiences];
    newExperiences.splice(removeIndex, 1);
    setExperiences(newExperiences);
  }

  return (
    <div className="experiences">
      <div className="title">
        <h1>Experience</h1>
        <button className="expand" onClick={changeVisibility}>
          <img
            src={expandsvg}
            className={visibility ? "expanded" : ""}
            alt="Expand Experiences"
          />
        </button>
      </div>
      <div
        className={visibility ? "experienceList expanded" : "experienceList"}
      >
        {visibility && experienceComponents}
      </div>
      {visibility && (
        <button className="add-experience" onClick={addExperience}>
          + Add Experience
        </button>
      )}
      <EditExperience />
    </div>
  );
}
