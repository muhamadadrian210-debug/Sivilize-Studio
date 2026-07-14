'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 text-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
          <svg
            className="h-10 w-10 text-red-600 dark:text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Terjadi Kesalahan Sistem
        </h2>
        <p className="text-muted-foreground">
          Maaf, terjadi gangguan pada server kami saat memproses permintaan
          Anda. Tim kami telah diberitahu.
        </p>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => reset()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            Coba Lagi
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md border px-8 text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  )
}
