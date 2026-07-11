'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { generateDocumentAction } from './actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

export default function BuatDokumenPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [docType, setDocType] = useState('SPH')
  const [customDocType, setCustomDocType] = useState('')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    try {
      const res = await generateDocumentAction(formData)
      if (res.success) {
        router.push('/dashboard/documents')
      } else {
        setError(res.message)
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat memproses dokumen.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Menentukan apakah field tertentu perlu ditampilkan
  const showPriceField = docType === 'SPH' || docType === 'Invoice'
  const labelTargetName =
    docType === 'Company Profile' ? 'Nama Perusahaan' : 'Pihak Tujuan / Klien'
  const labelSubjectName =
    docType === 'Company Profile'
      ? 'Bidang Industri'
      : 'Perihal / Deskripsi Singkat'

  return (
    <div className="relative z-10 mx-auto max-w-2xl space-y-6">
      {/* Background Ornaments */}
      <div className="bg-primary/20 pointer-events-none absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full blur-[150px]" />

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Pembuatan Dokumen Baru
        </h1>
        <p className="text-muted-foreground text-sm">
          Silakan pilih jenis dokumen dan lengkapi formulir. Sistem AI kami akan
          merancang draf secara otomatis.
        </p>
      </div>

      <Card className="glass-card border-white/10 shadow-[0_0_40px_rgba(124,58,237,0.15)]">
        <form action={handleSubmit}>
          <CardHeader>
            <CardTitle>Informasi Dokumen</CardTitle>
            <CardDescription>
              Mohon masukkan detail informasi yang diperlukan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {error && (
              <div className="rounded border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Jenis Dokumen
              </label>
              <select
                name="documentType"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="focus:ring-primary w-full rounded-md border border-slate-800 bg-slate-950/60 p-2 text-sm text-white focus:ring-1"
              >
                <optgroup label="Komersial & Penjualan">
                  <option value="SPH">Surat Penawaran Harga (SPH)</option>
                  <option value="Invoice">Invoice / Surat Tagihan</option>
                  <option value="Company Profile">Company Profile</option>
                  <option value="Proposal Bisnis">
                    Proposal Bisnis / Kemitraan
                  </option>
                </optgroup>
                <optgroup label="Legal & Kontrak">
                  <option value="Surat Perjanjian Kerjasama (MoU)">
                    Surat Perjanjian Kerjasama (MoU)
                  </option>
                  <option value="Surat Kuasa">Surat Kuasa</option>
                  <option value="Non-Disclosure Agreement (NDA)">
                    Non-Disclosure Agreement (NDA)
                  </option>
                </optgroup>
                <optgroup label="Administrasi Perusahaan (HR)">
                  <option value="Surat Keterangan Kerja">
                    Surat Keterangan Kerja (Paklaring)
                  </option>
                  <option value="Surat Keputusan (SK)">
                    Surat Keputusan (SK)
                  </option>
                  <option value="Surat Peringatan (SP)">
                    Surat Peringatan Karyawan (SP)
                  </option>
                  <option value="Surat Pemutusan Hubungan Kerja (PHK)">
                    Surat Pemutusan Hubungan Kerja (PHK)
                  </option>
                  <option value="Surat Tugas">
                    Surat Tugas / Perjalanan Dinas
                  </option>
                </optgroup>
                <optgroup label="Umum & Kedinasan">
                  <option value="Surat Pemerintah">
                    Surat Dinas Pemerintahan
                  </option>
                  <option value="Surat Undangan Resmi">
                    Surat Undangan Resmi
                  </option>
                  <option value="Surat Permohonan">Surat Permohonan</option>
                  <option value="Surat Pemberitahuan">
                    Surat Pemberitahuan (Edaran)
                  </option>
                  <option value="Berita Acara">Berita Acara</option>
                </optgroup>
                <optgroup label="Lainnya">
                  <option value="Lainnya">
                    Jenis Dokumen Lainnya (Ketik Manual)
                  </option>
                </optgroup>
              </select>
            </div>

            {docType === 'Lainnya' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Tentukan Jenis Dokumen
                </label>
                <Input
                  name="customDocumentType"
                  required
                  placeholder="Contoh: Surat Pengajuan Cuti"
                  value={customDocType}
                  onChange={(e) => setCustomDocType(e.target.value)}
                  className="border-slate-800 bg-slate-950/60 text-white"
                />
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  {labelTargetName}
                </label>
                <Input
                  name="targetName"
                  required
                  placeholder="Contoh: PT Teknologi Nusantara / Bpk. Budi"
                  className="border-slate-800 bg-slate-950/60 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Jabatan Penerima / Divisi
                </label>
                <Input
                  name="targetPosition"
                  required
                  placeholder="Contoh: Kepala Bidang / Direktur HRD"
                  className="border-slate-800 bg-slate-950/60 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                {labelSubjectName}
              </label>
              <Input
                name="subjectName"
                required
                placeholder="Contoh: Pengadaan Perangkat Lunak"
                className="border-slate-800 bg-slate-950/60 text-white"
              />
            </div>

            {showPriceField && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Total Nilai / Harga
                </label>
                <Input
                  name="price"
                  required
                  placeholder="Contoh: Rp 50.000.000"
                  className="border-slate-800 bg-slate-950/60 text-white"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Logo Perusahaan (Opsional)
              </label>
              <Input
                type="file"
                name="logo"
                accept="image/*"
                className="file:bg-primary hover:file:bg-primary/90 cursor-pointer border-slate-800 bg-slate-950/60 text-white file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-1 file:text-white"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Alamat Perusahaan
                </label>
                <Input
                  name="senderAddress"
                  required
                  placeholder="Contoh: Jl. Sudirman No. 123, Jakarta"
                  className="border-slate-800 bg-slate-950/60 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Nomor Telepon
                </label>
                <Input
                  name="senderPhone"
                  required
                  placeholder="Contoh: 021-1234567"
                  className="border-slate-800 bg-slate-950/60 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Email Perusahaan
                </label>
                <Input
                  type="email"
                  name="senderEmail"
                  required
                  placeholder="Contoh: info@perusahaan.com"
                  className="border-slate-800 bg-slate-950/60 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">
                  Tanggal Dokumen
                </label>
                <Input
                  type="date"
                  name="documentDate"
                  required
                  className="border-slate-800 bg-slate-950/60 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Dokumen Referensi / Format Lama (Opsional)
              </label>
              <Input
                type="file"
                name="referenceFile"
                accept=".pdf,.txt"
                className="cursor-pointer border-slate-800 bg-slate-950/60 text-white file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-1 file:text-white hover:file:bg-blue-700"
              />
              <p className="text-muted-foreground mt-1 text-xs">
                Unggah PDF surat lama agar AI bisa meniru struktur dan
                bahasanya.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Garis Besar Isi Dokumen
              </label>
              <textarea
                name="mainPoints"
                required
                rows={3}
                placeholder="Contoh: Menawarkan produk software akuntansi dengan diskon 20% khusus bulan ini."
                className="placeholder:text-muted-foreground focus:ring-primary w-full rounded-md border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-white focus:ring-1 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">
                Instruksi Tambahan (Opsional)
              </label>
              <textarea
                name="instruction"
                rows={2}
                placeholder="Contoh: Gunakan bahasa yang sangat formal. Cantumkan masa berlaku penawaran selama 30 hari."
                className="placeholder:text-muted-foreground focus:ring-primary w-full rounded-md border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-white focus:ring-1 focus:outline-none"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t border-slate-800/80 pt-6">
            <button
              type="submit"
              disabled={loading}
              className={buttonVariants({
                variant: 'default',
                className: 'shadow-[0_0_20px_rgba(124,58,237,0.4)]',
              })}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses Dokumen...
                </>
              ) : (
                'Buat Dokumen (AI)'
              )}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
