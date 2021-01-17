import React, { useState, useEffect } from "react";
import axios from "axios";

const Student = () => {
  const [formData, setFormData] = useState({});
  const [students, setStudents] = useState([]);
  const fetchStudents = async () => {
    try {
      // let hostname = "http://localhost:8000";
      let hostname = "http://restback-students.192.168.99.100.nip.io/";

      let url = `${hostname}/students`;
      const resp = await axios.get(url);
      // const students = await resp.json();
      setStudents(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      // let hostname = "http://localhost:8000";
      let hostname = "http://restback-students.192.168.99.100.nip.io/";
      let url = `${hostname}/students`;
      const resp = await axios.post(url, {
        ...formData
      });
      console.log(resp);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };
  const getData = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchStudents();
  }, [students.length]);

  return (
    <div>
      <h1>Student Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input onChange={getData} type="text" name="name" />
        </div>
        <div>
          <label>Email</label>
          <input onChange={getData} type="email" name="email" />
        </div>
        <div>
          <label>Phone</label>
          <input onChange={getData} type="phone" name="phone" />
        </div>
        <div>
          <label>Address</label>
          <textarea type="text" name="address" onChange={getData} />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <div>
        All Students
        <div>
          {students.map(s => {
            return <p>{s.name}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Student;
