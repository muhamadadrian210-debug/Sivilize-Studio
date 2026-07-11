import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#070b13] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <Card className="w-full max-w-md bg-slate-900/40 border-slate-800/80 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
            <span className="text-primary font-bold text-lg">S</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Welcome back</CardTitle>
          <CardDescription className="text-slate-400">Enter your credentials to access your workspace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
            <Input type="email" placeholder="name@company.com" className="bg-slate-950/40 border-slate-800 focus-visible:ring-primary/40 text-foreground placeholder:text-slate-600" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
              <Link href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</Link>
            </div>
            <Input type="password" placeholder="••••••••" className="bg-slate-950/40 border-slate-800 focus-visible:ring-primary/40 text-foreground placeholder:text-slate-600" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <Link href="/dashboard" className={buttonVariants({ className: "w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold" })}>
            Sign In
          </Link>
          <div className="text-xs text-center text-slate-400">
            Don't have an account? <Link href="/register" className="text-primary hover:underline font-medium">Sign up</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
