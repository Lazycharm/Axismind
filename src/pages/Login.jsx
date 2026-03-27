import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Loader2, LogIn } from "lucide-react";
import { backend } from "@/api/backendClient";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/Admin";

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const user = await backend.auth.me();
        if (user?.role === "admin") {
          navigate(redirectTo, { replace: true });
          return;
        }
      } catch {
        // no active session
      } finally {
        setCheckingSession(false);
      }
    };
    checkExistingSession();
  }, [navigate, redirectTo]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await backend.auth.signInWithPassword({ email, password });
      const user = await backend.auth.me();
      if (user?.role !== "admin") {
        setError("This account is signed in but does not have admin access.");
        setLoading(false);
        return;
      }
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center space-y-3">
          <Badge className="mx-auto bg-blue-500/20 text-blue-300 border-blue-500/40">
            <Shield className="w-3.5 h-3.5 mr-1.5" />
            Admin Access
          </Badge>
          <CardTitle className="text-2xl text-white">Login to AxisMind Admin</CardTitle>
          <p className="text-sm text-gray-400">Sign in with your admin account to continue.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="text-sm text-gray-300 block mb-2">Email</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 block mb-2">Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {error ? (
              <div className="text-sm text-red-300 bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
                {error}
              </div>
            ) : null}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/", { replace: true })}
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Back to Website
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
