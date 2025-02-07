import { useState } from "react"
import './ResumeBuilder.css'
import { v4 as uuidv4 } from 'uuid';
import expandsvg from './assets/expand.svg'
import editsvg from './assets/edit.svg';
import deletesvg from './assets/delete.svg';
import emailsvg from './assets/email.svg';
import phonesvg from "./assets/phone.svg";
import locationsvg from './assets/location.svg';

function EditDetails({personalState,educationState,experienceState}){
    return(
        <div className="edit-details">
            <ResetOptions setPersonal={personalState[1]} setEducations={educationState[1]} setExperiences={experienceState[1]} />
            <Personal personal={personalState[0]} setPersonal={personalState[1]}/>
            <Educations educations={educationState[0]} setEducations={educationState[1]} />
            <Experiences experiences={experienceState[0]} setExperiences={experienceState[1]} />
        </div>
    )
}

function ResetOptions({setPersonal,setEducations,setExperiences}){
    function clearResume(){
        setPersonal({});
        setEducations([]);
        setExperiences([]);
    }

    function loadExample(){
        const examplePersonal={name:"John Doe",email:"johndoe@abc.com",phone:"1234567890",address:"City, Country"};
        const exampleEducations= [{school:"ABC University",degree:"Example Degree 1",startdate:"01/2001",enddate:"02/2002"},
            {school:"DEF University",degree:"Example Degree 2",startdate:"03/2003",enddate:"04/2004"}]
        const exampleExperiences=[{company:"ABC Global",position:"Example Position 1", description:"abc",startdate:"05/2005",enddate:"06/2006"},
            {company:"DEF Global",position:"Example Position 2",description:"def",startdate:"07/2007",enddate:"present"}];
        setPersonal(examplePersonal);
        setEducations(exampleEducations);
        setExperiences(exampleExperiences);
    }

    return(
        <div className="reset-options">
            <button className="clear" onClick={clearResume}>Clear Resume</button>
            <button className="load" onClick={loadExample}>Load Example</button>
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
            <button><img src={deletesvg} className="deletebtn" alt="Delete Experience" onClick={()=>removeEducation(index)} /></button>
        </div>
    )
    function changeVisibility(){
        setIsVisible(!isVisible);
    }

    function addEducation(){
        const editDialog=document.querySelector('dialog.edit-education');
        editDialog.querySelector('#school').classList.remove('touched');
        editDialog.querySelector('#degree').classList.remove('touched');
        editDialog.querySelector('#start-date').classList.remove('touched');
        editDialog.querySelector('#end-date').classList.remove('touched');
        editDialog.querySelector('#school').value='';
        editDialog.querySelector('#degree').value='';
        editDialog.querySelector('#start-date').value='';
        editDialog.querySelector('#end-date').value='';
        editDialog.showModal();
    }

    function editEducationDetails(index){
        editIndex=index; 
        const editDialog=document.querySelector('dialog.edit-education');
        editDialog.querySelector('#school').value=educations[index].school;
        editDialog.querySelector('#degree').value=educations[index].degree;
        editDialog.querySelector('#start-date').value=educations[index].startdate;
        editDialog.querySelector('#end-date').value=educations[index].enddate;
        editDialog.showModal();
    }

    function saveEducation(){
        let newEducations=[...educations];
        const editDialog=document.querySelector('dialog.edit-education');
        editDialog.querySelector('#school').classList.add('touched');
        editDialog.querySelector('#degree').classList.add('touched');
        editDialog.querySelector('#start-date').classList.add('touched');
        editDialog.querySelector('#end-date').classList.add('touched');
        let school=editDialog.querySelector('#school').value;
        let degree=editDialog.querySelector('#degree').value;
        let startdate=editDialog.querySelector('#start-date').value
        let enddate=editDialog.querySelector('#end-date').value;
        if (school=='' || degree=='' || startdate=='' || enddate=='') return;
        let newEducation={
            school,
            degree,
            startdate,
            enddate
        }
        if(editIndex!=null) newEducations[editIndex]=newEducation;
        else newEducations.push(newEducation)
        editIndex=null;
        setEducations(newEducations)
    }

    function EditEducation(){
        return(
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
                    <label htmlFor="startdate">Start Date (required)</label>
                    <input type="tel" name="startdate" id="start-date" required />
                </div>
                <div className="enddate">
                    <label htmlFor="enddate">End Date (required)</label>
                    <input type="text" name="enddate" id="end-date" required />
                </div>
                <div className="buttons"><button onClick={()=>document.querySelector('dialog.edit-education').close()} className="cancel">Cancel</button><button type="submit" onClick={saveEducation} className="save">Save</button></div>
            </dialog>
        )
    }

    function removeEducation(removeIndex){
        let newEducations=[...educations];
        newEducations.splice(removeIndex,1);
        setEducations(newEducations)
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
            {isVisible && <button className="add-education" onClick={addEducation}>+ Add Education</button>}
            <EditEducation/>
        </div>
    )
}

function Experiences({experiences,setExperiences}){
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

function DisplayResume({personal,educations,experiences}){
    const educationComponents=educations.map((education)=>
    <div key={uuidv4()} className="education">
        <div className="date">{education.startdate} - {education.enddate}</div>
        <div className="details">
            <div className="school">{education.school}</div>
            <div className="degree">{education.degree}</div>
        </div>
    </div>)

    const experienceComponents=experiences.map((experience)=>
        <div key={uuidv4()} className="education">
            <div className="date">{experience.startdate} - {experience.enddate}</div>
            <div className="details">
                <div className="school">{experience.company}</div>
                <div className="degree">{experience.position}</div>
                <div className="description">{experience.description}</div>
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
            <div className="education-info">
                {educationComponents.length>0 && <div className="title">Education</div>}
                {educationComponents.length>0 && educationComponents}
            </div>
            <div className="experience-info">
            {experienceComponents.length>0 && <div className="title"> Professional Experience</div>}
            {experienceComponents.length>0 && experienceComponents}
            </div>
        </div>
    )
}


function ResumeBuilder(){
    const [personal,setPersonal]=useState({name:"John Doe",email:"johndoe@abc.com",phone:"1234567890",address:"City, Country"});
    const [educations,setEducations]=useState([{school:"ABC University",degree:"Example Degree 1",startdate:"01/2001",enddate:"02/2002"},
        {school:"DEF University",degree:"Example Degree 2",startdate:"03/2003",enddate:"04/2004"}]);
    const [experiences,setExperiences]=useState([{company:"ABC Global",position:"Example Position 1", description:"abc",startdate:"05/2005",enddate:"06/2006"},
        {company:"DEF Global",position:"Example Position 2",description:"def",startdate:"07/2007",enddate:"present"}])
    return (
        <>
            <div className="header">MakeMyResume</div>
            <div className="resume-content">
                <EditDetails personalState={[personal,setPersonal]} educationState={[educations,setEducations]} experienceState={[experiences,setExperiences]} />
                <DisplayResume personal={personal} educations={educations} experiences={experiences} />
            </div>
        </>
    )
}

export default ResumeBuilder