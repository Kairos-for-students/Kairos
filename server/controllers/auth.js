import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";

//Register User

export const register = async (req, res) => {
    console.log("Register function is called");
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            friends,
            location,
            college,
            year, 
            branch,
            communities
        } = req.body;
        console.log("Received request body:", req.body);
        const picturePath = req.file.path;
        console.log("Picture path:", picturePath)

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        let finalPicturePath = null;

        if (req.file) {
            // Upload the image to Cloudinary
            try {
                console.log("CLoudinary started...");
                const result = await cloudinary.uploader.upload(picturePath, {
                    api_key: process.env.API_KEY,
                    api_secret: process.env.API_SECRET_KEY,
                    cloud_name: process.env.CLOUD_NAME,
                });

                console.log("Cloudinary Upload Result:", result);
                finalPicturePath = result.secure_url;
                console.log("Final Picture Path:", finalPicturePath);
            } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
            }
        }

        // Check if finalPicturePath is still null
        if (finalPicturePath === null) {
            return res.status(500).json({ message: 'Cloudinary upload failed or no file provided' });
        }

        const newUser = new User({ 
            firstname,
            lastname,
            email,
            password: passwordHash,
            picturePath: finalPicturePath,
            friends,
            communities,
            location,
            year,
            college,
            branch,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),

        });

        const savedUser = await newUser.save();
        console.log(`Saved user : ${savedUser}`);
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
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