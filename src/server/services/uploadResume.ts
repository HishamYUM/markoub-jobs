import fs from 'node:fs'
import path from 'node:path'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { randomUUID } from 'node:crypto'
import type { ReadableStream as WebReadableStream } from 'node:stream/web'

const MAX_SIZE_BYTES = 2 * 1024 * 1024 // 2MB

export async function savePdfStream(file: File): Promise<string> {
  if (file.type !== 'application/pdf') {
    throw new Error('INVALID_FILE_TYPE')
  }

  const uploadsDir = path.join(process.cwd(), 'uploads')
  await fs.promises.mkdir(uploadsDir, { recursive: true })

  const filename = `${Date.now()}_${randomUUID()}.pdf`
  const absolutePath = path.join(uploadsDir, filename)

  let writtenBytes = 0

  const nodeReadable = Readable.fromWeb(
    file.stream() as unknown as WebReadableStream,
  )

  const writable = fs.createWriteStream(absolutePath)

  try {
    nodeReadable.on('data', (chunk: Buffer) => {
      writtenBytes += chunk.length
      if (writtenBytes > MAX_SIZE_BYTES) {
        nodeReadable.destroy(new Error('FILE_TOO_LARGE'))
      }
    })

    await pipeline(nodeReadable, writable)
  } catch (err) {
    await fs.promises.rm(absolutePath, { force: true })
    throw err
  }

  return `uploads/${filename}`
}
