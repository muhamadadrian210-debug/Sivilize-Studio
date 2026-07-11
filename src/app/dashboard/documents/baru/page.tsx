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
import {
  Loader2,
  FileText,
  Upload,
  Building2,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  PenLine,
} from 'lucide-react'

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

  const showPriceField = docType === 'SPH' || docType === 'Invoice'
  const labelTargetName =
    docType === 'Company Profile' ? 'Nama Perusahaan' : 'Pihak Tujuan / Klien'
  const labelSubjectName =
    docType === 'Company Profile'
      ? 'Bidang Industri'
      : 'Perihal / Deskripsi Singkat'

  return (
    <div className="relative mx-auto max-w-3xl space-y-6 pb-12">
      {/* ===== ORNAMEN BACKGROUND ===== */}
      <div className="pointer-events-none absolute -top-32 -right-40 -z-10 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[160px]" />
      <div className="pointer-events-none absolute top-60 -left-40 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-20 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[120px]" />

      {/* ===== HEADER ===== */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
          <FileText className="h-6 w-6 text-violet-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Pembuatan Dokumen Baru
          </h1>
          <p className="text-muted-foreground text-sm">
            Silakan pilih jenis dokumen dan lengkapi formulir. Sistem AI kami
            akan merancang draf secara otomatis.
          </p>
        </div>
      </div>

      {/* ===== FORM CARD ===== */}
      <Card className="relative overflow-hidden border-white/[0.08] bg-slate-900/60 shadow-[0_0_60px_rgba(124,58,237,0.08)] backdrop-blur-2xl">
        {/* Decorative top gradient line */}
        <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

        <form action={handleSubmit}>
          <CardHeader className="border-b border-white/[0.06] pb-5">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-4 w-4 text-violet-400" />
              Informasi Dokumen
            </CardTitle>
            <CardDescription>
              Mohon masukkan detail informasi yang diperlukan.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {error && (
              <div className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
                <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-red-500" />
                {error}
              </div>
            )}

            {/* === SECTION: Jenis Dokumen === */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-violet-400/80 uppercase">
                <FileText className="h-3.5 w-3.5" />
                Jenis Dokumen
              </div>
              <select
                name="documentType"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-slate-950/50 p-3 text-sm text-white transition-all focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20 focus:outline-none"
              >
                <optgroup label="Komersial &amp; Penjualan">
                  <option value="SPH">Surat Penawaran Harga (SPH)</option>
                  <option value="Invoice">Invoice / Surat Tagihan</option>
                  <option value="Company Profile">Company Profile</option>
                  <option value="Proposal Bisnis">
                    Proposal Bisnis / Kemitraan
                  </option>
                </optgroup>
                <optgroup label="Legal &amp; Kontrak">
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
                <optgroup label="Umum &amp; Kedinasan">
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
                  className="rounded-xl border-white/[0.08] bg-slate-950/50 text-white focus:border-violet-500/40"
                />
              </div>
            )}

            {/* Divider */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-900/60 px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  Informasi Penerima
                </span>
              </div>
            </div>

            {/* === SECTION: Penerima === */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                  <User className="h-3.5 w-3.5 text-violet-400/70" />
                  {labelTargetName}
                </label>
                <Input
                  name="targetName"
                  required
                  placeholder="Contoh: PT Teknologi Nusantara / Bpk. Budi"
                  className="rounded-xl border-white/[0.08] bg-slate-950/50 text-white focus:border-violet-500/40"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                  <Building2 className="h-3.5 w-3.5 text-violet-400/70" />
                  Jabatan Penerima / Divisi
                </label>
                <Input
                  name="targetPosition"
                  required
                  placeholder="Contoh: Kepala Bidang / Direktur HRD"
                  className="rounded-xl border-white/[0.08] bg-slate-950/50 text-white focus:border-violet-500/40"
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
                className="rounded-xl border-white/[0.08] bg-slate-950/50 text-white focus:border-violet-500/40"
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
                  className="rounded-xl border-white/[0.08] bg-slate-950/50 text-white focus:border-violet-500/40"
                />
              </div>
            )}

            {/* Divider */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-900/60 px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  Informasi Pengirim
                </span>
              </div>
            </div>

            {/* === SECTION: Pengirim === */}
            <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                  <Upload className="h-3.5 w-3.5 text-blue-400/70" />
                  Logo Perusahaan (Opsional)
                </label>
                <Input
                  type="file"
                  name="logo"
                  accept="image/*"
                  className="cursor-pointer rounded-xl border-white/[0.08] bg-slate-950/50 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-violet-600 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-white file:transition-colors hover:file:bg-violet-700"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400/70" />
                    Alamat Perusahaan
                  </label>
                  <Input
                    name="senderAddress"
                    required
                    placeholder="Jl. Sudirman No. 123, Jakarta"
                    className="rounded-xl border-white/[0.08] bg-slate-950/50 text-white focus:border-violet-500/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                    <Phone className="h-3.5 w-3.5 text-amber-400/70" />
                    Nomor Telepon
                  </label>
                  <Input
                    name="senderPhone"
                    required
                    placeholder="021-1234567"
                    className="rounded-xl border-white/[0.08] bg-slate-950/50 text-white focus:border-violet-500/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                    <Mail className="h-3.5 w-3.5 text-sky-400/70" />
                    Email Perusahaan
                  </label>
                  <Input
                    type="email"
                    name="senderEmail"
                    required
                    placeholder="info@perusahaan.com"
                    className="rounded-xl border-white/[0.08] bg-slate-950/50 text-white focus:border-violet-500/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                    <Calendar className="h-3.5 w-3.5 text-rose-400/70" />
                    Tanggal Dokumen
                  </label>
                  <Input
                    type="date"
                    name="documentDate"
                    required
                    className="rounded-xl border-white/[0.08] bg-slate-950/50 text-white focus:border-violet-500/40"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-900/60 px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  Konten &amp; Referensi
                </span>
              </div>
            </div>

            {/* === SECTION: Konten === */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                <Upload className="h-3.5 w-3.5 text-blue-400/70" />
                Dokumen Referensi / Format Lama (Opsional)
              </label>
              <Input
                type="file"
                name="referenceFile"
                accept=".pdf,.txt"
                className="cursor-pointer rounded-xl border-white/[0.08] bg-slate-950/50 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-1 file:text-xs file:font-semibold file:text-white file:transition-colors hover:file:bg-blue-700"
              />
              <p className="text-muted-foreground pl-1 text-xs">
                Unggah PDF surat lama agar AI bisa meniru struktur dan
                bahasanya.
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                <PenLine className="h-3.5 w-3.5 text-violet-400/70" />
                Garis Besar Isi Dokumen
              </label>
              <textarea
                name="mainPoints"
                required
                rows={3}
                placeholder="Contoh: Menawarkan produk software akuntansi dengan diskon 20% khusus bulan ini. Sebutkan fitur unggulan dan keuntungan bagi klien."
                className="w-full rounded-xl border border-white/[0.08] bg-slate-950/50 px-4 py-3 text-sm text-white transition-all placeholder:text-slate-600 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20 focus:outline-none"
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
                className="w-full rounded-xl border border-white/[0.08] bg-slate-950/50 px-4 py-3 text-sm text-white transition-all placeholder:text-slate-600 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20 focus:outline-none"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end border-t border-white/[0.06] px-6 py-5">
            <button
              type="submit"
              disabled={loading}
              className={buttonVariants({
                variant: 'default',
                className:
                  'relative overflow-hidden rounded-xl px-6 py-2.5 font-semibold shadow-[0_0_30px_rgba(124,58,237,0.35)] transition-all hover:shadow-[0_0_40px_rgba(124,58,237,0.5)]',
              })}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses Dokumen...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Buat Dokumen (AI)
                </>
              )}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
