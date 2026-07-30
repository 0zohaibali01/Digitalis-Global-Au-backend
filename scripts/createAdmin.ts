import 'dotenv/config'
import bcrypt from 'bcrypt'
import readline from 'node:readline/promises'

import { prisma } from '../src/config/prisma.js'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

async function main() {
  const email = (await rl.question('Admin email: ')).trim().toLowerCase()
  const password = await rl.question('Admin password (min 12 chars): ')
  rl.close()

  if (!email.includes('@')) {
    throw new Error('That does not look like a valid email.')
  }

  if (password.length < 12) {
    throw new Error('Password must be at least 12 characters.')
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  })

  console.log(`Admin user ready: ${user.email} (id: ${user.id})`)
}

main()
  .catch((error) => {
    console.error('Failed to create admin user:', error.message)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })