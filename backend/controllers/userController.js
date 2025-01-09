import UserModel from "../model/UserModel.js";
import  bcrypt, { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return res.json({ message: "Username and password are required" });
    }
    if(await UserModel.findOne({ username })) {
        return res.json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if(!email || !password) {
        return res.json({ message: "Username and password are required" });
    }

    if(email !== process.env.email && password !== process.env.password) {
        return res.json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ email }, "secret");
    return res.json({
        message: "Login successful",
        token
    })
}