'use client'

import { buttonVariants } from '@/components/ui/button'

export function PrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button onClick={handlePrint} className={buttonVariants({ size: 'sm' })}>
      Export PDF
    </button>
  )
}
