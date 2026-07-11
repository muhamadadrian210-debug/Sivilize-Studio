'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Palette, LayoutTemplate, Zap } from 'lucide-react'
import Image from 'next/image'

export default function GatekeeperPage() {
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    // Reveal options after logo intro animation finishes (approx 2.5s)
    const timer = setTimeout(() => {
      setShowOptions(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-background selection:bg-primary/30 relative flex min-h-screen w-full flex-col items-center overflow-x-hidden">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showOptions ? 0.4 : 0.1 }}
          transition={{ duration: 1.5 }}
          className="bg-primary/30 absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        />
      </div>

      <AnimatePresence mode="wait">
        {!showOptions ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="z-10 flex min-h-screen w-full flex-col items-center justify-center"
          >
            <Image
              src="/logo.jpg"
              alt="Sivilize Studio Logo"
              width={96}
              height={96}
              className="mb-4 h-24 w-24 rounded-2xl object-cover shadow-[0_0_50px_rgba(124,58,237,0.5)]"
            />
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Sivilize Studio
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
              className="via-primary mt-4 h-px bg-gradient-to-r from-transparent to-transparent"
            />
          </motion.div>
        ) : (
          <div key="content" className="z-10 flex w-full flex-col items-center">
            {/* Gatekeeper Section */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center"
            >
              <h2 className="mb-6 text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl">
                Siap revolusi cara kerja agensi lu?
              </h2>
              <p className="text-muted-foreground mx-auto mb-12 max-w-lg text-lg">
                Sistem operasi dokumen bisnis bertenaga AI. Otomatisasi SPH,
                proposal, dan invoice dalam hitungan detik.
              </p>

              <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row">
                <Link
                  href="/register"
                  className={buttonVariants({
                    size: 'lg',
                    className:
                      'h-14 w-full rounded-full px-12 text-base font-semibold shadow-[0_0_40px_-10px_rgba(124,58,237,0.8)] sm:w-auto',
                  })}
                >
                  Mulai Daftar
                </Link>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'lg',
                    className:
                      'glass h-14 w-full rounded-full border-white/20 px-12 text-base font-semibold text-white hover:bg-white/10 sm:w-auto',
                  })}
                >
                  Coba Demo
                </Link>
              </div>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1 }}
              className="mt-12 flex w-full max-w-5xl flex-col items-center border-t border-white/10 px-6 py-32"
            >
              <h3 className="mb-4 text-3xl font-bold text-white">
                Cara Kerja Sivilize Studio
              </h3>
              <p className="text-muted-foreground mb-16 max-w-xl text-center">
                Nggak perlu lagi pusing mikirin format atau desain dokumen.
                Semuanya serba otomatis.
              </p>

              <div className="relative grid w-full grid-cols-1 gap-8 md:grid-cols-3">
                {/* Connecting Line (Desktop only) */}
                <div className="via-primary/50 absolute top-12 right-1/6 left-1/6 -z-10 hidden h-px bg-gradient-to-r from-transparent to-transparent md:block" />

                {/* Step 1 */}
                <div className="group flex flex-col items-center text-center">
                  <div className="glass-card group-hover:border-primary/50 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110">
                    <Palette className="h-8 w-8 text-white/80" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-white">
                    1. Atur Brand Kit
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Masukkan logo, warna, font, dan profil perusahaan lu sekali
                    aja. Sistem bakal nginget selamanya.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="group flex flex-col items-center text-center">
                  <div className="glass-card group-hover:border-primary/50 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110">
                    <LayoutTemplate className="h-8 w-8 text-white/80" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-white">
                    2. Pilih Template
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Mau bikin SPH, Proposal, atau Invoice? Pilih template
                    profesional yang udah disediain.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="group flex flex-col items-center text-center">
                  <div className="glass-card group-hover:border-primary/50 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110">
                    <Zap className="text-primary h-8 w-8" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-white">
                    3. AI Generate & Export
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Ketik perintah singkat, AI bakal racik isi dokumennya.
                    Langsung export ke PDF/Word siap kirim.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
