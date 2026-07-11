export default function BrandAssetsHub() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Brand Assets</h1>
        <p className="text-sm text-muted-foreground">Manage your company logos, fonts, and colors.</p>
      </div>
      <div className="p-8 border border-border/40 rounded-xl bg-card/50 flex flex-col items-center justify-center text-center">
        <h3 className="font-medium text-lg">Brand Kit</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          Upload your company logos, stamps, and signatures. Set primary and secondary colors here.
        </p>
      </div>
    </div>
  );
}
