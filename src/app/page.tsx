"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Layers, Palette, LayoutTemplate, Zap } from "lucide-react";

export default function GatekeeperPage() {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Reveal options after logo intro animation finishes (approx 2.5s)
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background flex flex-col items-center overflow-x-hidden selection:bg-primary/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showOptions ? 0.4 : 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[150px]"
        />
      </div>

      <AnimatePresence mode="wait">
        {!showOptions ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center justify-center z-10 min-h-screen w-full"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-[0_0_50px_rgba(124,58,237,0.5)]">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Sivilize Studio
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
              className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
            />
          </motion.div>
        ) : (
          <div key="content" className="w-full flex flex-col items-center z-10">
            {/* Gatekeeper Section */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center justify-center min-h-screen max-w-2xl text-center px-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                Siap revolusi cara kerja agensi lu?
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto">
                Sistem operasi dokumen bisnis bertenaga AI. Otomatisasi SPH, proposal, dan invoice dalam hitungan detik.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center">
                <Link 
                  href="/register" 
                  className={buttonVariants({ 
                    size: "lg", 
                    className: "w-full sm:w-auto rounded-full px-12 h-14 text-base font-semibold shadow-[0_0_40px_-10px_rgba(124,58,237,0.8)]" 
                  })}
                >
                  Mulai Daftar
                </Link>
                <Link 
                  href="/dashboard" 
                  className={buttonVariants({ 
                    variant: "outline", 
                    size: "lg", 
                    className: "w-full sm:w-auto rounded-full px-12 h-14 text-base font-semibold glass border-white/20 hover:bg-white/10 text-white" 
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
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="w-full max-w-5xl px-6 py-32 flex flex-col items-center border-t border-white/10 mt-12"
            >
              <h3 className="text-3xl font-bold text-white mb-4">Cara Kerja Sivilize Studio</h3>
              <p className="text-muted-foreground mb-16 text-center max-w-xl">
                Nggak perlu lagi pusing mikirin format atau desain dokumen. Semuanya serba otomatis.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative">
                {/* Connecting Line (Desktop only) */}
                <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent -z-10" />

                {/* Step 1 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                    <Palette className="w-8 h-8 text-white/80" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">1. Atur Brand Kit</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Masukkan logo, warna, font, dan profil perusahaan lu sekali aja. Sistem bakal nginget selamanya.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                    <LayoutTemplate className="w-8 h-8 text-white/80" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">2. Pilih Template</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Mau bikin SPH, Proposal, atau Invoice? Pilih template profesional yang udah disediain.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">3. AI Generate & Export</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ketik perintah singkat, AI bakal racik isi dokumennya. Langsung export ke PDF/Word siap kirim.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
