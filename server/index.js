import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js'
import aurhRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { verifyToken } from './middleware/auth.js';
import { createPost } from './controllers/posts.js';



//Configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));
console.log(path.join(__dirname, 'public/assets'))

// File Storage
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage });


//Routes with files
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single("picture"), createPost)
//Routes
app.use("/auth", aurhRoutes);
app.use("/users", userRoutes)

app.use("/posts", postRoutes);


//mongoose set up
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, console.log(`Server Port: ${PORT}`)); 
}).catch((error) => console.error(`${error} did not connect to server`));