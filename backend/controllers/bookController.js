const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  const { title, author } = req.body;

  let book = await Book.findOne({ title, author });

  if (book) {
    book.count += 1;
    await book.save();
    return res.json(book);
  }

  const newBook = new Book({
    title,
    author,
    image: req.file?.filename
  });

  await newBook.save();
  res.json(newBook);
};

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.updateBook = async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};