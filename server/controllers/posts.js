import Post from '../models/posts.js';
import User from '../models/user.js';
import cloudinary from '../utils/cloudinary.js';

//Create
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        console.log("Post request: ", req.params);
        const user = await User.findById(userId);

        if (req.file) {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            // Get the Cloudinary URL of the uploaded image
            const picturePath = result.secure_url;
        }

        const newPost = new Post({
            userId,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath: picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();

        // const post = await Post.find();

        res.status(201).json({ message: 'Post added successfully' });

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}


//Read
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

//Update
export const likePosts = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body
        console.log("post like request params:", req.params);
        console.log("post like request body:", req.body);
        console.log("liking post with id:", id)
        console.log("post liked by:", userId)
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )


        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

//Comments

//Delete Post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndDelete(id);

        console.log("PostTo be deleted:", post)

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }


        res.status(201).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

