import { useState } from "react"
import './ResumeBuilder.css'
import { v4 as uuidv4 } from 'uuid';
import expandsvg from './assets/expand.svg'
import editsvg from './assets/edit.svg';
import deletesvg from './assets/delete.svg';

function EditDetails({editType}){
    if(editType=='content'){
        return(
            <div className="edit-details">
                <ResetOptions />
                <Personal />
                <Educations />
                <Experiences />
            </div>
        )
    }
}

function ResetOptions(){
    return(
        <div className="reset-options">
            <button className="clear">Clear Resume</button>
            <button className="load">Load Example</button>
        </div>
    )
}

function Personal(){
    return(
        <div className="personal">
            <h1>Personal Details</h1>
            <div className="name">
                <label htmlFor="fullname">Full Name (required)</label>
                <input type="text" name="fullname" id="fullname" placeholder="John Doe" required/>
            </div>
            <div className="email">
                <label htmlFor="emailid">Email</label>
                <input type="email" name="emailid" id="emailid" placeholder="johndoe@abc.com" />
            </div>
            <div className="phno">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" name="phone" id="phone" placeholder="123456789" />
            </div>
            <div className="address">
                <label htmlFor="">Address</label>
                <input type="text" name="address" id="address" placeholder="City, Country" />
            </div>
        </div>
    )
}

function Educations(){
    const [visibility, setVisibility]=useState(false);
    const educationList=[{school:"NCFE"},{school:"VIT Vellore"}];
    const educationComponents=educationList.map((education)=>
        <div className="education" key={uuidv4()}>
            <div className="school">{education.school}</div>
            <button><img src={editsvg} className="editbtn" alt="Edit Education" /></button>
            <button><img src={deletesvg} className="deletebtn" alt="Delete Experience" /></button>
        </div>
    )
    function changeVisibility(){
        const expandIcon=document.querySelector('.educations .title img')
        expandIcon.classList.toggle('expanded');
        setVisibility(!visibility);
    }
    return(
        <div className="educations">
            <div className="title">
                <h1>Education</h1>
                <button onClick={changeVisibility}><img src={expandsvg} alt="Expand Educations" /></button>
            </div>
            {visibility && educationComponents}
        </div>
    )
}

function Experiences(){
    const [visibility,setVisibility]=useState(false);
    const experienceList=[{company:"abc"},{company:"def"}];
    const experienceComponents=experienceList.map((experience)=>
        <div className="experience" key={uuidv4()}>
            <div className="company">{experience.company}</div>
            <button><img src={editsvg} className="editbtn" alt="Edit Experience" /></button>
            <button><img src={deletesvg} className="deletebtn" alt="Delete Experience" /></button>
        </div>
    )
    function changeVisibility(){
        const expandIcon=document.querySelector('.experiences .title img')
        expandIcon.classList.toggle('expanded');
        setVisibility(!visibility);
    }
    return(
        <div className="experiences">
            <div className="title">
                <h1>Experience</h1>
                <button onClick={changeVisibility}><img src={expandsvg} alt="Expand Experiences" /></button>
            </div>
            {visibility && experienceComponents}
        </div>
    )
}

function DisplayResume(){
    return(
        <div className="display-resume"></div>
    )
}


function ResumeBuilder(){
    const [editType,setEditType]= useState('content');
    return (
        <>
            <div className="tabs"> 
                <div className="content-tab">Content</div>
                <div className="customize-tab">Customize</div>    
            </div>
            <div className="resume-content">
                <EditDetails editType={editType} />
                <DisplayResume />
            </div>
        </>
    )
}

export default ResumeBuilder