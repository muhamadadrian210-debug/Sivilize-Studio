import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { EditorWorkspace } from '@/features/editor/components/EditorWorkspace'
import { PrintButton } from '@/features/editor/components/PrintButton'
import { getTenantCompanyId } from '@/lib/auth/session'

const prisma = new PrismaClient()

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: documentId } = await params

  const companyId = await getTenantCompanyId()
  if (!companyId) {
    notFound()
  }

  const document = await prisma.document.findUnique({
    where: {
      id: documentId,
      companyId: companyId, // STRICT TENANT ISOLATION
    },
    include: {
      versions: {
        orderBy: { version: 'desc' },
        take: 1,
      },
    },
  })

  if (!document) {
    notFound()
  }

  return (
    <div className="bg-muted/20 flex h-screen w-screen flex-col">
      {/* Top Toolbar */}
      <header className="bg-background border-border/40 flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/documents"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            ← Back
          </Link>
          <div className="bg-border/40 h-4 w-[1px]" />
          <h2 className="text-sm font-semibold">{document.title}</h2>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              document.status === 'Approved'
                ? 'bg-green-500/10 text-green-500'
                : document.status === 'Review'
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'bg-primary/10 text-primary'
            }`}
          >
            {document.status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {document.status === 'Draft' && (
            <form
              action={async () => {
                'use server'
                const { updateDocumentStatus } =
                  await import('@/app/editor/actions')
                await updateDocumentStatus(document.id, 'Review')
              }}
            >
              <button
                type="submit"
                className={buttonVariants({ variant: 'outline', size: 'sm' })}
              >
                Submit for Review
              </button>
            </form>
          )}

          {document.status === 'Review' && (
            <form
              action={async () => {
                'use server'
                const { updateDocumentStatus } =
                  await import('@/app/editor/actions')
                await updateDocumentStatus(document.id, 'Approved')
              }}
            >
              <button
                type="submit"
                className={buttonVariants({
                  size: 'sm',
                  className: 'bg-green-600 text-white hover:bg-green-700',
                })}
              >
                Approve Document
              </button>
            </form>
          )}

          {document.status === 'Approved' && (
            <button
              disabled
              className={buttonVariants({ variant: 'secondary', size: 'sm' })}
            >
              Locked
            </button>
          )}

          <PrintButton />
        </div>
      </header>

      {/* Editor Body */}
      <EditorWorkspace document={document} />
    </div>
  )
}
