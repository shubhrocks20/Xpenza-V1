import z from 'zod'
import { BillsModel } from '../prisma/zod'

export const loginSchema = z.object({
  emailOrUsername: z.string(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
})

export const billsSchema = BillsModel.pick({
    merchantName: true,
    totalAmount: true,
    category: true,
    purchaseDate: true,
})