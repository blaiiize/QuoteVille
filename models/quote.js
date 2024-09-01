import mongoose, { Schema, model, models } from 'mongoose';

// defining Quote schema
const QuoteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, // reference to the User model
        ref: 'User',
    },
    quote: {
        type: String,
        required: [true, 'Quote is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'], 
    },
    author: {
        type: String,
        required: [true, 'Author is required.']
    },
    likes: { 
        type: [String], // array of user IDs who liked the quote
        default: [] 
    },
}, {
    timestamps: true // automatically add createdAt and updatedAt fields
});

// create Quote model if it doesn't already exist
const Quote = models.Quote || model('Quote', QuoteSchema);

export default Quote;