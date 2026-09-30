import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/images/baa-logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { isAdmin, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) navigate("/admin", { replace: true });
    else setError("Email or password is incorrect. Check both and try again.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F7] flex-col gap-[3rem] px-[2rem] py-[6rem]">
      <Helmet>
        <title>BAA – Admin Login</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <img src={logo} alt="BAA" className="h-[5rem]" />

      <div className="w-full max-w-[46rem] rounded-[1.2rem] bg-white p-[3rem] shadow-01 md:p-[4rem]">
        <h1 className="text-[3rem] leading-[4rem] font-medium tracking-[-0.4px]">
          Admin sign in
        </h1>
        <p className="mt-[.8rem] text-[1.6rem] font-extralight">
          Manage job openings and review applications.
        </p>

        <form onSubmit={handleSubmit} className="mt-[3rem] flex flex-col gap-[2rem]">
          <div className="flex flex-col gap-[.8rem]">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              className="h-[4.4rem]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-[.8rem]">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-[4.4rem]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p role="alert" className="text-[1.4rem] text-red-600">
              {error}
            </p>
          )}

          <Button type="submit" className="h-[4.4rem]">
            Log in
          </Button>
        </form>
      </div>

      <NavLink to="/" className="text-[1.4rem] text-[#4F4F4F] hover:text-[#006BFF]">
        ← Back to website
      </NavLink>
    </main>
  );
};

export default Login;
