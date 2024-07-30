import { subDays } from 'date-fns'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
	await Promise.all([
		await prisma.invoice.deleteMany(),
		await prisma.goal.deleteMany(),
		await prisma.investment.deleteMany(),
	])

	await Promise.all([
		await prisma.invoice.createMany({ data: [{}, {}] }),
		await prisma.goal.createMany({ data: [{}, {}, {}, {}] }),
		await prisma.investment.createMany({
			data: [
				{
					category: 'FIXED_INCOME',
					amount: 500.98,
					created_at: subDays(new Date(), 1),
				},
				{
					category: 'EQUITIES',
					amount: 1000.24,
					created_at: subDays(new Date(), 2),
				},
				{
					category: 'REAL_ESTATE',
					amount: 500.32,
					created_at: subDays(new Date(), 5),
				},
				{
					category: 'COMMODITIES',
					amount: 300.43,
					created_at: subDays(new Date(), 5),
				},
				{
					category: 'REAL_ESTATE',
					amount: 345.44,
					created_at: subDays(new Date(), 7),
				},
				{
					category: 'CRYPTOCURRENCIES',
					amount: 400.32,
					created_at: subDays(new Date(), 15),
				},
				{
					category: 'MUTUAL_FUNDS',
					amount: 764.93,
					created_at: subDays(new Date(), 28),
				},
			],
		}),
	])
}

seed()
	.then(() => {
		console.log('Seed finished successfully')
	})
	.catch((error) => {
		console.error(`There was an error during database seeding: ${error}`)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
