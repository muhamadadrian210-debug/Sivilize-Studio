import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sivilize.com'), // Ganti dengan domain asli nantinya
  title: {
    default: 'Sivilize Studio | Business Document OS & AI Generator',
    template: '%s | Sivilize Studio',
  },
  description:
    'Sistem Operasi Dokumen Bisnis bertenaga AI. Buat Surat Penawaran Harga (SPH), Proposal, Invoice, dan Profil Perusahaan secara otomatis dalam hitungan detik. Tingkatkan efisiensi korporat dan agensi Anda dengan Sivilize Studio.',
  keywords: [
    'AI pembuat dokumen',
    'buat SPH otomatis',
    'aplikasi pembuat invoice',
    'business document OS',
    'software pembuat proposal',
    'otomatisasi dokumen bisnis',
    'aplikasi B2B SaaS Indonesia',
    'Sivilize Corp',
    'Sivilize Studio',
    'AI untuk agensi',
    'pembuat surat dinas AI',
    'generator kontrak bisnis',
  ],
  authors: [{ name: 'Sivilize Corp Indonesia', url: 'https://sivilize.com' }],
  creator: 'Sivilize Corp Indonesia',
  publisher: 'Sivilize Corp Indonesia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Sivilize Studio | Business Document OS & AI Generator',
    description:
      'Sistem Operasi Dokumen Bisnis bertenaga AI. Buat dokumen bisnis kelas enterprise secara otomatis dalam hitungan detik.',
    url: 'https://sivilize.com',
    siteName: 'Sivilize Studio',
    images: [
      {
        url: '/logo.jpg', // Akan diganti dengan image OG (1200x630) yang lebih proper nanti
        width: 800,
        height: 600,
        alt: 'Sivilize Studio - AI Document OS',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sivilize Studio | Business Document OS & AI Generator',
    description:
      'Buat Surat Penawaran Harga (SPH), Proposal, dan Kontrak korporat secara otomatis dengan AI. Solusi efisiensi agensi Anda.',
    images: ['/logo.jpg'],
    creator: '@SivilizeCorp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full overflow-hidden">
        {children}
      </body>
    </html>
  )
}
