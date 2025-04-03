import { Category } from "@prisma/client";
import { prisma } from "../../prisma";
import crypto from 'crypto'
export const fetchRecentUploads = async (providerId: string) => {
    try {
        const userId = await prisma.user.findUnique({
            where: {
                providerId: providerId
            },
            select: {
                id: true
            }   
        })
        if(!userId) {
            throw new Error('User not found');
        }
        const uploads = await prisma.bills.findMany({
            where: {
                userId: userId.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 5
        })
        
        return uploads;
    } catch (error : any) {
        throw new Error(error);
    }
}

export const storeManualBill = async(merchantName: string, totalAmount: number, category: string, purchaseDate: Date, providerId: string) => {
    
    try {
        const userId = await prisma.user.findUnique({
            where: {
                providerId: providerId
            },
            select: {
                id: true
            }   
        })
        if(!userId) {
            throw new Error('User not found');
        }
        
        const bill = await prisma.bills.create({
            data: {
                merchantName,
                totalAmount,
                category: category as Category,
                purchaseDate,
                userId: Number(userId.id)
            }
        })
        return bill;
    } catch (error : any) {
        throw new Error(error);
    }
}

export const deleteBillService = async(billId: string) => {
    try {
        const bill = await prisma.bills.delete({
            where: {
                id: Number(billId)
            }
        })
        return bill;
    } catch (error : any) {
        throw new Error(error);
    }
}
export function isInvalidOCR(ocrResult: any): boolean {
    if (!ocrResult || !ocrResult.result) return true; // Missing result = invalid

    const { establishment, date, total, lineItems, totalConfidence, establishmentConfidence, dateConfidence } =
        ocrResult.result;

    // Ensure required fields exist
    const hasValidFields = Boolean(establishment?.trim()) && Boolean(date?.trim()) && total > 0;
    

    // Ensure line items are present
    const hasLineItems = Array.isArray(lineItems) && lineItems.length > 0;

    // Ensure at least one confidence score is strong enough
    const hasStrongConfidence =
        (totalConfidence ?? 0) >= 0.3 || (establishmentConfidence ?? 0) >= 0.3 || (dateConfidence ?? 0) >= 0.3;

    // Debugging logs
    console.log('Debugging OCR Validation:', {
        hasValidFields,
        hasLineItems,
        hasStrongConfidence
    });

    // Return false (valid) if all checks pass
    return !(hasValidFields && hasLineItems && hasStrongConfidence);
}




export function generateOcrHash(ocrData: any): string {
    return crypto.createHash("sha256").update(JSON.stringify(ocrData)).digest("hex");
}