import { genAI, AI_MODELS } from './gemini'

interface ParsedElement {
  type: 'text' | 'image'
  x: number
  y: number
  width: number
  height: number
  content: string
}

/**
 * Parses a base64 encoded document image using Gemini Vision model
 * and returns structured bounding boxes and text content.
 */
export async function parseDocumentImage(
  base64Data: string,
  mimeType: string
): Promise<ParsedElement[]> {
  const model = genAI.getGenerativeModel({ model: AI_MODELS.VISION })

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  }

  const prompt = `
You are an expert AI Document Parser and OCR engine.
Your task is to analyze the uploaded document image (like a letter, contract, invoice, or profile).
1. Read the text inside the document accurately.
2. Group the text/visual blocks into separate logical elements (e.g., Kop Surat/Letterhead, Judul Surat, Nomor Surat, Isi Paragraf, Tabel Rincian, Blok Tanda Tangan, dll.).
3. Estimate the bounding box coordinates (x, y, width, height) in pixels relative to a standard A4 page canvas of size 794px width and 1123px height.
   - Standard left margin should be around 80px.
   - Standard element width should be up to 634px (794 - 160 margin).
   - Lay out elements vertically in order of y-coordinate to prevent collisions.
4. Output ONLY a valid JSON array matching the schema below. Do not include markdown code block formatting like \`\`\`json.

JSON Output Schema:
[
  {
    "type": "text" | "image",
    "x": number,
    "y": number,
    "width": number,
    "height": number,
    "content": "string (the OCR-transcribed text or description in Indonesian markdown format)"
  }
]
`

  try {
    const result = await model.generateContent([prompt, imagePart])
    let responseText = await result.response.text()

    // Clean potential markdown wrap
    responseText = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const parsed: ParsedElement[] = JSON.parse(responseText)
    if (!Array.isArray(parsed)) {
      throw new Error('Output is not an array')
    }
    return parsed
  } catch (error) {
    console.error('Gemini Vision Parsing Error:', error)
    // Fallback: return a single text block with OCR text if structured extraction fails
    try {
      const fallbackPrompt =
        'Read all text from this document image and return it as simple text.'
      const fallbackResult = await model.generateContent([
        fallbackPrompt,
        imagePart,
      ])
      const fallbackText = await fallbackResult.response.text()
      return [
        {
          type: 'text',
          x: 80,
          y: 80,
          width: 634,
          height: 800,
          content: fallbackText || 'Gagal mengekstrak teks dari gambar.',
        },
      ]
    } catch (fallbackError) {
      console.error('Fallback Vision OCR Error:', fallbackError)
      throw new Error('Gagal membaca gambar dokumen.')
    }
  }
}
