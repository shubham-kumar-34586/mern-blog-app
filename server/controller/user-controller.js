import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../model/user.js";
import Token from "../model/token.js";

dotenv.config();

export const signupUser = async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword
    };

    const newUser = new User(user);
    await newUser.save();

    return response.status(200).json({ msg: "Signup successful" });
  } catch (error) {
    return response.status(500).json({ msg: "Signup failed" });
  }
};

export const loginUser = async (request, response) => {
  const user = await User.findOne({ username: request.body.username });

  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }

  try {
    const match = await bcrypt.compare(request.body.password, user.password);

    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      return response.status(200).json({
        accessToken,
        refreshToken,
        name: user.name,
        username: user.username
      });
    } else {
      return response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    return response.status(500).json({ msg: "Login failed" });
  }
};
