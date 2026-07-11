"use client";

import { motion } from "framer-motion";
import { Plus, FileText, Clock, MoreVertical, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const recentDocuments = [
  { id: 1, title: "Proposal Rebranding PT Maju Jaya", type: "Proposal", date: "2 jam yang lalu", status: "Draft" },
  { id: 2, title: "SPH - Pembuatan Aplikasi Kasir", type: "SPH", date: "Kemarin", status: "Review" },
  { id: 3, title: "Invoice #INV-2023-001", type: "Invoice", date: "2 hari yang lalu", status: "Approved" },
  { id: 4, title: "Company Profile 2024", type: "Profile", date: "Minggu lalu", status: "Completed" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Area */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Selamat Datang, Bos Besar!</h1>
          <p className="text-muted-foreground">Ini adalah ringkasan aktivitas dan dokumen perusahaan Anda.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dokumen/baru" className={buttonVariants({ variant: "default" })}>
            <Plus className="w-4 h-4 mr-2" />
            Dokumen Baru
          </Link>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-32">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Dokumen</span>
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-3xl font-bold text-white">124</span>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-32 border-purple-500/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Menunggu Review</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <span className="text-3xl font-bold text-white">3</span>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between h-32 border-green-500/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Disetujui Bulan Ini</span>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div>
            <span className="text-3xl font-bold text-white">18</span>
          </div>
        </div>
      </motion.div>

      {/* Recent Documents Table/List */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-white">Dokumen Terakhir</h2>
          <Link href="/dokumen" className="text-sm text-primary hover:underline flex items-center">
            Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-6 hover:bg-accent/30 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">{doc.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded bg-muted font-medium">{doc.type}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={
                  `text-xs px-2.5 py-1 rounded-full font-medium
                  ${doc.status === 'Approved' ? 'bg-green-500/10 text-green-400' : ''}
                  ${doc.status === 'Review' ? 'bg-purple-500/10 text-purple-400' : ''}
                  ${doc.status === 'Draft' ? 'bg-muted text-muted-foreground' : ''}
                  ${doc.status === 'Completed' ? 'bg-primary/10 text-primary' : ''}
                  `
                }>
                  {doc.status}
                </span>
                <button className="p-2 text-muted-foreground hover:text-white transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
