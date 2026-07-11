import { setupCompanyWorkspace } from './actions'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

export default function SetupCompanyPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070b13] p-6">
      {/* Background Radial Glow */}
      <div className="bg-primary/10 pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            Set up your workspace
          </h1>
          <p className="text-slate-400">
            Input Once, Create Everything. Let&apos;s start with your company
            details.
          </p>
        </div>

        <Card className="border-slate-800/80 bg-slate-900/40 shadow-2xl backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-foreground text-xl font-bold">
              Company Profile
            </CardTitle>
            <CardDescription className="text-slate-400">
              This information will be used to generate your business documents
              automatically.
            </CardDescription>
          </CardHeader>
          <form
            action={async (formData) => {
              'use server'
              await setupCompanyWorkspace(formData)
            }}
          >
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    Company Name
                  </label>
                  <Input
                    name="name"
                    required
                    placeholder="Sivilize Corp Indonesia"
                    className="focus-visible:ring-primary/40 text-foreground border-slate-800 bg-slate-950/40 placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    Industry
                  </label>
                  <select
                    name="industry"
                    required
                    className="focus:ring-primary text-foreground focus-visible:ring-primary/40 w-full rounded-md border border-slate-800 bg-slate-950/40 p-2 text-sm focus:ring-1"
                  >
                    <option value="it" className="bg-slate-950">
                      IT & Software
                    </option>
                    <option value="construction" className="bg-slate-950">
                      Construction
                    </option>
                    <option value="consulting" className="bg-slate-950">
                      Consulting
                    </option>
                    <option value="healthcare" className="bg-slate-950">
                      Healthcare
                    </option>
                    <option value="education" className="bg-slate-950">
                      Education
                    </option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="contact@company.com"
                    className="focus-visible:ring-primary/40 text-foreground border-slate-800 bg-slate-950/40 placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+62 812 3456 7890"
                    className="focus-visible:ring-primary/40 text-foreground border-slate-800 bg-slate-950/40 placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    Company Address
                  </label>
                  <Input
                    name="address"
                    placeholder="Jl. Sudirman No. 1, Jakarta"
                    className="focus-visible:ring-primary/40 text-foreground border-slate-800 bg-slate-950/40 placeholder:text-slate-600"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-slate-800/80 p-6">
              <button
                type="submit"
                className={buttonVariants({
                  size: 'lg',
                  className:
                    'bg-primary hover:bg-primary/95 text-primary-foreground font-semibold',
                })}
              >
                Complete Setup
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
