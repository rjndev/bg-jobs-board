import { signIn } from "next-auth/react";
import { useState } from "react";

export function useAuth(email : string, password : string) {
  const [error, setError] = useState(false);
  const [fetching, setFetching] = useState(false)

  const handleLogin = async () => {
    setFetching(true)
    setError(false)
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard"
    });

    if (res?.error) {
      console.error("Login failed:", res.error);
      setError(true)
      setFetching(false)
    }
    else setError(true)

  };

  return { handleLogin, error, fetching }
} 