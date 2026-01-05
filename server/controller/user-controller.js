import bcrypt from 'bcrypt';


import User from "../model/user.js";

export const signupUser = async (request, response) => {
    try {
        // const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

        console.log("Request body:", request.body);

        const newUser = new User(user);
        const savedUser = await newUser.save();

        console.log("Saved user:", savedUser);

        return response.status(200).json({ msg: "Signup successful" });
    } catch (error) {
        console.error("Signup error:", error);
        return response.status(500).json({ msg: error.message });
    }
};
