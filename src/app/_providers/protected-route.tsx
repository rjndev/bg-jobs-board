import { redirect } from "next/navigation";
import { createClient } from "@/utlis/supabase/supabase-server";

type RouteProps = {
  checkAdmin?: boolean;
  requireApproval?: boolean;
};

export default async function ProtectedRoute({ children, checkAdmin, requireApproval }: { children: React.ReactNode; checkAdmin?: boolean; requireApproval?: boolean }) {
  // const { status } = useSession();
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims();

  console.log("Protected route - user claims:", {data, error})

  if (error || !data?.claims) {
    console.error("Error fetching user claims:", error);
    return redirect("/login");
  }

  // Fetch doctor record for role/approval checks
  const { data: doctor, error: doctorError } = await supabase
    .from("doctors")
    .select("is_admin, is_approved")
    .eq("email", data.claims.email)
    .maybeSingle();

  if (doctorError) {
    console.error("Doctor fetch failed:", doctorError);
    return redirect("/login");
  }

  if (checkAdmin) {
    if (!doctor?.is_admin) {
      console.error("Admin check failed:", doctorError);
      return redirect("/dashboard");
    }
  }

  // If approval is required and user is not admin, gate access
  const needsApproval = requireApproval ?? false;
  if (needsApproval && !doctor?.is_admin) {
    if (!doctor?.is_approved) {
      return redirect("/pending");
    }
  }

  return (
    <div>
      {children}
    </div>
  );
}