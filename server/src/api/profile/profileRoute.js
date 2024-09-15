import { Router } from "express";
import profileController from "./profileController.js";
import  errorHandler  from "../../midleware/error.js";

const profileROuter = Router();

profileROuter.get('/getProfile/:id',errorHandler(profileController.getProfile))
profileROuter.put('/update/:id',errorHandler(profileController.editProfile))

export default profileROuter;