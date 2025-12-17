import path from 'node:path'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db } from './index'

async function main() {

  const migrationsFolder = path.join(process.cwd(), 'drizzle')

  await migrate(db, { migrationsFolder })

  console.log('✅ Migrations applied')
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Migration failed', err)
  process.exit(1)
})
