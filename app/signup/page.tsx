"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("renter");
  const router = useRouter();

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (user) {
  const { error: profileError } = await supabase.from("users").insert([
    {
      id: user.id,
      email: email,
      role: role,
    },
  ]);

  if (profileError) {
    console.error("Profile insert error:", profileError);
    alert(profileError.message);
    return;
  }

  router.push("/login");
}

  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Signup</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="renter">Renter</option>
        <option value="owner">Owner</option>
        <option value="shop">Shop</option>
      </select>
      <br /><br />

      <button onClick={handleSignup}>Create Account</button>
    </main>
  );
}

