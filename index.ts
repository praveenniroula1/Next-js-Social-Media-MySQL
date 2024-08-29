import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const device = await prisma.user.create({
    data: {
      name: 'Alice',
    },
  })
  console.log(device)
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })