import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import expandsvg from './assets/expand.svg'
import editsvg from './assets/edit.svg';
import deletesvg from './assets/delete.svg';

export default function Experiences({experiences,setExperiences}){
    const [visibility,setVisibility]=useState(false);
    let editIndex=null;
    const experienceComponents=experiences.map((experience,index)=>
        <div className="experience" key={uuidv4()}>
            <div className="company">{experience.company}</div>
            <button><img src={editsvg} className="editbtn" alt="Edit Experience" onClick={()=>editExperienceDetails(index)} /></button>
            <button><img src={deletesvg} className="deletebtn" alt="Delete Experience" onClick={()=>removeExperience(index)} /></button>
        </div>
    )

    function changeVisibility(){
        setVisibility(!visibility);
    }

    function addExperience(){
        const editDialog=document.querySelector('dialog.edit-experience');
        editDialog.querySelector('#company').value='';
        editDialog.querySelector('#position').value='';
        editDialog.querySelector('#description').value='';
        editDialog.querySelector('#startdate').value='';
        editDialog.querySelector('#enddate').value='';
        editDialog.showModal();
    }
    
    function editExperienceDetails(index){
        editIndex=index; 
        const editDialog=document.querySelector('dialog.edit-experience');
        editDialog.querySelector('#company').value=experiences[index].company;
        editDialog.querySelector('#position').value=experiences[index].position;
        editDialog.querySelector('#description').value=experiences[index].description
        editDialog.querySelector('#startdate').value=experiences[index].startdate;
        editDialog.querySelector('#enddate').value=experiences[index].enddate;
        editDialog.showModal();
    }

    function saveExperience(){
        const editDialog=document.querySelector('dialog.edit-experience');
        let newExperiences=[...experiences];
        editDialog.querySelector('#company').classList.add('touched');
        editDialog.querySelector('#position').classList.add('touched');
        editDialog.querySelector('#description').classList.add('touched');
        editDialog.querySelector('#startdate').classList.add('touched');
        editDialog.querySelector('#enddate').classList.add('touched');
        let company= editDialog.querySelector('#company').value;
        let position= editDialog.querySelector('#position').value;
        let description= editDialog.querySelector('#description').value;
        let startdate= editDialog.querySelector('#startdate').value;
        let enddate= editDialog.querySelector('#enddate').value
        if(company=='' || position=='' || description=='' || startdate=='' || enddate=='') return;
        let newExperience={
            company,
            position,
            description,
            startdate,
            enddate
        }
        if(editIndex!=null) newExperiences[editIndex]=newExperience;
        else newExperiences.push(newExperience);
        editIndex=null;
        setExperiences(newExperiences)
    }

    function EditExperience(){
        return(
            <dialog className="edit-experience">
                <h1>Edit Education</h1>
                <div className="company">
                    <label htmlFor="company">Company (required)</label>
                    <input type="text" name="company" id="company" required />
                </div>
                <div className="position">
                    <label htmlFor="position">Position (required)</label>
                    <input type="text" name="position" id="position" required />
                </div>
                <div className="description">
                    <label htmlFor="description">Description (required)</label>
                    <textarea name="description" id="description" />
                </div>
                <div className="startdate">
                    <label htmlFor="startdate">Start Date (required)</label>
                    <input type="tel" name="startdate" id="startdate" required />
                </div>
                <div className="enddate">
                    <label htmlFor="enddate">End Date (required)</label>
                    <input type="text" name="enddate" id="enddate" required />
                </div>
                <div className="buttons"><button onClick={()=>document.querySelector('dialog.edit-experience').close()} className="cancel">Cancel</button><button type="submit" onClick={()=>saveExperience()} className="save">Save</button></div>
            </dialog>
        )
    }

    function removeExperience(removeIndex){
        let newExperiences=[...experiences];
        newExperiences.splice(removeIndex,1);
        setExperiences(newExperiences);
    }

    return(
        <div className="experiences">
            <div className="title">
                <h1>Experience</h1>
                <button onClick={changeVisibility}><img src={expandsvg} className={visibility?"expanded":''} alt="Expand Experiences" /></button>
            </div>
            <div className={visibility?"experienceList expanded":"experienceList"}>
                {visibility && experienceComponents}
            </div>
            {visibility && <button className="add-experience" onClick={addExperience}>+ Add Experience</button>}
            <EditExperience />
        </div>
    )
}