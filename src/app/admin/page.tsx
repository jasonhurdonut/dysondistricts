import { isAdminRequest } from "@/lib/admin-auth";
import { demoMode, getEvents, getHouses, getStudents } from "@/lib/data";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminRequest();

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-5 pt-20">
        <p className="smallcaps text-xs text-ink-soft text-center rise rise-1">
          DUC organizers only
        </p>
        <h1 className="font-display font-semibold tracking-tight text-5xl text-center mt-2 mb-8 rise rise-2">
          Admin
        </h1>
        <div className="rise rise-3">
          <AdminLogin />
        </div>
      </div>
    );
  }

  const [houses, events, students] = await Promise.all([
    getHouses(),
    getEvents(),
    getStudents(),
  ]);

  return (
    <AdminPanel
      houses={houses}
      events={events}
      students={students}
      demo={demoMode()}
    />
  );
}
