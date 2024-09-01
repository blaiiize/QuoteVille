import { Schema, model, models } from 'mongoose';

// defining User schema
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'], 
        required: [true, 'Email already exists!'], 
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],

        // validation for username: 8-20 characters, no consecutive underscores or dots, no leading/trailing underscores or dots
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});

// create User model if it doesn't already exist
const User = models.User || model('User', UserSchema);

export default User;