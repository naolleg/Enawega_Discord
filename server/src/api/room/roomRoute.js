import { Router } from "express";
import roomController from "./roomController.js";
import  errorHandler  from "../../midleware/error.js";

const roomRouter = Router();


roomRouter.post('/register', errorHandler(roomController.register))
roomRouter.get('/getAll',errorHandler(roomController.getAll))
roomRouter.get('/get/:id',errorHandler(roomController.getsingle))
roomRouter.put('/update/:id',errorHandler(roomController.update))
roomRouter.delete('/delete/:id',errorHandler(roomController.delete))

export default roomRouter;