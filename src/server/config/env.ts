import { config } from 'dotenv'

config()

function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing env var: ${name}`)
  }
  return value
}

export const env = {
  DATABASE_URL: required('DATABASE_URL'),
}
