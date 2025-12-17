import { db } from '../src/server/db'
import { positions } from '../src/server/db/schema'

async function main() {
  await db.insert(positions).values([
    {
      title: 'Senior Full-stack Developer',
      department: 'Engineering',
      employmentType: 'Full-time',
      location: 'Casablanca, Morocco',
      description:
        'Build and ship product features end-to-end with strong TypeScript practices.',
      isActive: true,
    },
    {
      title: 'Backend Engineer (Node.js)',
      department: 'Engineering',
      employmentType: 'Full-time',
      location: 'Remote',
      description:
        'Design APIs and data models with a focus on performance and clarity.',
      isActive: true,
    },
    {
      title: 'Product Designer',
      department: 'Design',
      employmentType: 'Contract',
      location: 'Hybrid',
      description:
        'Own UI/UX from idea to polished screens aligned with product goals.',
      isActive: true,
    },
  ])

  console.log('✅ Seed complete')
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Seed failed', err)
  process.exit(1)
})
