
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const BookList = lazy(() => import("./components/BookList"));
const AddBook = lazy(() => import("./components/AddBook"));

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <h1 className="page-title">📚 Library Management System</h1>
        <Suspense fallback={<div className="loading"><div className="spinner"></div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;