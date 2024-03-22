const router = require("express").Router();

// Controller Imports
const BookController = require("./controllers/BookController");

// JSON Schema Imports for payload verification
const createBookPayload = require("./schemas/createBookPayload");
const updateBookPayload = require("./schemas/updateBookPayload");


router.get(
  "/isbn/:isbn",
  BookController.getBookById
);

router.get(
  "/:isbn",
  BookController.getBookById
);

router.post(
  "/",
  BookController.createBook
);

router.put(
  "/:isbn",
  BookController.updateBook
);

router.delete(
  "/:isbn",
  BookController.deleteBook
);

module.exports = router;
