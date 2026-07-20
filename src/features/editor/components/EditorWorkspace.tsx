'use client'

import { useState, useEffect, useRef } from 'react'
import {
  generateAILayoutAction,
  parseDocumentImageAction,
} from '@/app/editor/actions'
import { useEditorStore } from '@/store/editor-store'
import ReactMarkdown from 'react-markdown'
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from '@dnd-kit/core'
import { buttonVariants } from '@/components/ui/button'

// A draggable tool item in the sidebar
function DraggableTool({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `tool-${id}`,
    data: { type: id },
  })

  return (
    <div
      ref={setNodeRef}
      suppressHydrationWarning
      {...listeners}
      {...attributes}
      className={`bg-muted/50 hover:border-primary flex h-20 cursor-grab items-center justify-center rounded border text-xs ${
        isDragging ? 'border-primary opacity-50' : 'border-border/50'
      }`}
    >
      {label}
    </div>
  )
}

// The main droppable canvas area
function CanvasArea({ title }: { title: string }) {
  const { setNodeRef } = useDroppable({
    id: 'canvas-droppable',
  })

  const elements = useEditorStore((state) => state.elements)
  const selectElement = useEditorStore((state) => state.selectElement)
  const paperSize = useEditorStore((state) => state.paperSize)

  const defaultMinHeight = (() => {
    switch (paperSize) {
      case 'Letter':
        return 1056
      case 'Legal':
        return 1344
      case 'A4':
      default:
        return 1123
    }
  })()

  // Calculate the bottom-most coordinate (y + height + bottom padding) of all canvas elements
  const maxElementBottom = elements.reduce((max, el) => {
    const bottom = (el.y || 0) + (el.height || 0)
    return bottom > max ? bottom : max
  }, 0)

  const paperHeight = Math.max(defaultMinHeight, maxElementBottom + 64)

  const paperStyle: React.CSSProperties = (() => {
    switch (paperSize) {
      case 'Letter':
        return { width: 816, minHeight: paperHeight }
      case 'Legal':
        return { width: 816, minHeight: paperHeight }
      case 'A4':
      default:
        return { width: 794, minHeight: paperHeight }
    }
  })()

  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'auto',
        padding: 32,
        backgroundColor: '#1e1e2e',
      }}
      onClick={() => selectElement(null)}
    >
      {/* Paper Container — pure inline styles */}
      <div
        id="canvas-droppable"
        ref={setNodeRef}
        style={{
          ...paperStyle,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          padding: 64,
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          border: '1px solid #d1d5db',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          colorScheme: 'light',
        }}
      >
        {/* Render elements based on state */}
        {elements.length === 0 ? (
          <div
            className="flex flex-1 flex-col items-center justify-center rounded-lg p-8 text-center"
            style={{
              border: '2px dashed #cbd5e1',
              backgroundColor: '#ffffff',
            }}
          >
            <h1
              className="mb-2 text-3xl font-bold tracking-tight"
              style={{ color: '#1e293b' }}
            >
              {title}
            </h1>
            <p className="max-w-sm text-sm" style={{ color: '#64748b' }}>
              Start dragging elements here or use AI to generate the document
              layout.
            </p>
          </div>
        ) : (
          elements.map((el) => (
            <div
              key={el.id}
              style={{
                position: 'absolute',
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
                cursor: 'pointer',
                padding: 8,
                color: '#1a1a1a',
              }}
              onClick={(e) => {
                e.stopPropagation()
                selectElement(el.id)
              }}
            >
              {el.type === 'text' ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                    color: '#1a1a1a',
                    fontSize: 14,
                  }}
                >
                  <ReactMarkdown>{el.content}</ReactMarkdown>
                </div>
              ) : (
                <div
                  className="flex h-full w-full flex-col items-center justify-center rounded-lg p-4 text-center"
                  style={{
                    border: '1px solid #d1d5db',
                    background:
                      'linear-gradient(to top right, #f1f5f9, #e2e8f0)',
                  }}
                >
                  <span className="text-2xl">🖼️</span>
                  <span
                    className="mt-2 text-xs font-semibold"
                    style={{ color: '#334155' }}
                  >
                    AI Image Component
                  </span>
                  <span
                    className="mt-1 max-w-[85%] truncate text-[10px]"
                    style={{ color: '#94a3b8' }}
                  >
                    {el.content}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  )
}

import { CollaborationPanel } from './CollaborationPanel'

const generateUniqueId = (prefix: string) => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// Predefined templates (presets)
const documentTemplates = [
  {
    id: 'sph',
    name: '📄 Surat Penawaran (SPH)',
    description: 'Template formal Surat Penawaran Harga pengadaan barang/jasa.',
    elements: [
      {
        type: 'text',
        x: 80,
        y: 80,
        width: 634,
        height: 100,
        content: `**PT SIVILIZE CORP INDONESIA**\n*Membangun Peradaban Melalui Solusi Teknologi*\nJl. Kel. Fatululi, Oebobo, Kupang, NTT | Telp: 0813-3821-9957\n------------------------------------------------------------`,
      },
      {
        type: 'text',
        x: 80,
        y: 200,
        width: 634,
        height: 50,
        content: `# SURAT PENAWARAN HARGA\nNo: 014/SCI-SPH/VII/2026`,
      },
      {
        type: 'text',
        x: 80,
        y: 270,
        width: 634,
        height: 260,
        content: `Kepada Yth,\n**Direktur Utama CV Mitra Abadi**\nDi Tempat\n\nDengan hormat,\nBersama surat ini, kami dari **PT Sivilize Corp Indonesia** mengajukan penawaran harga untuk pengerjaan sistem digitalisasi kasir dan website inventaris dengan rincian sebagai berikut:\n\n1. **Lisensi SiKasir Enterprise** - 1 Unit: Rp 15.000.000\n2. **Custom Web Development & Hosting** - 1 Paket: Rp 20.000.000\n3. **Pelatihan Staf & Pemeliharaan** - 1 Bulan: Rp 5.000.000\n\n**Total Penawaran: Rp 40.000.000 (Empat Puluh Juta Rupiah)**\n*Harga di atas belum termasuk PPN 11%.*`,
      },
      {
        type: 'text',
        x: 80,
        y: 560,
        width: 280,
        height: 120,
        content: `Hormat Kami,\n**PT Sivilize Corp Indonesia**\n\n\n\n*(Muhamad Adrian)*\nDirektur Utama`,
      },
      {
        type: 'text',
        x: 434,
        y: 560,
        width: 280,
        height: 120,
        content: `Menyetujui,\n**CV Mitra Abadi**\n\n\n\n*(.................................)*\nPerwakilan Klien`,
      },
    ],
  },
  {
    id: 'spk',
    name: '🤝 Kontrak Kerja (SPK)',
    description: 'Surat Perjanjian Kerja kesepakatan dua belah pihak.',
    elements: [
      {
        type: 'text',
        x: 80,
        y: 80,
        width: 634,
        height: 60,
        content: `# SURAT PERJANJIAN KERJA (SPK)\nNo: 088/SCI-SPK/VII/2026`,
      },
      {
        type: 'text',
        x: 80,
        y: 160,
        width: 634,
        height: 380,
        content: `Pada hari ini, Senin tanggal 20 Juli 2026, telah disepakati Perjanjian Kerja antara:\n\n1. **Muhamad Adrian**, bertindak atas nama **PT Sivilize Corp Indonesia** (selanjutnya disebut **PIHAK PERTAMA**).\n2. **[Nama Klien]**, bertindak atas nama **[Nama Instansi/Klien]** (selanjutnya disebut **PIHAK KEDUA**).\n\nKedua belah pihak sepakat untuk melakukan kerja sama dengan ketentuan sebagai berikut:\n\n* **Pasal 1 (Lingkup Kerja)**: PIHAK PERTAMA akan menyediakan jasa pembuatan software *Sivilize Dine Lite* untuk unit restoran PIHAK KEDUA.\n* **Pasal 2 (Nilai Kontrak)**: Nilai kontrak disepakati sebesar **Rp 25.000.000 (Dua Puluh Lima Juta Rupiah)**.\n* **Pasal 3 (Metode Pembayaran)**: DP 50% di awal proyek, dan pelunasan 50% setelah uji coba selesai dilakukan.\n\nDemikian perjanjian ini dibuat untuk dipatuhi bersama.`,
      },
      {
        type: 'text',
        x: 80,
        y: 570,
        width: 280,
        height: 120,
        content: `**PIHAK PERTAMA**\nPT Sivilize Corp Indonesia\n\n\n\n*(Muhamad Adrian)*\nDirektur Utama`,
      },
      {
        type: 'text',
        x: 434,
        y: 570,
        width: 280,
        height: 120,
        content: `**PIHAK KEDUA**\n[Nama Instansi]\n\n\n\n*(.................................)*\nPerwakilan`,
      },
    ],
  },
  {
    id: 'invoice',
    name: '🧾 Invoice Tagihan',
    description: 'Rincian pembayaran formal untuk tagihan klien.',
    elements: [
      {
        type: 'text',
        x: 80,
        y: 80,
        width: 300,
        height: 120,
        content: `**PT SIVILIZE CORP INDONESIA**\nJl. Kel. Fatululi, Oebobo\nKupang, NTT\nTelp: 0813-3821-9957\nmuhamadadrian210@gmail.com`,
      },
      {
        type: 'text',
        x: 434,
        y: 80,
        width: 280,
        height: 120,
        content: `# INVOICE\n**No: #INV-2026-009**\nTanggal: 20 Juli 2026\nJatuh Tempo: 04 Agustus 2026`,
      },
      {
        type: 'text',
        x: 80,
        y: 220,
        width: 634,
        height: 80,
        content: `**DITAGIHKAN KEPADA:**\n**[Nama Klien / Instansi]**\n[Alamat Klien]\nTelp: [Kontak Klien]`,
      },
      {
        type: 'text',
        x: 80,
        y: 320,
        width: 634,
        height: 180,
        content: `| Deskripsi Pekerjaan | Jumlah | Harga Satuan | Total |\n| :--- | :---: | :---: | :---: |\n| Pembuatan Aplikasi POS SiKasir | 1 | Rp 15.000.000 | Rp 15.000.000 |\n| Integrasi Database & API Cloud | 1 | Rp 5.000.000 | Rp 5.000.000 |\n| **Subtotal** | | | **Rp 20.000.000** |\n| PPN 11% | | | Rp 2.200.000 |\n| **Total Pembayaran** | | | **Rp 22.200.000** |`,
      },
      {
        type: 'text',
        x: 80,
        y: 530,
        width: 634,
        height: 100,
        content: `**Informasi Pembayaran:**\nTransfer Bank Mandiri: **123-456-789-0**\na.n. PT Sivilize Corp Indonesia\n*Harap sertakan bukti transfer via email/WhatsApp setelah melakukan pembayaran.*`,
      },
    ],
  },
  {
    id: 'profile',
    name: '🏢 Company Profile Brief',
    description: 'Profil ringkas perusahaan dan pilar layanan.',
    elements: [
      {
        type: 'text',
        x: 80,
        y: 80,
        width: 634,
        height: 150,
        content: `# COMPANY PROFILE\n## PT Sivilize Corp Indonesia\n\n*Membangun Peradaban Melalui Solusi Komputasi yang Presisi*`,
      },
      {
        type: 'text',
        x: 80,
        y: 250,
        width: 634,
        height: 250,
        content: `### 🏢 Tentang Kami\nPT Sivilize Corp Indonesia adalah perusahaan teknologi yang didirikan oleh **Muhamad Adrian** dengan visi menghadirkan digitalisasi komprehensif bagi bisnis lokal dan konstruksi nasional. Kami percaya teknologi canggih harus bisa dinikmati secara instan dan ramah guna.\n\n### 🌐 Pilar Bisnis Utama\n* **Sivilize Hub Pro**: Sistem otomasi perhitungan RAB dan monitoring proyek sipil.\n* **SiKasir**: POS dan manajemen inventaris bertenaga asisten Gemini AI.\n* **Sivilize Dine Lite**: Aplikasi pemesanan QR, reservasi meja, dan CRM cafe/resto.\n* **Sivilize Brief**: Asisten transkrip dan notulensi rapat cerdas.`,
      },
      {
        type: 'text',
        x: 80,
        y: 530,
        width: 634,
        height: 80,
        content: `**Kontak Hubungi Kami:**\n📍 Kel. Fatululi, Oebobo, Kupang, NTT\n📧 muhamadadrian210@gmail.com | 📞 0813-3821-9957`,
      },
    ],
  },
]

// Predefined components (modular blocks)
const libraryComponents = [
  {
    id: 'kop_surat',
    name: '🏢 Kop Surat Resmi',
    description: 'Header resmi dengan nama PT Sivilize Corp Indonesia.',
    element: {
      type: 'text',
      width: 634,
      height: 100,
      content: `**PT SIVILIZE CORP INDONESIA**\n*Membangun Peradaban Melalui Solusi Teknologi*\nJl. Kel. Fatululi, Oebobo, Kupang, NTT | Telp: 0813-3821-9957\n------------------------------------------------------------`,
    },
  },
  {
    id: 'tabel_harga',
    name: '📊 Tabel Rincian Harga',
    description: 'Tabel rincian harga barang/jasa formal.',
    element: {
      type: 'text',
      width: 634,
      height: 150,
      content: `| Item Pekerjaan | Qty | Harga Satuan | Total |\n| :--- | :---: | :---: | :---: |\n| Jasa Pembuatan Website | 1 | Rp 15.000.000 | Rp 15.000.000 |\n| Integrasi Sistem Kasir | 1 | Rp 5.000.000 | Rp 5.000.000 |\n| **Total** | | | **Rp 20.000.000** |`,
    },
  },
  {
    id: 'tanda_tangan',
    name: '✍️ Kolom Tanda Tangan',
    description: 'Blok dua kolom tanda tangan pihak pengirim dan penerima.',
    element: {
      type: 'text',
      width: 634,
      height: 120,
      content: `\n\n| Hormat Kami,\n**PT Sivilize Corp Indonesia**\n\n\n\n*(Muhamad Adrian)*\nDirektur Utama | Menyetujui,\n**[Nama Klien / Perwakilan]**\n\n\n\n*(.................................)*\nPerwakilan Klien |`,
    },
  },
  {
    id: 'footer_disclaimer',
    name: '🛡️ Catatan & Disclaimer',
    description: 'Catatan tambahan penawaran atau batas validitas.',
    element: {
      type: 'text',
      width: 634,
      height: 80,
      content: `**Catatan:**\n* Penawaran ini berlaku selama 30 hari sejak tanggal dokumen dibuat.\n* Pembayaran uang muka (DP) minimal sebesar 50% sebelum pengerjaan dimulai.`,
    },
  },
]

export function EditorWorkspace({
  document,
}: {
  document: {
    id: string
    title: string
    type?: string
    versions?: { content: string }[]
  }
}) {
  const [activeTab, setActiveTab] = useState<'properties' | 'comments'>(
    'properties'
  )
  const [leftTab, setLeftTab] = useState<'tools' | 'library'>('tools')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isParsing, setIsParsing] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsParsing(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const dataUrl = reader.result as string
      try {
        const res = await parseDocumentImageAction(dataUrl)
        if (res.success && res.elements) {
          clearCanvas()
          res.elements.forEach(
            (
              el: {
                type: string
                x?: number
                y?: number
                width?: number
                height?: number
                content?: string
              },
              idx: number
            ) => {
              addElement({
                id: generateUniqueId(`ocr-el-${idx}`),
                type: el.type === 'image' ? 'image' : 'text',
                x: el.x || 80,
                y: el.y || 80 + idx * 150,
                width: el.width || 634,
                height: el.height || 100,
                content: el.content || '',
              })
            }
          )
          alert(
            'AI berhasil mendeteksi tata letak surat! Silakan geser atau edit elemen.'
          )
        } else {
          alert(res.message || 'Gagal memproses gambar surat.')
        }
      } catch (err) {
        console.error(err)
        alert('Terjadi kesalahan saat memproses gambar.')
      } finally {
        setIsParsing(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const addElement = useEditorStore((state) => state.addElement)
  const selectedElementId = useEditorStore((state) => state.selectedElementId)
  const elements = useEditorStore((state) => state.elements)
  const updateElement = useEditorStore((state) => state.updateElement)
  const clearCanvas = useEditorStore((state) => state.clearCanvas)
  const paperSize = useEditorStore((state) => state.paperSize)

  const selectedElement = elements.find((el) => el.id === selectedElementId)

  const hasInitialized = useRef(false)

  const applyTemplate = (
    templateElements: (typeof documentTemplates)[0]['elements']
  ) => {
    clearCanvas()
    templateElements.forEach((el, idx) => {
      addElement({
        id: generateUniqueId(`tpl-el-${idx}`),
        type: el.type as 'text' | 'image',
        x: el.x,
        y: el.y,
        width: el.width,
        height: el.height,
        content: el.content,
      })
    })
  }

  const insertComponent = (comp: (typeof libraryComponents)[0]['element']) => {
    const currentMaxY = elements.reduce((max, el) => {
      const bottom = el.y + el.height
      return bottom > max ? bottom : max
    }, 0)

    const insertY = Math.max(80, currentMaxY + 24)

    addElement({
      id: generateUniqueId('lib-comp'),
      type: comp.type as 'text' | 'image',
      x: 80,
      y: insertY,
      width: comp.width,
      height: comp.height,
      content: comp.content,
    })
  }

  // Initialize with AI content if available and canvas is empty
  useEffect(() => {
    // Check if we have versions and canvas is empty
    if (
      document.versions &&
      document.versions.length > 0 &&
      elements.length === 0 &&
      !hasInitialized.current
    ) {
      hasInitialized.current = true
      const initialContent = document.versions[0].content
      addElement({
        id: `el-initial-${crypto.randomUUID()}`,
        type: 'text',
        x: 80,
        y: 80,
        width: 634, // A4 width minus margins
        height: 800, // Large initial height
        content: initialContent,
      })
    }
  }, [document.versions, elements.length, addElement])

  // Handle AI Layout Generation
  const handleGenerateAI = async () => {
    setIsGenerating(true)
    try {
      const res = await generateAILayoutAction(
        document.type || 'Business Document',
        'Professional and clean layout with modern SaaS styling.'
      )
      if (res.success && res.layout) {
        clearCanvas()
        const pages = res.layout.pages
        if (pages && pages.length > 0) {
          const firstPage = pages[0]

          // Stack elements vertically to prevent layout overlaps
          let currentY = 80

          firstPage.elements.forEach(
            (
              aiEl: { type: string; contentPlaceholder?: string },
              idx: number
            ) => {
              const width = 634 // A4 width (794) minus left/right margins (80 * 2)
              let height = 80

              if (aiEl.type === 'image' || aiEl.type === 'logo') {
                height = 200
              } else if (aiEl.type === 'title') {
                height = 60
              } else {
                height = 120
              }

              addElement({
                id: `ai-el-${Date.now()}-${idx}`,
                type:
                  aiEl.type === 'image' || aiEl.type === 'logo'
                    ? 'image'
                    : 'text',
                x: 80, // standardized margin
                y: currentY,
                width,
                height,
                content: aiEl.contentPlaceholder || 'Generated Text',
              })

              currentY += height + 24 // offset with consistent margin spacing
            }
          )
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle drop event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event

    if (over && over.id === 'canvas-droppable') {
      const toolType = active.data.current?.type
      if (!toolType) return

      const newId = `el-${Date.now()}`

      const estimatedX = Math.max(50, 200 + delta.x)
      const estimatedY = Math.max(50, 100 + delta.y)

      addElement({
        id: newId,
        type: toolType as 'text' | 'image',
        x: estimatedX,
        y: estimatedY,
        width: 300,
        height: toolType === 'text' ? 100 : 200,
        content:
          toolType === 'text' ? 'Click to edit text...' : 'image-placeholder',
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Tools/Elements/Library) */}
        <aside className="bg-background border-border/40 flex w-64 flex-col overflow-hidden border-r">
          {/* Left Tab Switcher */}
          <div className="border-border/40 bg-card flex border-b">
            <button
              className={`flex-1 py-3 text-[10px] font-bold tracking-wider uppercase transition-colors ${leftTab === 'tools' ? 'text-primary border-primary border-b-2' : 'text-muted-foreground hover:text-white'}`}
              onClick={() => setLeftTab('tools')}
            >
              🛠️ Elements
            </button>
            <button
              className={`flex-1 py-3 text-[10px] font-bold tracking-wider uppercase transition-colors ${leftTab === 'library' ? 'text-primary border-primary border-b-2' : 'text-muted-foreground hover:text-white'}`}
              onClick={() => setLeftTab('library')}
            >
              📚 Library
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-4">
            {leftTab === 'tools' ? (
              <>
                <div>
                  <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                    Add Elements
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <DraggableTool id="text" label="Text Block" />
                    <DraggableTool id="image" label="Image" />
                  </div>
                </div>

                <div>
                  <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                    AI Generation
                  </h3>
                  <button
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className={buttonVariants({
                      variant: 'secondary',
                      className: 'w-full text-xs',
                    })}
                  >
                    {isGenerating ? '⏳ Generating...' : '✨ Generate Layout'}
                  </button>
                </div>

                <div className="border-border/40 border-t pt-4">
                  <h3 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
                    📷 AI Image Parser
                  </h3>
                  <p className="text-muted-foreground mb-3 text-[10px] leading-normal">
                    Unggah foto/scan surat fisik untuk diubah otomatis menjadi
                    elemen kanvas yang bisa diedit dan digeser.
                  </p>
                  <label
                    className={buttonVariants({
                      variant: 'outline',
                      className:
                        'flex w-full cursor-pointer items-center justify-center gap-2 text-xs',
                    })}
                  >
                    {isParsing ? '⏳ Memproses...' : '📁 Pilih Gambar Surat'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isParsing}
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                    Document Templates
                  </h3>
                  <div className="space-y-3">
                    {documentTemplates.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => applyTemplate(tpl.elements)}
                        className="border-border/60 bg-muted/30 hover:border-primary hover:bg-primary/5 group w-full rounded-lg border p-3 text-left transition-all"
                      >
                        <div className="group-hover:text-primary text-xs font-semibold text-white transition-colors">
                          {tpl.name}
                        </div>
                        <div className="text-muted-foreground mt-1 text-[10px] leading-normal">
                          {tpl.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                    Modular Blocks
                  </h3>
                  <div className="space-y-3">
                    {libraryComponents.map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => insertComponent(comp.element)}
                        className="border-border/60 bg-muted/30 hover:border-primary hover:bg-primary/5 group w-full rounded-lg border p-3 text-left transition-all"
                      >
                        <div className="group-hover:text-primary text-xs font-semibold text-white transition-colors">
                          {comp.name}
                        </div>
                        <div className="text-muted-foreground mt-1 text-[10px] leading-normal">
                          {comp.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>

        {/* Center Canvas */}
        <CanvasArea title={document.title} />

        {/* Right Sidebar (Properties & Comments) */}
        <aside className="bg-background border-border/40 flex w-64 flex-col border-l">
          <div className="border-border/40 flex border-b">
            <button
              className={`flex-1 p-3 text-xs font-semibold tracking-wider uppercase ${activeTab === 'properties' ? 'text-primary border-primary border-b-2' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('properties')}
            >
              Properties
            </button>
            <button
              className={`flex-1 p-3 text-xs font-semibold tracking-wider uppercase ${activeTab === 'comments' ? 'text-primary border-primary border-b-2' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
          </div>

          <div className="flex-1 overflow-hidden p-4">
            {activeTab === 'comments' ? (
              <CollaborationPanel documentId={document.id} />
            ) : (
              <>
                {!selectedElement ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-xs">
                      Select an element to edit its properties, or edit document
                      properties below.
                    </p>

                    <div className="border-border/40 space-y-3 border-t pt-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">
                          Paper Size
                        </label>
                        <select
                          className="bg-background border-border focus:ring-primary w-full rounded-md border p-2 text-sm focus:ring-1"
                          value={paperSize}
                          onChange={(e) => {
                            useEditorStore
                              .getState()
                              .setPaperSize(
                                e.target.value as 'A4' | 'Letter' | 'Legal'
                              )
                          }}
                        >
                          <option value="A4">A4 (210 x 297 mm)</option>
                          <option value="Letter">
                            US Letter (8.5 x 11 in)
                          </option>
                          <option value="Legal">US Legal (8.5 x 14 in)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold">Type</label>
                      <div className="text-sm capitalize">
                        {selectedElement.type}
                      </div>
                    </div>

                    {selectedElement.type === 'text' && (
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Content</label>
                        <textarea
                          className="bg-background border-border w-full rounded-md border p-2 text-sm"
                          value={selectedElement.content}
                          onChange={(e) =>
                            updateElement(selectedElement.id, {
                              content: e.target.value,
                            })
                          }
                          rows={5}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Width</label>
                        <input
                          type="number"
                          className="bg-background border-border w-full rounded border p-1 text-sm"
                          value={selectedElement.width}
                          onChange={(e) =>
                            updateElement(selectedElement.id, {
                              width: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold">Height</label>
                        <input
                          type="number"
                          className="bg-background border-border w-full rounded border p-1 text-sm"
                          value={selectedElement.height}
                          onChange={(e) =>
                            updateElement(selectedElement.id, {
                              height: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </aside>
      </div>
    </DndContext>
  )
}
