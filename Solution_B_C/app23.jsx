import { useState, useEffect } from "react";

function App23() {
  const url = "https://68830dad21fa24876a9c6dd1.mockapi.io/student";

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  // GET
  function getStudents() {
    fetch(url)
      .then(res => res.json())
      .then(data => setStudents(data));
  }

  useEffect(() => {
    getStudents();
  }, []);

  // POST and PUT
  function saveStudent() {
    const student = { name, email };

    if (editId === null) {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      }).then(() => {
        getStudents();
        setName("");
        setEmail("");
      });
    } else {
      fetch(url + "/" + editId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      }).then(() => {
        getStudents();
        setName("");
        setEmail("");
        setEditId(null);
      });
    }
  }

  // EDIT
  function editStudent(student) {
    setName(student.name);
    setEmail(student.email);
    setEditId(student.id);
  }

  // DELETE
  function deleteStudent(id) {
    fetch(url + "/" + id, {
      method: "DELETE"
    }).then(() => getStudents());
  }

  return (
    <div>
      <h1>Student CRUD</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={saveStudent}>
        {editId === null ? "Add Student" : "Update Student"}
      </button>

      <h2>Student List</h2>

      {students.map(student => (
        <div key={student.id}>
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Email: {student.email}</p>

          <button onClick={() => editStudent(student)}>
            Edit
          </button>

          <button onClick={() => deleteStudent(student.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App23;