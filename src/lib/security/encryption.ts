import crypto from 'crypto'

// A 32-byte key is required for AES-256
// We use a fallback key ONLY if environment is not initialized yet (e.g., during build phase)
// In production, env.ts will enforce that ENCRYPTION_KEY is present
const getEncryptionKey = () => {
  const key = process.env.ENCRYPTION_KEY || '00000000000000000000000000000000'
  if (key.length !== 32) {
    console.error('FATAL ERROR: ENCRYPTION_KEY must be exactly 32 bytes long.')
  }
  return Buffer.from(key, 'utf-8')
}

const ALGORITHM = 'aes-256-gcm'

/**
 * Encrypts a plaintext string using AES-256-GCM.
 * Returns a base64 string formatted as: iv:authTag:encryptedData
 */
export function encrypt(text: string): string {
  try {
    const iv = crypto.randomBytes(12) // 96-bit IV is standard for GCM
    const cipher = crypto.createCipheriv(ALGORITHM, getEncryptionKey(), iv)

    let encrypted = cipher.update(text, 'utf8', 'base64')
    encrypted += cipher.final('base64')

    const authTag = cipher.getAuthTag().toString('base64')

    // Return the IV, the auth tag, and the encrypted text joined by colons
    return `${iv.toString('base64')}:${authTag}:${encrypted}`
  } catch (error) {
    console.error('Encryption Failed:', error)
    throw new Error('Gagal mengenkripsi data sensitif.')
  }
}

/**
 * Decrypts a cipher text formatted as: iv:authTag:encryptedData
 * If the data was tampered with, GCM will throw an error automatically.
 */
export function decrypt(cipherText: string): string {
  if (!cipherText || !cipherText.includes(':')) {
    // If it doesn't look like cipher text (e.g. legacy unencrypted data), return as is
    return cipherText
  }

  try {
    const parts = cipherText.split(':')
    if (parts.length !== 3) return cipherText

    const iv = Buffer.from(parts[0], 'base64')
    const authTag = Buffer.from(parts[1], 'base64')
    const encryptedText = parts[2]

    const decipher = crypto.createDecipheriv(ALGORITHM, getEncryptionKey(), iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encryptedText, 'base64', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    console.error('Decryption Failed:', error)
    return '[DATA CORRUPTED ATAU KUNCI ENKRIPSI SALAH]'
  }
}
