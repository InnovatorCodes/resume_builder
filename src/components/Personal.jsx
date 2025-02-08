export default function Personal({ personal, setPersonal }) {
  function handleChange(event) {
    let target = event.target;
    if (target.id == "fullname")
      setPersonal({ ...personal, name: target.value });
    else if (target.id == "emailid")
      setPersonal({ ...personal, email: target.value });
    else if (target.id == "phone")
      setPersonal({ ...personal, phone: target.value });
    else setPersonal({ ...personal, address: target.value });
  }
  return (
    <div className="personal">
      <h1>Personal Details</h1>
      <div className="name">
        <label htmlFor="fullname">Full Name (required)</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="John Doe"
          required
          onChange={handleChange}
        />
      </div>
      <div className="email">
        <label htmlFor="emailid">Email</label>
        <input
          type="email"
          name="emailid"
          id="emailid"
          placeholder="johndoe@abc.com"
          onChange={handleChange}
        />
      </div>
      <div className="phno">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="123456789"
          onChange={handleChange}
        />
      </div>
      <div className="address">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="City, Country"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
