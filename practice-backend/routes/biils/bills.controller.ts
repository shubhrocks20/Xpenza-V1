import { Request, Response, NextFunction } from "express";
import { generateText } from "../../shared/textRecognition";
import { processAndFetchResult } from "../../shared/tabScanner";
import path from 'node:path';
import { prisma } from "../../prisma";
import { AuthRequest } from "../../middlewares/authMiddleware";
export const billController = {
    async manualBill(req: Request, res: Response, next: NextFunction){
        const {merchantName, totalAmount, category, purchaseDate} = req.body
        let prefixContent = `Hey do deep analysis and figure out the followings from the json extracted from doing optical character recognition on the image of a bill and just give me three things in the form of json the merchant name, the total amount, the best fitted  category`;
        let suffixContent = `for the underline \n ${JSON.stringify(`{
    "URL": "gmail.com",
    "tax": 0,
    "tip": 0,
    "url": "gmail.com",
    "cash": 0,
    "date": "2018-10-18 22:45:00",
    "time": "",
    "ratio": 0,
    "taxes": [],
    "total": 840,
    "change": 0,
    "Country": "",
    "StoreID": "",
    "address": "",
    "dateISO": "2018-10-18T22:45:00",
    "service": 0,
    "Currency": "",
    "barcodes": [],
    "currency": "",
    "discount": 0,
    "rounding": 0,
    "subTotal": 840,
    "VATNumber": "",
    "discounts": [],
    "lineItems": [
        {
            "qty": 1,
            "desc": "1 30.00",
            "unit": "",
            "price": 30,
            "symbols": [],
            "discount": 0,
            "lineType": "",
            "descClean": "Chilll",
            "lineTotal": 30,
            "productCode": "",
            "customFields": {}
        },
        {
            "qty": 1,
            "desc": "Crispy Chilll 1 170.00",
            "unit": "",
            "price": 0,
            "symbols": [],
            "discount": 0,
            "lineType": "",
            "descClean": "Crispy Chilll",
            "lineTotal": 170,
            "productCode": "",
            "customFields": {},
            "supplementaryLineItems": {
                "above": [],
                "below": [
                    {
                        "qty": 0,
                        "desc": "Baby",
                        "unit": "",
                        "price": 0,
                        "symbols": [],
                        "discount": 0,
                        "lineType": "",
                        "descClean": "Baby",
                        "lineTotal": 0,
                        "confidence": 0.5,
                        "productCode": "",
                        "customFields": {}
                    }
                ]
            }
        },
        {
            "qty": 1,
            "desc": "1 130.00",
            "unit": "",
            "price": 130,
            "symbols": [],
            "discount": 0,
            "lineType": "",
            "descClean": "Kashmiri",
            "lineTotal": 130,
            "productCode": "",
            "customFields": {},
            "supplementaryLineItems": {
                "above": [
                    {
                        "qty": 0,
                        "desc": "Baby",
                        "unit": "",
                        "price": 0,
                        "symbols": [],
                        "discount": 0,
                        "lineType": "",
                        "descClean": "Baby",
                        "lineTotal": 0,
                        "confidence": 0.5,
                        "productCode": "",
                        "customFields": {}
                    }
                ],
                "below": [
                    {
                        "qty": 0,
                        "desc": "Kadai",
                        "unit": "",
                        "price": 0,
                        "symbols": [],
                        "discount": 0,
                        "lineType": "",
                        "descClean": "Kadai",
                        "lineTotal": 0,
                        "confidence": 0.5,
                        "productCode": "",
                        "customFields": {}
                    }
                ]
            }
        },
        {
            "qty": 1,
            "desc": "1 250.00",
            "unit": "",
            "price": 250,
            "symbols": [],
            "discount": 0,
            "lineType": "",
            "descClean": "Mutton",
            "lineTotal": 250,
            "productCode": "",
            "customFields": {},
            "supplementaryLineItems": {
                "above": [
                    {
                        "qty": 0,
                        "desc": "Kadai",
                        "unit": "",
                        "price": 0,
                        "symbols": [],
                        "discount": 0,
                        "lineType": "",
                        "descClean": "Kadai",
                        "lineTotal": 0,
                        "confidence": 0.5,
                        "productCode": "",
                        "customFields": {}
                    }
                ],
                "below": []
            }
        },
        {
            "qty": 1,
            "desc": "Biriyani 1 220.00",
            "unit": "",
            "price": 0,
            "symbols": [],
            "discount": 0,
            "lineType": "",
            "descClean": "Biriyani",
            "lineTotal": 220,
            "productCode": "",
            "customFields": {}
        },
        {
            "qty": 6,
            "desc": "6 Soft Drinks 1 40.00",
            "unit": "",
            "price": 40,
            "symbols": [],
            "discount": 0,
            "lineType": "",
            "descClean": "Soft Drinks 1",
            "lineTotal": 40,
            "productCode": "",
            "customFields": {}
        }
    ],
    "otherData": [],
    "systemInfo": {
        "token": "8KxViBRasB9gUWQp",
        "ext": ".jpg"
    },
    "ExpenseType": "",
    "addressNorm": {
        "city": "",
        "state": "",
        "number": "",
        "street": "",
        "suburb": "",
        "country": "",
        "building": "",
        "postcode": ""
    },
    "expenseType": "None",
    "phoneNumber": "9836512340",
    "taxProfiles": [],
    "customFields": {
        "URL": "gmail.com",
        "Country": "",
        "StoreID": "",
        "Currency": "",
        "VATNumber": "",
        "ExpenseType": "",
        "PaymentMethod": "",
        "CardLast4Digits": ""
    },
    "documentType": "receipt",
    "summaryItems": [
        {
            "qty": 6,
            "desc": "Total Qty : 6",
            "unit": "",
            "price": 0,
            "symbols": [],
            "discount": 0,
            "lineType": "Total",
            "descClean": "Total Qty",
            "lineTotal": 840,
            "productCode": "",
            "customFields": {}
        }
    ],
    "PaymentMethod": "",
    "establishment": "ants)",
    "paymentMethod": "",
    "tipConfidence": 0,
    "cashConfidence": 0,
    "dateConfidence": 0.7,
    "no_of_sections": 0,
    "serviceCharges": [],
    "validatedTotal": false,
    "CardLast4Digits": "",
    "taxesConfidence": [],
    "totalConfidence": 0.7,
    "changeConfidence": 0,
    "validatedSubTotal": true,
    "roundingConfidence": 0,
    "subTotalConfidence": 0.99,
    "discountConfidences": [],
    "detected_image_width": 0,
    "validatedEstablishment": false,
    "establishmentConfidence": 0.8,
    "predicted_establishment": "",
    "serviceChargeConfidences": []
}`)}`;
        
        const aiResponse = await generateText(prefixContent + suffixContent)
        const extractedJsonMatch = aiResponse?.match(/```json\n([\s\S]*?)\n```/);
        if (!extractedJsonMatch) {
            res.status(400).json({ success: false, message: "Invalid AI response format" });
            return;
        }
        const extractedJson = JSON.parse(extractedJsonMatch[1]);
        console.log(extractedJson)


        res.json({success: 'true', message: 'Bill created successfully', data : extractedJson})
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

        const getJSONAI = await processAndFetchResult(filePath);

        let suffixContent = `for the underline \n ${JSON.stringify(getJSONAI.result)}`;
        
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
                merchantName: extractedJson.merchantName,
                totalAmount: extractedJson.totalAmount,
                category: extractedJson.category,
                userId: Number(user.id)
            }
        })
        console.log(bill)
        res.json({success: 'true', message: 'Bill created successfully', data : extractedJson})

    } catch (error : any) {
        console.error('Error in autoBill:', error.message);
        next(error);
    }
}

}