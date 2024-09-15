import { Router } from "express";
import userRouter from "../api/user/userRoute.js";
import roomRouter from "../api/room/roomRoute.js";
import profileROuter from "../api/profile/profileRoute.js";
const appRouter = Router();


appRouter.use("/user", userRouter);
appRouter.use("/room",roomRouter)
appRouter.use("/profile",profileROuter)
export default appRouter;