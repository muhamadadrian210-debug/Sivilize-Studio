'use server'

import { revalidatePath } from 'next/cache'
import { generateText } from '@/lib/ai/text-generation'
import { getTenantCompanyId, getCurrentSession } from '@/lib/auth/session'
import { prisma } from '@/lib/database/prisma'
import { enforceAIRateLimit } from '@/lib/security/rate-limit'
import fs from 'fs'
import path from 'path'
// pdf-parse is required dynamically to prevent Turbopack build errors

export async function generateDocumentAction(formData: FormData) {
  try {
    const companyId = await getTenantCompanyId()
    if (!companyId) {
      return {
        success: false,
        message:
          'Akses ditolak: Anda tidak tergabung dalam perusahaan mana pun.',
      }
    }

    const session = await getCurrentSession()
    if (!session || !session.user) {
      return { success: false, message: 'Authentication required' }
    }

    // ENFORCE RATE LIMIT TO PREVENT SPAM / BILLING ISSUES
    await enforceAIRateLimit(companyId, session.user.id, 'document-generation')

    let documentType = formData.get('documentType') as string
    if (documentType === 'Lainnya') {
      documentType = formData.get('customDocumentType') as string
    }

    const targetName = formData.get('targetName') as string
    const targetPosition = formData.get('targetPosition') as string
    const subjectName = formData.get('subjectName') as string
    const price = formData.get('price') as string

    // New fields
    const senderAddress = formData.get('senderAddress') as string
    const senderPhone = formData.get('senderPhone') as string
    const senderEmail = formData.get('senderEmail') as string
    const documentDate = formData.get('documentDate') as string
    const mainPoints = formData.get('mainPoints') as string

    const instruction = formData.get('instruction') as string

    // Handle logo upload
    const logoFile = formData.get('logo') as File | null
    if (logoFile && logoFile.size > 0) {
      const arrayBuffer = await logoFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const uploadDir = path.join(process.cwd(), 'public/uploads/logos')
      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true })
      fs.writeFileSync(
        path.join(uploadDir, `${Date.now()}-${logoFile.name}`),
        buffer
      )
    }

    // Handle reference file upload
    const refFile = formData.get('referenceFile') as File | null
    let referenceText = ''
    if (refFile && refFile.size > 0) {
      const arrayBuffer = await refFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      if (refFile.name.endsWith('.pdf')) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParse = require('pdf-parse')
        const parsed = await pdfParse(buffer)
        referenceText = parsed.text
      } else {
        referenceText = buffer.toString('utf-8')
      }
    }

    const senderInfo = `\n[Info Pengirim]\nAlamat: ${senderAddress}\nTelepon: ${senderPhone}\nEmail: ${senderEmail}\nTanggal Dokumen: ${documentDate}\n`
    const basePrompt = `Anda adalah asisten legal dan bisnis profesional. Buatkan draf dokumen dengan tata bahasa Indonesia yang baku, formal, dan sesuai Ejaan Yang Disempurnakan (EYD).${senderInfo}\n`
    let prompt = ''

    switch (documentType) {
      case 'SPH':
        prompt = `${basePrompt}Jenis: Surat Penawaran Harga (SPH)\nTujuan/Penerima: ${targetName} (${targetPosition})\nProyek/Barang: ${subjectName}\nHarga Penawaran: ${price}\nGaris Besar Isi: ${mainPoints}\nInstruksi Khusus: ${instruction}\nFormatlah dengan rapi meliputi kop surat pengirim, pembuka, isi penawaran, dan penutup.`
        break
      case 'Invoice':
        prompt = `${basePrompt}Jenis: Invoice / Surat Tagihan\nTujuan Tagihan: ${targetName} (${targetPosition})\nPerihal: ${subjectName}\nTotal Tagihan: ${price}\nGaris Besar Isi: ${mainPoints}\nInstruksi Khusus: ${instruction}\nBuat format tagihan yang rapi dan profesional.`
        break
      case 'Company Profile':
        prompt = `${basePrompt}Jenis: Company Profile\nNama Perusahaan (Tujuan/Fokus): ${targetName} (${targetPosition})\nIndustri: ${subjectName}\nGaris Besar Isi: ${mainPoints}\nInstruksi Khusus: ${instruction}\nBuatkan kerangka isi yang meyakinkan, mencakup visi, misi, dan layanan utama.`
        break
      case 'Surat Pemerintah':
        prompt = `${basePrompt}Jenis: Surat Dinas Pemerintahan\nInstansi Tujuan: ${targetName}\nJabatan Penerima: ${targetPosition}\nPerihal: ${subjectName}\nGaris Besar Isi: ${mainPoints}\nInstruksi Khusus: ${instruction}\nGunakan struktur surat dinas resmi (nomor surat, lampiran, perihal, pembuka, isi, penutup yang sangat formal).`
        break
      default:
        // Untuk jenis dokumen lainnya secara dinamis (MoU, Paklaring, dll)
        const priceDetail = price ? `\nNilai/Harga Terkait: ${price}` : ''
        prompt = `${basePrompt}Jenis Dokumen: ${documentType}\nPihak/Tujuan: ${targetName}\nJabatan Penerima: ${targetPosition}\nPerihal/Subjek: ${subjectName}${priceDetail}\nGaris Besar Isi: ${mainPoints}\nInstruksi Khusus: ${instruction}\nBuatlah dokumen yang komprehensif dan profesional sesuai standar korporat.`
        break
    }

    if (referenceText) {
      // Potong referensi jika terlalu panjang (maksimal ~3000 karakter)
      const clippedRef =
        referenceText.length > 3000
          ? referenceText.substring(0, 3000) + '...'
          : referenceText
      prompt += `\n\n=== DOKUMEN REFERENSI GAYA BAHASA & STRUKTUR ===\nSilakan tiru gaya bahasa dan kerangka dari dokumen lama berikut:\n${clippedRef}\n===============================================\n`
    }

    let aiContent = 'Gagal memanggil layanan AI.'
    try {
      aiContent = await generateText(prompt, 'TEXT')
    } catch (aiErr) {
      console.warn('AI Generation failed:', aiErr)
      aiContent = `DOKUMEN ${documentType.toUpperCase()}\n\nTujuan: ${targetName}\nPerihal: ${subjectName}\n\n(Catatan: Layanan AI saat ini tidak tersedia, silakan sunting draf ini secara manual).`
    }

    await prisma.document.create({
      data: {
        title: `${documentType === 'SPH' ? 'SPH' : documentType} - ${subjectName}`,
        type: documentType,
        status: 'Draft',
        companyId: companyId,
        createdBy: 'Sistem',
        versions: {
          create: {
            version: 1,
            content: aiContent,
            createdBy: 'Gemini AI',
          },
        },
      },
    })

    revalidatePath('/dashboard/documents')
    return {
      success: true,
      message: `Dokumen ${documentType} berhasil dibuat.`,
    }
  } catch (error: unknown) {
    console.error('Generate Document Error:', error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan pada sistem.',
    }
  }
}
