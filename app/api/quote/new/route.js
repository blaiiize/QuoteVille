import { connectToDB } from '../../../../utils/database';
import Quote from '../../../../models/quote';

export const POST = async (req) => {

    // extract userId, quote, tag, and author from request body
    const { userId, quote, tag, author } = await req.json();  

    try {

        await connectToDB();
        
        // create new quote instance with provided data
        const newQuote = new Quote({
            creator: userId, 
            quote,
            tag,
            author,
        });

        // save new quote to database
        await newQuote.save();

        // return newly created quote as JSON 
        return new Response(JSON.stringify(newQuote), {
            status: 201
        });
    } catch (error) {

        return new Response('Failed to create a new quote', {
            status: 500
        });
    }
};