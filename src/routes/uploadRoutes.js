import { Router } from "express";
import { authJwt } from "../utils/jwt.js";
import { upload } from "../utils/upload.js";

const routes = Router();
routes.post('/', upload.single('file'), async (req, res)=>{
    res.json(req.file)
});

export default routes;