import { Router } from "express";
import { billController } from "./bills.controller";
import { validateData } from "../../middlewares/validationMiddleware";
import { billsSchema } from "../../types/index.d";
import {uploadLocal} from "../../middlewares/multer";
import { authMiddleware } from "../../middlewares/authMiddleware";

const billsRouter = Router()
billsRouter.get('/', authMiddleware, billController.getFilteredBillsController)
billsRouter.post('/manual-bill', [authMiddleware, validateData(billsSchema)] ,billController.manualBill);
billsRouter.post('/auto-bill', [authMiddleware,uploadLocal.single('bill')], billController.autoBill);
billsRouter.get('/recent-uploads', authMiddleware, billController.recentUploads);
billsRouter.delete(`/:billId`, authMiddleware, billController.deleteBill);
billsRouter.get('/category-wise-spend/:category', authMiddleware, billController.categoryWiseSpend);
billsRouter.get('/all-categories-spend', authMiddleware, billController.allCategoriesSpend);
export default billsRouter