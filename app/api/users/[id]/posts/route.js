import { connectToDB } from '../../../../../utils/database';
import Quote from '../../../../../models/quote';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        // Fetch all quotes by the user
        const quotes = await Quote.find({
            creator: params.id
        }).populate('creator');

        // Calculate the total number of likes the user has received
        const totalLikes = quotes.reduce((acc, quote) => acc + quote.likes.length, 0);

        return new Response(JSON.stringify({ quotes, totalLikes }), {
            status: 200
        });
    } catch (error) {
        
        return new Response('Failed to fetch quotes and likes', {
            status: 500
        });
    }
}

