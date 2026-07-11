export default function DocumentsHub() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
        <p className="text-sm text-muted-foreground">Manage your AI generated documents.</p>
      </div>
      <div className="p-8 border border-border/40 rounded-xl bg-card/50 flex flex-col items-center justify-center text-center">
        <h3 className="font-medium text-lg">No documents yet</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          Click "Create Document" to start building AI-powered proposals or company profiles.
        </p>
      </div>
    </div>
  );
}
