import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 text-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center space-y-4">
        <h1 className="text-muted-foreground/20 text-9xl font-black">404</h1>
        <h2 className="text-2xl font-bold tracking-tight">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-muted-foreground">
          Maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau
          Anda salah mengetikkan URL.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
