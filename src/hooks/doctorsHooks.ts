import { useState, useEffect } from "react";

export interface UnapprovedDoctor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  dr_number: string;
  location?: string;
  phone?: string;
  created_at: string;
}

export function useUnapprovedDoctors() {
  const [doctors, setDoctors] = useState<UnapprovedDoctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUnapprovedDoctors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/doctors/unapproved");
      
      if (!response.ok) {
        throw new Error("Failed to fetch unapproved doctors");
      }
      
      const data = await response.json();
      setDoctors(data.doctors || []);
    } catch (err: any) {
      console.error("Error fetching unapproved doctors:", err);
      setError(err?.message || "Failed to fetch doctors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUnapprovedDoctors();
  }, []);

  return { 
    doctors, 
    isLoading, 
    error, 
    refetch: fetchUnapprovedDoctors 
  };
}
