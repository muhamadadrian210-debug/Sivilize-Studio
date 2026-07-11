import { setupCompanyWorkspace } from "./actions";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export default function SetupCompanyPage() {
  return (
    <div className="min-h-screen bg-[#070b13] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-2xl space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Set up your workspace</h1>
          <p className="text-slate-400">Input Once, Create Everything. Let's start with your company details.</p>
        </div>

        <Card className="bg-slate-900/40 border-slate-800/80 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Company Profile</CardTitle>
            <CardDescription className="text-slate-400">This information will be used to generate your business documents automatically.</CardDescription>
          </CardHeader>
          <form action={async (formData) => {
            "use server";
            await setupCompanyWorkspace(formData);
          }}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Company Name</label>
                  <Input name="name" required placeholder="Sivilize Corp Indonesia" className="bg-slate-950/40 border-slate-800 focus-visible:ring-primary/40 text-foreground placeholder:text-slate-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Industry</label>
                  <select name="industry" required className="w-full p-2 text-sm bg-slate-950/40 border border-slate-800 rounded-md focus:ring-1 focus:ring-primary text-foreground focus-visible:ring-primary/40">
                    <option value="it" className="bg-slate-950">IT & Software</option>
                    <option value="construction" className="bg-slate-950">Construction</option>
                    <option value="consulting" className="bg-slate-950">Consulting</option>
                    <option value="healthcare" className="bg-slate-950">Healthcare</option>
                    <option value="education" className="bg-slate-950">Education</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
                  <Input name="email" type="email" placeholder="contact@company.com" className="bg-slate-950/40 border-slate-800 focus-visible:ring-primary/40 text-foreground placeholder:text-slate-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Phone Number</label>
                  <Input name="phone" type="tel" placeholder="+62 812 3456 7890" className="bg-slate-950/40 border-slate-800 focus-visible:ring-primary/40 text-foreground placeholder:text-slate-600" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Company Address</label>
                  <Input name="address" placeholder="Jl. Sudirman No. 1, Jakarta" className="bg-slate-950/40 border-slate-800 focus-visible:ring-primary/40 text-foreground placeholder:text-slate-600" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-slate-800/80 p-6">
              <button type="submit" className={buttonVariants({ size: "lg", className: "bg-primary hover:bg-primary/95 text-primary-foreground font-semibold" })}>
                Complete Setup
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
