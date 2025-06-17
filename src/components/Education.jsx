import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import expandsvg from "../assets/expand.svg";
import editsvg from "../assets/edit.svg";
import deletesvg from "../assets/delete.svg";

export default function Educations({ educations, setEducations }) {
  const [isVisible, setIsVisible] = useState(false);
  let editIndex = null;
  const educationComponents = educations.map((education, index) => (
    <div className="education" key={uuidv4()}>
      <div className="school">{education.school}</div>
      <button className="editbtn">
        <img
          src={editsvg}
          alt="Edit Education"
          onClick={() => editEducationDetails(index)}
        />
      </button>
      <button className="deletebtn">
        <img
          src={deletesvg}
          alt="Delete Experience"
          onClick={() => removeEducation(index)}
        />
      </button>
    </div>
  ));
  function changeVisibility() {
    setIsVisible(!isVisible);
  }

  function addEducation() {
    const editDialog = document.querySelector("dialog.edit-education");
    editDialog.querySelector('h1').textContent = "Add Education";
    editDialog.querySelector("#school").classList.remove("touched");
    editDialog.querySelector("#degree").classList.remove("touched");
    editDialog.querySelector("#start-date").classList.remove("touched");
    editDialog.querySelector("#end-date").classList.remove("touched");
    editDialog.querySelector("#school").value = "";
    editDialog.querySelector("#degree").value = "";
    editDialog.querySelector("#start-date").value = "";
    editDialog.querySelector("#end-date").value = "";
    editDialog.showModal();
  }

  function editEducationDetails(index) {
    editIndex = index;
    const editDialog = document.querySelector("dialog.edit-education");
    editDialog.querySelector('h1').textContent = "Edit Education";
    editDialog.querySelector("#school").value = educations[index].school;
    editDialog.querySelector("#degree").value = educations[index].degree;
    editDialog.querySelector("#start-date").value = educations[index].startdate;
    editDialog.querySelector("#end-date").value = educations[index].enddate;
    editDialog.showModal();
  }

  function saveEducation() {
    let newEducations = [...educations];
    const editDialog = document.querySelector("dialog.edit-education");
    editDialog.querySelector("#school").classList.add("touched");
    editDialog.querySelector("#degree").classList.add("touched");
    editDialog.querySelector("#start-date").classList.add("touched");
    editDialog.querySelector("#end-date").classList.add("touched");
    let school = editDialog.querySelector("#school").value;
    let degree = editDialog.querySelector("#degree").value;
    let startdate = editDialog.querySelector("#start-date").value;
    let enddate = editDialog.querySelector("#end-date").value;
    if (school == "" || degree == "" || startdate == "" || enddate == "")
      return;
    let newEducation = {
      school,
      degree,
      startdate,
      enddate,
    };
    if (editIndex != null) newEducations[editIndex] = newEducation;
    else newEducations.push(newEducation);
    editIndex = null;
    setEducations(newEducations);
  }

  function EditEducation() {
    return (
      <dialog className="edit-education">
        <h1>Edit Education</h1>
        <div className="school">
          <label htmlFor="school">School (required)</label>
          <input type="text" name="school" id="school" required />
        </div>
        <div className="degree">
          <label htmlFor="degree">Degree (required)</label>
          <input type="text" name="degree" id="degree" required />
        </div>
        <div className="startdate">
          <label htmlFor="start-date">Start Date (required)</label>
          <input type="tel" name="startdate" id="start-date" required />
        </div>
        <div className="enddate">
          <label htmlFor="end-date">End Date (required)</label>
          <input type="text" name="enddate" id="end-date" required />
        </div>
        <div className="buttons">
          <button
            onClick={() =>
              document.querySelector("dialog.edit-education").close()
            }
            className="cancel"
          >
            Cancel
          </button>
          <button type="submit" onClick={saveEducation} className="save">
            Save
          </button>
        </div>
      </dialog>
    );
  }

  function removeEducation(removeIndex) {
    let newEducations = [...educations];
    newEducations.splice(removeIndex, 1);
    setEducations(newEducations);
  }

  return (
    <div className="educations">
      <div className="title">
        <h1>Education</h1>
        <button className="expand" onClick={changeVisibility}>
          <img
            src={expandsvg}
            className={isVisible ? "expanded" : ""}
            alt="Expand Educations"
          />
        </button>
      </div>
      <div className={isVisible ? "educationList expanded" : "educationList"}>
        {isVisible && educationComponents}
      </div>
      {isVisible && (
        <button className="add-education" onClick={addEducation}>
          + Add Education
        </button>
      )}
      <EditEducation />
    </div>
  );
}
