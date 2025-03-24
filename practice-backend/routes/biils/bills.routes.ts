import { Router } from "express";
import { billController } from "./bills.controller";
import { validateData } from "../../middlewares/validationMiddleware";
import { billsSchema } from "../../types/index.d";
import {uploadLocal} from "../../middlewares/multer";
import { authMiddleware } from "../../middlewares/authMiddleware";

const billsRouter = Router()

billsRouter.post('/manual-bill', validateData(billsSchema) ,billController.manualBill);
billsRouter.post('/auto-bill', [authMiddleware,uploadLocal.single('bill')], billController.autoBill);

export default billsRouter