'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { LayoutTemplate, ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function GatekeeperPage() {
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    // Reveal options after logo intro animation finishes (approx 2s)
    const timer = setTimeout(() => {
      setShowOptions(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-background selection:bg-primary/30 relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showOptions ? 0.3 : 0.1 }}
          transition={{ duration: 1.5 }}
          className="bg-primary/20 absolute top-0 left-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showOptions ? 0.2 : 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-violet-600/20 blur-[150px]"
        />
      </div>

      <AnimatePresence mode="wait">
        {!showOptions ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="pt-safe z-10 flex min-h-screen w-full flex-col items-center justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-violet-500/20 blur-xl"></div>
              <Image
                src="/logo.jpg"
                alt="Sivilize Studio Logo"
                width={112}
                height={112}
                className="relative mb-6 h-28 w-28 rounded-3xl object-cover shadow-[0_0_60px_rgba(124,58,237,0.5)]"
              />
            </div>
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Sivilize Studio
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '250px' }}
              transition={{ delay: 0.5, duration: 1.2, ease: 'easeInOut' }}
              className="via-primary mt-6 h-px bg-gradient-to-r from-transparent to-transparent"
            />
          </motion.div>
        ) : (
          <div
            key="content"
            className="z-10 flex min-h-screen w-full flex-col pt-12 pt-[env(safe-area-inset-top,3rem)] md:pt-16 lg:flex-row lg:pt-0"
          >
            {/* Left Column: Educational & Value Proposition */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex w-full flex-col justify-center px-6 py-12 md:px-12 lg:w-1/2 lg:px-20 xl:px-32"
            >
              <div className="mb-8 flex items-center gap-4 md:mb-12">
                <Image
                  src="/logo.jpg"
                  alt="Sivilize Studio Logo"
                  width={40}
                  height={40}
                  className="rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                />
                <span className="text-xl font-bold tracking-wide text-white">
                  Sivilize Studio
                </span>
              </div>

              <h2 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-white lg:text-5xl xl:text-6xl">
                Otomatisasi Dokumen Bisnis <br className="hidden md:block" />
                <span className="text-gradient-primary">Tanpa Batas.</span>
              </h2>

              <p className="text-muted-foreground mb-10 max-w-lg text-base leading-relaxed md:text-lg">
                Ubah berjam-jam rutinitas administratif menjadi hitungan menit.
                Sistem operasi dokumen cerdas yang dirancang khusus untuk
                mempercepat pertumbuhan korporasi Anda.
              </p>

              {/* Feature Stepper */}
              <div className="relative ml-2 flex flex-col gap-8 before:absolute before:inset-y-0 before:left-[1.375rem] before:w-px before:bg-white/10 md:ml-0">
                {/* Step 1 */}
                <div className="relative flex items-start gap-6">
                  <div className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md md:h-12 md:w-12">
                    <span className="text-sm font-bold text-violet-400">1</span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
                      Atur Brand Kit
                    </h3>
                    <p className="text-muted-foreground pr-4 text-sm leading-relaxed">
                      Masukkan identitas visual dan profil perusahaan. Sistem
                      akan menyimpannya sebagai fondasi seluruh dokumen masa
                      depan.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-6">
                  <div className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md md:h-12 md:w-12">
                    <span className="text-sm font-bold text-violet-400">2</span>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
                      Gaya Dokumen (Style Cloning)
                    </h3>
                    <p className="text-muted-foreground pr-4 text-sm leading-relaxed">
                      Unggah dokumen PDF lama Anda. AI kami akan membedah dan
                      meniru tonasi serta gaya penulisan agar sesuai dengan DNA
                      perusahaan.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start gap-6">
                  <div className="bg-primary/20 border-primary/30 z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border shadow-[0_0_20px_rgba(124,58,237,0.3)] backdrop-blur-md md:h-12 md:w-12">
                    <Sparkles className="h-4 w-4 text-violet-300 md:h-5 md:w-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
                      Generate & Kolaborasi
                    </h3>
                    <p className="text-muted-foreground pr-4 text-sm leading-relaxed">
                      Ketik instruksi singkat, dan biarkan AI merakit dokumen
                      secara utuh. Kolaborasi dengan tim dan ekspor ke PDF
                      presisi tinggi.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive CTA Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-white/[0.02] px-4 py-16 lg:w-1/2 lg:border-t-0 lg:border-l"
            >
              {/* Subtle ambient glow in the right panel */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[80px] md:h-[500px] md:w-[500px] md:blur-[100px]"></div>

              <div className="glass-card relative z-10 flex w-full max-w-md flex-col items-center rounded-3xl p-6 text-center md:p-10">
                <div className="bg-primary/20 mb-6 rounded-2xl p-4 md:mb-8">
                  <LayoutTemplate className="h-8 w-8 text-violet-300 md:h-10 md:w-10" />
                </div>

                <h2 className="mb-3 text-xl font-bold text-white md:mb-4 md:text-2xl">
                  Mulai Transformasi Digital
                </h2>
                <p className="text-muted-foreground mb-8 px-2 text-xs leading-relaxed md:mb-10 md:text-sm">
                  Bergabunglah dengan ekosistem Sivilize Corp dan tinggalkan
                  cara kerja tradisional. Sistem kami siap melayani operasional
                  Anda.
                </p>

                <div className="flex w-full flex-col gap-3 md:gap-4">
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: 'lg',
                      className:
                        'group h-12 w-full rounded-xl text-sm font-semibold shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] md:h-14 md:text-base',
                    })}
                  >
                    Masuk ke Workspace (Web)
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5" />
                  </Link>

                  <Link
                    href="/register"
                    className={buttonVariants({
                      variant: 'outline',
                      size: 'lg',
                      className:
                        'h-12 w-full rounded-xl border-white/10 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 hover:text-white md:h-14 md:text-base',
                    })}
                  >
                    Buat Akun Perusahaan
                  </Link>
                </div>

                <div className="mt-8 w-full border-t border-white/10 pt-6">
                  <p className="mb-4 text-xs font-medium text-white">
                    Unduh Aplikasi Native (Capacitor)
                  </p>
                  <div className="flex w-full flex-col gap-3 sm:flex-row">
                    <button
                      className="flex h-10 flex-1 items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/80 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
                      onClick={() =>
                        alert('Mengunduh APK untuk Mobile (Smartphone)...')
                      }
                    >
                      📱 Download for Mobile
                    </button>
                    <button
                      className="flex h-10 flex-1 items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/80 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
                      onClick={() =>
                        alert('Mengunduh APK untuk Tablet/iPad...')
                      }
                    >
                      💻 Download for Tablet
                    </button>
                  </div>
                </div>

                <p className="text-muted-foreground/60 mt-6 px-4 text-[10px] md:text-[11px]">
                  Dengan mendaftar atau mengunduh, Anda menyetujui Syarat &
                  Ketentuan serta Kebijakan Privasi Sivilize Studio.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
