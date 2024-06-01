import User from "../models/user.js";



//read 
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);


        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: err.message });
    }
};

// Read user friends
export const getUserFriends = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);

        const friendDetailsPromises = user.friends.map(async (friendId) => {
            const friend = await User.findById(friendId);
            return {
                _id: friend._id,
                firstname: friend.firstname,
                lastname: friend.lastname,
                occupation: friend.occupation,
                location: friend.location,
                picturePath: friend.picturePath,
            };
        });

        const friendDetails = await Promise.all(friendDetailsPromises);
        res.status(200).json(friendDetails);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


//Update

// Update friends
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((fId) => fId !== friendId);
            friend.friends = friend.friends.filter((uId) => uId !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friendDetailsPromises = user.friends.map(async (fId) => {
            const f = await User.findById(fId);
            return {
                _id: f._id,
                firstname: f.firstname,
                lastname: f.lastname,
                occupation: f.occupation,
                location: f.location,
                picturePath: f.picturePath,
            };
        });

        const friendDetails = await Promise.all(friendDetailsPromises);
        res.status(200).json(friendDetails);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const editUser = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            location,
            college,
            year,
            branch,
        } = req.body;
        const { id } = req.params;
        const picturePath = req.file.path;
        let finalPicturePath = null;

        const user = await User.findById(id);

        if (req.file) {
            // Upload the image to Cloudinary
            try {
                // console.log("CLoudinary started...");
                const result = await cloudinary.uploader.upload(picturePath, {
                    api_key: process.env.API_KEY,
                    api_secret: process.env.API_SECRET_KEY,
                    cloud_name: process.env.CLOUD_NAME,
                });

                // console.log("Cloudinary Upload Result:", result);
                finalPicturePath = result.secure_url;
                // console.log("Final Picture Path:", finalPicturePath);
            } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
            }
        }

        const updatedFields = {
            firstname,
            lastname,
            friends,
            location,
            college,
            year,
            branch,
            communities
        };

        if (finalPicturePath) {
            updatedFields.picturePath = finalPicturePath;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });
        // console.log("Updated user:", updatedUser)

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}