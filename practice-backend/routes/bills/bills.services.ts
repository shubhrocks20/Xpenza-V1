import { Category } from "@prisma/client";
import { prisma } from "../../prisma";

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