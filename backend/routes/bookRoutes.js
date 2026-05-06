const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

router.post("/books", upload.single("image"), addBook);
router.get("/books", getBooks);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;