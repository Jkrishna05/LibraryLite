import { useState, memo } from "react";
import api from "../api";

const BookCard = memo(function BookCard({ book, onDelete }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBook = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        setIsDeleting(true);
        await api.delete(`/books/${book._id}`);
        onDelete();
      } catch (err) {
        console.error("Error deleting book:", err);
        alert("Failed to delete book");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const updateBook = async () => {
    const newTitle = prompt("Enter new title", book.title);
    if (newTitle === null) return;

    const newAuthor = prompt("Enter new author", book.author);
    if (newAuthor === null) return;

    if (!newTitle.trim() || !newAuthor.trim()) {
      alert("Title and author cannot be empty");
      return;
    }

    try {
      setIsUpdating(true);
      await api.put(`/books/${book._id}`, {
        title: newTitle.trim(),
        author: newAuthor.trim()
      });
      onDelete();
    } catch (err) {
      console.error("Error updating book:", err);
      alert("Failed to update book");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="book-card">
      {book.image ? (
        <img
          src={`http://localhost:5000/uploads/${book.image}`}
          alt={book.title}
          className="book-image"
          loading="lazy"
        />
      ) : (
        <div className="book-placeholder">📖</div>
      )}

      <h3 className="book-title">{book.title}</h3>
      <p className="book-info"><strong>Author:</strong> {book.author}</p>
      <p className="book-info"><strong>Available:</strong> {book.count}</p>

      <div className="book-actions">
        <button
          onClick={updateBook}
          disabled={isUpdating}
          className="btn btn-primary"
          title="Edit book details"
        >
          {isUpdating ? "Updating..." : "Update"}
        </button>
        <button
          onClick={deleteBook}
          disabled={isDeleting}
          className="btn btn-danger"
          title="Delete this book"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
});

export default BookCard;