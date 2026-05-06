import { useEffect, useState, memo } from "react";
import api from "../api";
import BookCard from "./BookCard";

const BookList = memo(function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/books");
      setBooks(res.data || []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <div className="loading"><div className="spinner"></div>Loading books...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <p>No books available yet. <a href="/add">Add the first book!</a></p>
        </div>
      ) : (
        <div className="book-list-container">
          {books.map((book) => (
            <BookCard key={book._id} book={book} onDelete={fetchBooks} />
          ))}
        </div>
      )}
    </div>
  );
});

export default BookList;