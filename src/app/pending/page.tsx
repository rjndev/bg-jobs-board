"use client";

import { useAuth } from "@/hooks/authHooks";
import { useEffect, useState } from "react";
import { createClient } from "@/utlis/supabase/supabase-client";
import { useRouter } from "next/navigation";

export default function PendingApprovalPage() {
  const { handleSignout } = useAuth();
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: claims } = await supabase.auth.getUser();
      const email = claims?.user?.email;
      if (!email) return;
      const { data: doctor } = await supabase
        .from("doctors")
        .select("first_name, last_name, is_approved")
        .eq("email", email)
        .maybeSingle();

      if (doctor?.is_approved) {
        router.replace("/dashboard");
        return;
      }
      const fullName = [doctor?.first_name, doctor?.last_name].filter(Boolean).join(" ");
      setName(fullName || null);
    })();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-center">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M9 12h6" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Account Pending Approval</h1>
        {name && (
          <p className="mt-2 text-gray-700">Hi {name}, thanks for signing up.</p>
        )}
        <p className="mt-2 text-gray-600">
          Your doctor account has been created and is awaiting admin review. You'll be able to access the jobs board once approved.
        </p>
        <div className="mt-6">
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            onClick={handleSignout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
