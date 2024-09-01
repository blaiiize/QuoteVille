import { connectToDB } from '../../../../utils/database';
import Quote from '../../../../models/quote';

export const GET = async (request, { params }) => {
    try {

        await connectToDB();

        // find quote by its ID and fill in creator field with reference data
        const quote = await Quote.findById(params.id).populate('creator');

        // if quote doesn't exist return error
        if (!quote) return new Response('Quote not found', { status: 404 });

        // return the found quote
        return new Response(JSON.stringify(quote), { status: 200 });
    } catch (error) {

        // if doesn't work return error
        return new Response('Failed to fetch quote', { status: 500 });
    }
};

export const PATCH = async (request, { params }) => {

    // extract updated quote and tag values from the request
    const { quote, tag } = await request.json();

    try {

        await connectToDB();

        // find existing quote by its ID
        const existingQuote = await Quote.findById(params.id);

        // if quote doesn't exist, return error
        if (!existingQuote) return new Response('Quote not found', { status: 404 });

        // update quote and tag fields with new values
        existingQuote.quote = quote;
        existingQuote.tag = tag;

        // save updated quote to database
        await existingQuote.save();

        // return updated quote as JSON
        return new Response(JSON.stringify(existingQuote), { status: 200 });

    } catch (error) {

        return new Response('Failed to update quote', { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {

        await connectToDB();

        // delete quote by its ID from database
        await Quote.findByIdAndDelete(params.id);

        return new Response('Quote deleted successfully', { status: 200 });
    } catch (error) {
        
        return new Response('Failed to delete quote', { status: 500 });
    }
};