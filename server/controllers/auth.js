import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user.js";

//Register User

export const register = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            picturePath, 
            friends,
            location,
            occupation,
        } = req.body;

        if (req.file) {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(picturePath);

            // Get the Cloudinary URL of the uploaded image
            const actualPicturePath = result.secure_url;
            console.log("Picture Path:" ,picturePath)

        } else {
            const actualPicturePath = "maleAvtaar.jpg";
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: passwordHash,
            picturePath: actualPicturePath,
            friends,
            location,
            occupation,
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