import { db } from '../src/server/db'
import { positions } from '../src/server/db/schema'

async function main() {
  await db.insert(positions).values([
    {
      title: 'Senior Full-stack Developer',
      department: 'Engineering',
      employmentType: 'Full-time',
      location: 'Casablanca, Morocco',
      workMode: 'hybrid',
      description:
        'Build and ship product features end-to-end with strong TypeScript practices.',
      isActive: true,
    },
    {
      title: 'Backend Engineer (Node.js)',
      department: 'Engineering',
      employmentType: 'Full-time',
      location: 'Rabat',
      workMode: 'remote',
      description:
        'Design APIs and data models with a focus on performance and clarity.',
      isActive: true,
    },
    {
      title: 'Product Designer',
      department: 'Design',
      employmentType: 'Contract',
      location: 'onsite',
      description:
        'Own UI/UX from idea to polished screens aligned with product goals.',
      isActive: true,
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      employmentType: 'Full-time',
      location: 'Casablanca, Morocco',
      workMode: 'hybrid',
      description:
        'Develop and execute marketing campaigns to promote our platform and services.',
      isActive: true,
    },
    {
      title: 'Customer Support Representative',
      department: 'Customer Service',
      employmentType: 'Part-time',
      location: 'Remote',
      workMode: 'remote',
      description:
        'Provide excellent customer service and support to our users via various channels.',
      isActive: true,
    },
    {
      title: 'Data Analyst',
      department: 'Data Science',
      employmentType: 'Full-time',
      location: 'Rabat, Morocco',
      workMode: 'onsite',
      description:
        'Analyze data to provide insights and support data-driven decision-making.',
      isActive: false,
    },
  ])

  console.log('✅ Seed complete')
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Seed failed', err)
  process.exit(1)
})
