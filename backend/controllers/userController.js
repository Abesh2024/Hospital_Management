import UserModel from "../model/UserModel.js";
import  bcrypt from "bcrypt";

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
    const { username, password } = req.body;
    if(!username || !password) {
        return res.json({ message: "Username and password are required" });
    }
    const user = await UserModel.findOne({ username });
    if(!user) {
        return res.json({
            message: "User does not exist"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.json({
            message: "Invalid password"
        })
    }
    res.json({
        message: "Login successful",
        username: user.username
    })
}