import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";


export function useTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  useEffect(() => {
    if(!tab) router.replace("/dashboard?tab=home");
  }, [tab, router])


  return {tab, router};
}