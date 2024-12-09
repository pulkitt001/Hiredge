import express from 'express'
import { createPost, deletePost, getblogs, interview, updatePost } from '../controllers/blog.controller.js';
import { authorisation } from '../middlewares/authorisation.middlewares.js';

const router = express.Router();

router.post("/create",authorisation,createPost)
router.post("/update/:id",authorisation,updatePost)
router.post("/delete/:id",authorisation,deletePost)
router.post("/getblog",authorisation,getblogs)
router.post("/interview",interview)


export default router


