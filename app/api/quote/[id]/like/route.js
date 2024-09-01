import { connectToDB } from '../../../../../utils/database';
import Quote from '../../../../../models/quote';
import mongoose from 'mongoose';

export const PUT = async (req) => {

    // extract quoteId and userId from request body
    const { quoteId, userId } = await req.json();

    try {
        // connect to the database
        await connectToDB();

        // find the quote by its ID in the database
        const quote = await Quote.findById(quoteId);

        // throw error if it doesn't exist
        if (!quote) {
            return new Response('Quote not found', { status: 404 });
        }

        // checking if user has already liked the quote
        const hasLiked = quote.likes.includes(userId);

        // remove like if user has already liked the quote
        if (hasLiked) {
            quote.likes = quote.likes.filter(id => id !== userId);
        } else {

            // add like if they haven't liked it
            quote.likes.push(userId);
        }

        // save the updated quote to the database
        await quote.save();

        // return the updated quote 
        return new Response(JSON.stringify(quote), { status: 200 });
    } catch (error) {

        return new Response('Failed to update likes', { status: 500 });
    }
};