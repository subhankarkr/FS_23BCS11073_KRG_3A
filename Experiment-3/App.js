import React, { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title:'', author:'', genre:'' });
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editIndex === -1) {
      setBooks([...books, form]);
    } else {
      const updated = [...books];
      updated[editIndex] = form;
      setBooks(updated);
      setEditIndex(-1);
    }
    setForm({ title:'', author:'', genre:'' });
  };

  const handleEdit = (index) => {
    setForm(books[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
  };

  return (
    <div className="App">
      <h1>Library Management</h1>

      <div className="form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
        />
        <button onClick={handleAddOrUpdate}>
          {editIndex === -1 ? 'Add Book' : 'Update Book'}
        </button>
      </div>

      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th><th>Author</th><th>Genre</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
