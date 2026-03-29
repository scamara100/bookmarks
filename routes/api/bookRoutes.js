import express from 'express'

const router = express.Router()

import Book from '../../models/Book.js'
import { authMiddleware } from '../../utils/auth.js'
 
// Apply authMiddleware to all routes in this file
router.use(authMiddleware);
 
// GET /api/books - Get all books for the logged-in user
// THIS IS THE ROUTE THAT CURRENTLY HAS THE FLAW
router.get('/', async (req, res) => {
  // This currently finds all books in the database.
  // It should only find books owned by the logged in user.
  try {
    // populate turns those user ids into user sub-documents (nested object) in the response
    const books = await Book.find({}).populate('user')
    res.json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// POST /api/books - Create a new book
router.post('/', async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      // The user ID needs to be added here
      user: req.user._id
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
// PUT /api/books/:id - Update a book
router.put('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: 'No Book found with this id!' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// DELETE /api/books/:id - Delete a book
router.delete('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'No book found with this id!' });
    }
    res.json({ message: 'book deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
export default router