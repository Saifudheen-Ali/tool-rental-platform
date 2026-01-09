"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../lib/useUser";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const redirectByRole = async () => {
      if (!loading && !user) {
        router.push("/login");
        return;
      }

      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error(error);
          return;
        }

        if (data.role === "owner") router.push("/owner/dashboard");
        else if (data.role === "shop") router.push("/shop/dashboard");
        else router.push("/search");
      }
    };

    redirectByRole();
  }, [user, loading, router]);

  return <p>Redirecting...</p>;
}
