import { useState } from "react"
import './ResumeBuilder.css'
import { v4 as uuidv4 } from 'uuid';
import expandsvg from './assets/expand.svg'
import editsvg from './assets/edit.svg';
import deletesvg from './assets/delete.svg';
import emailsvg from './assets/email.svg';
import phonesvg from "./assets/phone.svg";
import locationsvg from './assets/location.svg';

function EditDetails({personalState,educationState}){

    return(
        <div className="edit-details">
            <ResetOptions />
            <Personal personal={personalState[0]} setPersonal={personalState[1]}/>
            <Educations educations={educationState[0]} setEducations={educationState[1]} />
            <Experiences />
        </div>
    )
}

function ResetOptions(){
    return(
        <div className="reset-options">
            <button className="clear">Clear Resume</button>
            <button className="load">Load Example</button>
        </div>
    )
}

function Personal({personal,setPersonal}){
    function handleChange(event){
        let target=event.target;
        if(target.id=='fullname') setPersonal({...personal,name:target.value})
        else if(target.id=='emailid') setPersonal({...personal,email:target.value});
        else if(target.id=='phone') setPersonal({...personal,phone:target.value});
        else setPersonal({...personal,address:target.value});
    }
    return(
        <div className="personal">
            <h1>Personal Details</h1>
            <div className="name">
                <label htmlFor="fullname">Full Name (required)</label>
                <input type="text" name="fullname" id="fullname" placeholder="John Doe" required onChange={handleChange}/>
            </div>
            <div className="email">
                <label htmlFor="emailid">Email</label>
                <input type="email" name="emailid" id="emailid" placeholder="johndoe@abc.com" onChange={handleChange} />
            </div>
            <div className="phno">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" name="phone" id="phone" placeholder="123456789" onChange={handleChange}/>
            </div>
            <div className="address">
                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" placeholder="City, Country" onChange={handleChange} />
            </div>
        </div>
    )
}

function Educations({educations,setEducations}){
    const [isVisible, setIsVisible]=useState(false);
    let editIndex=null;
    const educationComponents=educations.map((education,index)=>
        <div className="education" key={uuidv4()}>
            <div className="school">{education.school}</div>
            <button><img src={editsvg} className="editbtn" alt="Edit Education" onClick={()=>editEducationDetails(index)} /></button>
            <button><img src={deletesvg} className="deletebtn" alt="Delete Experience" /></button>
        </div>
    )
    function changeVisibility(){
        setIsVisible(!isVisible);
    }

    function editEducationDetails(index){
        editIndex=index; 
        const editDialog=document.querySelector('dialog.edit-education');
        editDialog.querySelector('#school').value=educations[index].school;
        editDialog.querySelector('#degree').value=educations[index].degree;
        editDialog.querySelector('#startdate').value=educations[index].startdate;
        editDialog.querySelector('#enddate').value=educations[index].enddate;
        editDialog.showModal();
    }

    function saveNewEducation(){
        let neweducations=[...educations];
        const editDialog=document.querySelector('dialog.edit-education');
        educations[editIndex].school=editDialog.querySelector('#school').value;
        educations[editIndex].degree=editDialog.querySelector('#degree').value;
        educations[editIndex].startdate=editDialog.querySelector('#startdate').value;
        educations[editIndex].enddate=editDialog.querySelector('#enddate').value;
        setEducations(neweducations)
    }

    function EditEducation(){
        return(
            <dialog className="edit-education">
                <h1>Edit Education</h1>
                <div className="school">
                    <label htmlFor="school">School</label>
                    <input type="text" name="school" id="school" placeholder="John Doe" required />
                </div>
                <div className="degree">
                    <label htmlFor="emailid">Degree</label>
                    <input type="text" name="degree" id="degree" placeholder="johndoe@abc.com" />
                </div>
                <div className="startdate">
                    <label htmlFor="phone">Start Date</label>
                    <input type="tel" name="startdate" id="startdate" placeholder="123456789" />
                </div>
                <div className="enddate">
                    <label htmlFor="enddate">End Date</label>
                    <input type="text" name="enddate" id="enddate" placeholder="City, Country" />
                </div>
                <div className="buttons"><button onClick={()=>document.querySelector('dialog.edit-education').close()} className="cancel">Cancel</button><button type="submit" onClick={saveNewEducation} className="save">Save</button></div>
            </dialog>
        )
    }

    return(
        <div className="educations">
            <div className="title">
                <h1>Education</h1>
                <button onClick={changeVisibility}><img src={expandsvg} className={isVisible? 'expanded': ''} alt="Expand Educations" /></button>
            </div>
            <div className={isVisible? "educations expanded": "educations"}>
                {isVisible && educationComponents}
            </div>
            <EditEducation/>
        </div>
    )
}

function Experiences(){
    const [visibility,setVisibility]=useState(false);
    let editIndex=null;
    const [experiences,setExperiences]=useState([{company:"ABC",},{company:"def"}]);
    const experienceComponents=experiences.map((experience,index)=>
        <div className="experience" key={uuidv4()}>
            <div className="company">{experience.company}</div>
            <button><img src={editsvg} className="editbtn" alt="Edit Experience" onClick={()=>editExperienceDetails(index)} /></button>
            <button><img src={deletesvg} className="deletebtn" alt="Delete Experience" /></button>
        </div>
    )
    function changeVisibility(){
        setVisibility(!visibility);
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

    function saveNewExperience(){
        let newExperiences=[...experiences];
        const editDialog=document.querySelector('dialog.edit-education');
        experiences[editIndex].company=editDialog.querySelector('#company').value;
        experiences[editIndex].position=editDialog.querySelector('#position').value;
        experiences[editIndex].description=editDialog.querySelector('#description').value;
        experiences[editIndex].startdate=editDialog.querySelector('#startdate').value;
        experiences[editIndex].enddate=editDialog.querySelector('#enddate').value;
        setExperiences(newExperiences)
    }

    function EditExperience(){
        return(
            <dialog className="edit-experience">
                <h1>Edit Education</h1>
                <div className="company">
                    <label htmlFor="company">Company</label>
                    <input type="text" name="company" id="company" required />
                </div>
                <div className="position">
                    <label htmlFor="position">Position</label>
                    <input type="text" name="position" id="position" />
                </div>
                <div className="description">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" />
                </div>
                <div className="startdate">
                    <label htmlFor="startdate">Start Date</label>
                    <input type="tel" name="startdate" id="startdate" />
                </div>
                <div className="enddate">
                    <label htmlFor="enddate">End Date</label>
                    <input type="text" name="enddate" id="enddate" />
                </div>
                <div className="buttons"><button onClick={()=>document.querySelector('dialog.edit-experience').close()} className="cancel">Cancel</button><button type="submit" onClick={()=>saveNewExperience()} className="save">Save</button></div>
            </dialog>
        )
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
            <EditExperience />
        </div>
    )
}

function DisplayResume({personal,educations}){
    const experienceComponents=educations.map((education)=>
    <div key={uuidv4()} className="education">
        <div className="date">{education.startdate} - {education.enddate}</div>
        <div className="details">
            <div className="school">{education.school}</div>
            <div className="degree">{education.degree}</div>
        </div>
    </div>)

    return(
        <div className="display-resume">
            <div className="header">
                <div className="name">{personal.name}</div>
                <div className="contact">
                    {personal.email && <div className="email">
                        <img src={emailsvg} alt="" />
                        {personal.email}
                    </div>}
                    {personal.phone && <div className="phone">
                        <img src={phonesvg} alt="" />
                        {personal.phone}
                    </div>}
                    {personal.address && <div className="address">
                        <img src={locationsvg} alt="" />
                        {personal.address}
                    </div>}
                </div>
            </div>
            <div className="educations">
                {experienceComponents.length>0 && <div className="title">Education</div>}
                {experienceComponents.length>0 && experienceComponents}
            </div>
            <div className="experiences">
            {experienceComponents.length>0 && <div className="title"> Professional Experience</div>}
            {experienceComponents.length>0 && experienceComponents}
            </div>
        </div>
    )
}


function ResumeBuilder(){
    const [personal,setPersonal]=useState({name:"John Doe",email:"johndoe@abc.com",phone:"1234567890",address:"City, Country"});
    const [educations,setEducations]=useState([{school:"NCFE",degree:"Class 12",startdate:"03/2008",enddate:"03/2020"},
        {school:"VIT Vellore",degree:"BTech,CSE Core",startdate:"09/2022",enddate:"06/2026"}]);
    return (
        <div className="resume-content">
            <EditDetails personalState={[personal,setPersonal]} educationState={[educations,setEducations]}/>
            <DisplayResume personal={personal} educations={educations} />
        </div>
    )
}

export default ResumeBuilder