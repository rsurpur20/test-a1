const BookModel = require("../../common/models/Book");
const { BASEURL } = require("../../config");

module.exports = {
  getAllBooks: (req, res) => {
    const { query: filters } = req;

    BookModel.findAllBooks(filters)
      .then((books) => {
        return res.status(200).json({
          ISBN: books.isbn,
          title: books.title,
          Author: books.author,
          description: books.description,
          genre: books.genre,
          price: books.price,
          quantity: books.quantity,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getBookById: (req, res) => {
    const {
      params: { isbn },
    } = req;

    BookModel.findBook({ ISBN: isbn })
      .then((book) => {
        if (!book) {
          // Book not found, return 404 status
          return res.status(404).json({
            status: false,
            error: {
              message: "Book with the given ISBN not found.",
            },
          });
        }

        return res.status(200).set("Location", `${BASEURL}/books/${book.isbn}${book.author}`) .json({
          temp: "getBookById",
          ISBN: book.isbn,
          title: book.title,
          Author: book.author,
          description: book.description,
          genre: book.genre,
          price: book.price,
          quantity: book.quantity,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createBook: (req, res) => {
    const { body } = req;

    BookModel.createBook(body)
      .then((book) => {

        return res.status(201)
        .set("Location", `${BASEURL}/books/${book.isbn}`) 
        .json({
          ISBN: book.ISBN,
          title: book.title,
          Author: book.Author,
          description: book.description,
          genre: book.genre,
          price: book.price,
          quantity: book.quantity,
        });
      })
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          // Handle the unique constraint violation
          return res.status(422).json({
            message: 'This ISBN already exists in the system.',
          });
        } else {
          // Handle other errors
          return res.status(400).json({
            status: false,
            error: err,
          });
        }
      });
  },

  updateBook: (req, res) => {
    const {
      params: { isbn },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        message: "Body is empty, hence can not update the book."
      });
    }

    BookModel.updateBook({isbn: isbn }, payload)
      .then(() => {
        return BookModel.findBook({ isbn: isbn });
      })
      .then((book) => {
        if (!book) {
          // Book not found, return 404 status
          return res.status(404).json({
            message: "Book with the given ISBN not found.",
          });
        }
        return res.status(200).json({
          ISBN: book.isbn,
          title: book.title,
          Author: book.author,
          description: book.description,
          genre: book.genre,
          price: book.price,
          quantity: book.quantity,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          status: false,
          error: err,
        });
      });
  },

  deleteBook: (req, res) => {
    const {
      params: { isbn },
    } = req;

    BookModel.deleteBook({isbn: isbn})
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfProductsDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
