import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '../../../../models/user';
import { connectToDB } from '../../../../utils/database';

const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        // find the user in the database using their email during session callback
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            // attach the user's ID to the session object for easy access
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
    
        // execute process during session callback
        async signIn({ profile }) {
    
            try {
               // connect to the database
               await connectToDB();
    
               // check if a user with the provided email already exists in the database
               const userExists = await User.findOne({
                email: profile.email
               });
    
               // if not, create a new user with Google profile information
               if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(' ', '').toLowerCase(),
                    image: profile.picture
                })
               }
               return true;
            } catch (error) {
               
               console.log(error);
               return false;
            }
        }
    }
})

// export the handler for both GET and POST requests
export { handler as GET, handler as POST };
