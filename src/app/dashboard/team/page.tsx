import { PrismaClient, Role } from "@prisma/client";
import { buttonVariants } from "@/components/ui/button";
import { inviteMember, removeMember } from "./actions";

const prisma = new PrismaClient();

export default async function TeamManagementPage() {
  // Hardcoded for now until session works
  const workspace = await prisma.workspace.findFirst({
    include: {
      members: {
        include: { user: true }
      }
    }
  });

  if (!workspace) return <div>No workspace found</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Team Settings</h1>
        <p className="text-sm text-muted-foreground">Manage who has access to your workspace and documents.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        {/* Member List */}
        <div className="space-y-4 p-6 border border-border/40 rounded-xl bg-card">
          <h3 className="font-semibold text-lg">Workspace Members</h3>
          <div className="divide-y divide-border/40">
            {workspace.members.map((member) => (
              <div key={member.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                    {member.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{member.user.name}</p>
                    <p className="text-xs text-muted-foreground">{member.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    {member.role}
                  </span>
                  {member.role !== "OWNER" && (
                    <form action={async () => {
                      "use server";
                      await removeMember(workspace.id, member.userId);
                    }}>
                      <button type="submit" className="text-xs text-destructive hover:underline">Remove</button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite Form */}
        <div className="space-y-4 p-6 border border-border/40 rounded-xl bg-card h-fit">
          <h3 className="font-semibold text-lg">Invite New Member</h3>
          <form action={async (formData) => {
            "use server";
            const email = formData.get("email") as string;
            const role = formData.get("role") as Role;
            await inviteMember(workspace.id, email, role);
          }} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold">Email Address</label>
              <input 
                type="email" 
                name="email" 
                required
                placeholder="colleague@company.com"
                className="w-full p-2 text-sm bg-background border border-border rounded-md focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold">Role</label>
              <select name="role" className="w-full p-2 text-sm bg-background border border-border rounded-md focus:ring-1 focus:ring-primary">
                <option value="ADMIN">Admin</option>
                <option value="EDITOR">Editor</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>
            <button type="submit" className={buttonVariants({ className: "w-full" })}>
              Send Invite
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
