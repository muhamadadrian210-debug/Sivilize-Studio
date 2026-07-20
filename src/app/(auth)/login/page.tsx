import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b13] p-6">
      {/* Background Radial Glow */}
      <div className="bg-primary/10 pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

      <Card className="relative z-10 w-full max-w-md border-slate-800/80 bg-slate-900/40 shadow-2xl backdrop-blur-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="bg-primary/10 border-primary/20 mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl border">
            <span className="text-primary text-lg font-bold">S</span>
          </div>
          <CardTitle className="text-foreground text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-slate-400">
            Enter your credentials to access your workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="name@company.com"
              className="focus-visible:ring-primary/40 text-foreground border-slate-800 bg-slate-950/40 placeholder:text-slate-600"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                Password
              </label>
              <Link
                href="#"
                className="text-primary text-xs font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              className="focus-visible:ring-primary/40 text-foreground border-slate-800 bg-slate-950/40 placeholder:text-slate-600"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <Link
            href="/api/dev/bypass-login"
            className={buttonVariants({
              className:
                'bg-primary hover:bg-primary/95 text-primary-foreground w-full font-semibold',
            })}
          >
            Sign In
          </Link>
          <div className="text-center text-xs text-slate-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
