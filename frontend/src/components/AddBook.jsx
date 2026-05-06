import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AddBook = memo(function AddBook() {
  const [form, setForm] = useState({ title: "", author: "", image: null });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.image) newErrors.image = "Please select an image";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      const data = new FormData();
      data.append("title", form.title.trim());
      data.append("author", form.author.trim());
      data.append("image", form.image);

      await api.post("/books", data);
      setSuccessMessage("Book added successfully!");
      setForm({ title: "", author: "", image: null });
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Error adding book:", err);
      setErrors({ submit: "Failed to add book. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Book</h2>
      
      {successMessage && (
        <div style={{ 
          backgroundColor: "#d1fae5", 
          border: "1px solid #6ee7b7",
          color: "#065f46",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1rem"
        }}>
          {successMessage}
        </div>
      )}

      {errors.submit && <div className="error">{errors.submit}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Book Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter book title"
            className="form-input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {errors.title && <span style={{ color: "var(--danger)", fontSize: "0.85rem" }}>{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">Author Name</label>
          <input
            id="author"
            type="text"
            placeholder="Enter author name"
            className="form-input"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          {errors.author && <span style={{ color: "var(--danger)", fontSize: "0.85rem" }}>{errors.author}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">Book Cover Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="form-file"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
          {errors.image && <span style={{ color: "var(--danger)", fontSize: "0.85rem" }}>{errors.image}</span>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-submit"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>
      </form>
    </div>
  );
});

export default AddBook;