import { PrismaClient } from "@prisma/client";
import { updateCompanyProfile } from "./actions";
import { buttonVariants } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function CompanyHub() {
  const company = await prisma.company.findFirst({
    include: { profile: true }
  });

  if (!company) {
    return <div>Company not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Company Hub</h1>
        <p className="text-sm text-muted-foreground">Manage your company profile and information.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <form action={async (formData) => {
          "use server";
          await updateCompanyProfile(formData);
        }} className="space-y-4 p-6 border border-border/40 rounded-xl bg-card">
          <input type="hidden" name="companyId" value={company.id} />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <input 
              type="text" 
              name="name" 
              defaultValue={company.name} 
              disabled
              className="w-full p-2 text-sm bg-muted border border-border rounded-md opacity-50 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <input 
              type="text" 
              name="industry" 
              defaultValue={company.industry || ""} 
              placeholder="e.g. Technology, Construction"
              className="w-full p-2 text-sm bg-background border border-border rounded-md focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Vision</label>
            <textarea 
              name="vision" 
              defaultValue={company.profile?.vision || ""} 
              rows={3}
              placeholder="Your company vision..."
              className="w-full p-2 text-sm bg-background border border-border rounded-md focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mission</label>
            <textarea 
              name="mission" 
              defaultValue={company.profile?.mission || ""} 
              rows={4}
              placeholder="Your company mission..."
              className="w-full p-2 text-sm bg-background border border-border rounded-md focus:ring-1 focus:ring-primary"
            />
          </div>

          <button type="submit" className={buttonVariants({ className: "w-full" })}>
            Save Profile
          </button>
        </form>

        <div className="space-y-4 p-6 border border-border/40 rounded-xl bg-card">
          <h3 className="font-semibold">AI Context Status</h3>
          <p className="text-sm text-muted-foreground">
            The more details you provide in your Company Hub, the better Sivilize AI can generate accurate proposals and profiles tailored to your brand.
          </p>
          <div className="h-full w-full rounded-lg bg-muted flex items-center justify-center p-4">
            <div className="text-center">
              <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">VECTOR DB READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
