function AIModal({ open, onClose, content, setPersonal,setEducations, setExperiences, setSkills }) {
  if (!open) return null;

  function applyChanges(){
    setPersonal(content?.personal);
    setEducations(content?.education);
    setExperiences(content?.experience);
    setSkills(content?.skills);
    onClose();
  }

  function structureContent(){
    const personalSection= (
    <div>
        <p>{'Name: '+content?.personal.name}</p>
        <p>{'Email: '+content?.personal.email}</p>
        <p>{'Phone: '+content?.personal.phone}</p>
        <p>{'Address: '+content?.personal.address}</p>
    </div>);
    const aboutMeSection= <div>
        <p>{content?.personal.about}</p>
    </div>;
    const educationSection= (
    <div>
        {content?.education.map((edu, index)=><p key={index}><strong>{edu.school+': '}</strong>{edu.degree} ({edu.startdate} - {edu.enddate})</p>)}

    </div>)
    const skillsSection= <ul>{content?.skills.map((skill,index)=><li key={index}>{skill}</li>)}</ul>;
    const experienceSection= <div>
        {content?.experience.map((exp, index)=><p key={index}><strong>{exp.title+': '}</strong>{exp.description}</p>)}
    </div>
    return [
        {title: 'Personal Information', content: personalSection},
        {title: 'About Me', content: aboutMeSection},
        {title: 'Education', content: educationSection},
        {title: 'Skills', content: skillsSection},
        {title: 'Experience', content: experienceSection}
    ];
  }

  return (
    <div className="ai-modal-backdrop" onClick={onClose}>
      <div className="ai-modal" onClick={e => e.stopPropagation()}>
        <button className="ai-modal-close" onClick={onClose}>×</button>
        <h1>AI Enhanced Resume</h1>
        <div className="ai-modal-content">
            {structureContent().map((component,index)=>(
                <div key={index}>
                    <h2>{component.title}</h2>
                    {component.content}
                </div>
            ))}
        </div>
        <div className="buttons">
            <button className="discard" onClick={onClose}>Discard Changes</button>
            <button className="apply" onClick={applyChanges}>Apply Changes</button>
        </div>
      </div>
    </div>
  );
}

export default AIModal;