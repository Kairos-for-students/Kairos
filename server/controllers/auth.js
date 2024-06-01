import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user.js";
import {v2 as cloudinary} from 'cloudinary';

//Register User

export const register = async (req, res) => {
    // console.log("Register function is called");
    try {
        let CheckUser = await User.findOne({
            email: req.body.email,
        }); 

        if (CheckUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const user = req.body;
        // console.log("Received request body:", req.body);
        const picture= req.file;
        // console.log("Picture:", picture)

        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(user.password, salt);
        // console.log("Password", password)

        user.password = password;

        if (req.file) {
            // Upload the image to Cloudinary
            try {
                // console.log("CLoudinary started...");
                const result = await cloudinary.uploader.upload(picture.path, {
                    api_key: process.env.API_KEY,
                    api_secret: process.env.API_SECRET_KEY,
                    cloud_name: process.env.CLOUD_NAME,
                });

                // console.log("Cloudinary Upload Result:", result);
                let finalPicturePath = result.secure_url;
                // console.log("Final Picture Path:", finalPicturePath);
                user.picturePath = finalPicturePath
            } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
            }
        }

        const newUser = new User(user);



        const savedUser = await newUser.save();
        // console.log(`Saved user : ${savedUser}`);
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message }); 
    }
};

export const login = async (req, res) => {
    // console.log(req.body)
    try {
        // console.log("Function called")
        // console.log(req.body)
        const { email, password } = req.body;
        // console.log(email, password)
        const user = await User.findOne({ email: email });
        // console.log(user)  
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Password" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

