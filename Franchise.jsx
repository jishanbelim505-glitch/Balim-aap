import React, {useState} from "react";

export default function Franchise(){
  const [form, setForm] = useState({name:'',mobile:'',email:'',gst:'',pan:'',company:'',state:'',city:'',address:'',message:''});
  const handleChange = (e)=> setForm({...form,[e.target.name]: e.target.value});
  const handleSubmit = (e)=>{
    e.preventDefault();
    const text = `
Franchise Request:
Name: ${form.name}
Mobile: ${form.mobile}
Email: ${form.email}
Company: ${form.company}
GST: ${form.gst}
PAN: ${form.pan}
State: ${form.state}
City: ${form.city}
Address: ${form.address}
Message: ${form.message}
    `;
    const waLink = `https://wa.me/919521787139?text=${encodeURIComponent(text)}`;
    window.open(waLink,'_blank');
  };
  return (
    <div>
      <h3>Franchise Enquiry</h3>
      <form onSubmit={handleSubmit} style={{display:'grid',gap:8}}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="company" placeholder="Company Name" onChange={handleChange} />
        <input name="gst" placeholder="GST Number" onChange={handleChange} />
        <input name="pan" placeholder="PAN Number" onChange={handleChange} />
        <input name="state" placeholder="State" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <textarea name="address" placeholder="Address" onChange={handleChange} />
        <textarea name="message" placeholder="Message" onChange={handleChange} />
        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
}
