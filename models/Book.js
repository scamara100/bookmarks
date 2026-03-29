import mongoose, { Schema } from "mongoose";

// This is the model you will be modifying
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;