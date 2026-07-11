import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { EditorWorkspace } from "@/features/editor/components/EditorWorkspace";

const prisma = new PrismaClient();

export default async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: documentId } = await params;
  
  const document = await prisma.document.findUnique({
    where: { id: documentId }
  });

  if (!document) {
    notFound();
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-muted/20">
      {/* Top Toolbar */}
      <header className="h-14 bg-background border-b border-border/40 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/documents" className="text-sm text-muted-foreground hover:text-primary">
            ← Back
          </Link>
          <div className="h-4 w-[1px] bg-border/40" />
          <h2 className="text-sm font-semibold">{document.title}</h2>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            document.status === "Approved" ? "bg-green-500/10 text-green-500" :
            document.status === "Review" ? "bg-amber-500/10 text-amber-500" :
            "bg-primary/10 text-primary"
          }`}>
            {document.status}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {document.status === "Draft" && (
            <form action={async () => {
              "use server";
              const { updateDocumentStatus } = await import("@/app/editor/actions");
              await updateDocumentStatus(document.id, "Review");
            }}>
              <button type="submit" className={buttonVariants({ variant: "outline", size: "sm" })}>
                Submit for Review
              </button>
            </form>
          )}

          {document.status === "Review" && (
            <form action={async () => {
              "use server";
              const { updateDocumentStatus } = await import("@/app/editor/actions");
              await updateDocumentStatus(document.id, "Approved");
            }}>
              <button type="submit" className={buttonVariants({ size: "sm", className: "bg-green-600 hover:bg-green-700 text-white" })}>
                Approve Document
              </button>
            </form>
          )}

          {document.status === "Approved" && (
            <button disabled className={buttonVariants({ variant: "secondary", size: "sm" })}>
              Locked
            </button>
          )}

          <button className={buttonVariants({ size: "sm" })}>Export PDF</button>
        </div>
      </header>

      {/* Editor Body */}
      <EditorWorkspace document={document} />
    </div>
  );
}
