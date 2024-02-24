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
