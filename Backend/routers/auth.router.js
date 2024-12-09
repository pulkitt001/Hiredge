import express from 'express'

import { getDetail, Login, logout, Signup } from '../controllers/auth.controller.js'
import { authorisation } from '../middlewares/authorisation.middlewares.js';

const router = express.Router();

router.post("/signup",Signup);
router.post("/login",Login);
router.post("/logout",logout);
router.post("/getdetail",authorisation,getDetail)

export default router