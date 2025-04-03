import { Request, Response, NextFunction } from "express";
import { generateText } from "../../shared/textRecognition";
import { processAndFetchResult } from "../../shared/tabScanner";
import path from 'node:path';
import { prisma } from "../../prisma";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { deleteBillService, fetchRecentUploads, generateOcrHash, isInvalidOCR, storeManualBill } from "./bills.services";
export const billController = {
    async manualBill(req: Request, res: Response, next: NextFunction){
        const {merchantName, totalAmount, category, purchaseDate} = req.body
        const _req = req as AuthRequest
        try{
            let normalisedCategory = category?.toUpperCase();
            const result = await storeManualBill(merchantName, totalAmount, normalisedCategory, purchaseDate, _req.userId);
            res.json({success: 'true', message: 'Bill created successfully', data : result})
        } catch(err: any){
            console.error('Error in manualBill:', err.message);
            next(err);
        }
    },
    async autoBill(req: Request, res: Response, next: NextFunction) {
        try {
            const _req = req as AuthRequest
            console.log('Uploaded File:', req.file);

            if (!req.file) {
                res.status(400).json({ success: false, message: "No file uploaded" });
                return
            }

            const filePath = path.resolve(req.file.path);
            console.log('Resolved File Path:', filePath);

            const ocrResult = await processAndFetchResult(filePath);
            if (!ocrResult) {
                return res.status(500).json({ success: false, message: "Failed to process image" });
            }
            if (isInvalidOCR(ocrResult)) {
                return res.status(400).json({ success: false, message: "Uploaded file is not a valid bill" });
            }
            const ocrHash = generateOcrHash(ocrResult.result);
            const existingBill = await prisma.bills.findFirst({ where: { ocrHash } });

            if (existingBill) {
                return res.status(409).json({ success: false, message: "This bill has already been processed" });
            }   

            let suffixContent = `for the underline \n ${JSON.stringify(ocrResult.result)}`;
            
            const aiResponse = await generateText(process.env.PREFIX_CONTENT + suffixContent)
            const extractedJsonMatch : any = aiResponse?.match(/```json\n([\s\S]*?)\n```/);
            if (!extractedJsonMatch) {
                res.status(400).json({ success: false, message: "Invalid AI response format" });
                return;
            }
            const extractedJson = JSON.parse(extractedJsonMatch[1]);
            console.log(extractedJson, 'USR ID:', _req.userId)
            const providerId = _req.userId; // Assuming providerId is stored in _req.userId

            const user = await prisma.user.findUnique({
                where: { providerId: providerId },
                select: { id: true }
            });

            if (!user) {
                res.status(404).json({ success: false, message: "User not found" });
                return;
            }

        

            const bill = await prisma.bills.create({
                data: {
                    merchantName: extractedJson.merchant_name,
                    totalAmount: extractedJson.total_amount,
                    category: extractedJson.category,
                    userId: Number(user.id),
                    ocrHash,
                }
            })
            console.log(bill)
            res.json({success: 'true', message: 'Bill created successfully', data : extractedJson})

        } catch (error : any) {
            console.error('Error in autoBill:', error.message);
            next(error);
        }
    },
    async recentUploads(req: Request, res: Response, next: NextFunction) {
        const _req = req as AuthRequest
        try{
            const recentUploads = await fetchRecentUploads(_req.userId);
            res.json({ success: true, message: 'Recent uploads fetched successfully', data: recentUploads });
        }
        catch(err: any){
            console.error('Error in recentUploads:', err.message);
            next(err);
        }
    },
    async deleteBill(req: Request, res: Response, next: NextFunction){
        const {billId} = req.params;

        try{
            const bill = await deleteBillService(billId);
            res.json({success: 'true', message: 'Bill deleted successfully', data: bill})
        } catch(err: any){
            console.error('Error in deleteBill:', err.message);
            next(err);
        }
    }

}