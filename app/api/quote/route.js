import { connectToDB } from '../../../utils/database';
import Quote from '../../../models/quote';

export const GET = async (request) => {
    try {

        await connectToDB();

        // retrieve all quotes from the database and populate creator field with user data
        const quotes = await Quote.find({}).populate('creator');

        // return the quotes as a JSON 
        return new Response(JSON.stringify(quotes), {
            status: 200
        });

    } catch (error) {

        return new Response('Failed to fetch all quotes'), {
            status: 500
        };
    }
};