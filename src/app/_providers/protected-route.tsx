import { redirect } from "next/navigation";
import { createClient } from "@/utlis/supabase/supabase-server";


export default async function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // const { status } = useSession();
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims();

  console.log("Protected route - user claims:", {data, error})

  if (error || !data?.claims) {
    console.error("Error fetching user claims:", error);
    return redirect("/login");
  }

  return (
    <div>
      {children}
    </div>
  );
}