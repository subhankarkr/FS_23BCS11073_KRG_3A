import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "", course: "" });
  const [records, setRecords] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.name && formData.email && formData.course) {
      setRecords([...records, { ...formData }]); // copy formData
      setFormData({ name: "", email: "", course: "" }); // reset form
    } else {
      alert("Please fill all fields!");
    }
  }

  return (
    <div className="p-6 font-sans bg-blue-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Course Registration Form</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={formData.course}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {records.length > 0 && (
        <table className="border-collapse border border-gray-400 bg-white">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Course</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{rec.name}</td>
                <td className="border border-gray-400 px-4 py-2">{rec.email}</td>
                <td className="border border-gray-400 px-4 py-2">{rec.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
