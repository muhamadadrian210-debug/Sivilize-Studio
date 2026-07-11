import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { FileText, Plus, MoreVertical } from 'lucide-react'
import { prisma } from '@/lib/database/prisma'

export default async function DocumentsHub() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      versions: true,
    },
  })

  return (
    <div className="relative z-0 space-y-6">
      {/* Background Ornaments */}
      <div className="bg-primary/20 pointer-events-none absolute -top-20 -right-20 -z-10 h-96 w-96 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute top-40 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Dokumen
          </h1>
          <p className="text-muted-foreground text-sm">
            Kelola semua dokumen dan draf yang dihasilkan oleh sistem AI kami.
          </p>
        </div>
        <Link
          href="/dashboard/documents/baru"
          className={buttonVariants({
            variant: 'default',
            className: 'shadow-[0_0_20px_rgba(124,58,237,0.4)]',
          })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Buat Dokumen Baru
        </Link>
      </div>

      {documents.length === 0 ? (
        <div className="border-border/40 bg-card/50 flex flex-col items-center justify-center rounded-xl border p-8 text-center">
          <h3 className="text-lg font-medium text-white">Belum ada dokumen</h3>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            Anda belum memiliki dokumen apa pun. Silakan klik tombol &quot;Buat
            Dokumen Baru&quot; untuk mulai membuat dokumen dengan AI.
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="divide-border divide-y">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="hover:bg-accent/30 group flex items-center justify-between p-6 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                    <FileText className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-white">{doc.title}</h3>
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <span className="bg-muted rounded px-2 py-0.5 font-medium">
                        {doc.type}
                      </span>
                      <span>•</span>
                      <span>{doc.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400">
                    {doc.status}
                  </span>
                  <Link
                    href={`/editor/${doc.id}`}
                    className={buttonVariants({
                      variant: 'outline',
                      size: 'sm',
                      className: 'glass',
                    })}
                  >
                    Sunting Dokumen
                  </Link>
                  <button className="text-muted-foreground p-2 transition-colors hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
