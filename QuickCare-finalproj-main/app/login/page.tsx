"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "../contexts/AuthContext";
import { HeartPulse, Stethoscope, UserCircle } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, user } = useAuth();
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const ecgLineRef = useRef<SVGPathElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const roleFieldRef = useRef<HTMLDivElement>(null);

  // Check authentication status
  useEffect(() => {
    // If user is already authenticated, redirect to home
    if (user) {
      router.push("/");
      router.refresh(); // Refresh router cache without full page reload
    }
  }, [user, router]);

  // Initialize animations
  useEffect(() => {
    gsap.from(".auth-card", { duration: 1, scale: 0.8, opacity: 0, ease: "power3.out" });
    gsap.from(".decorative-element", { duration: 1.5, scale: 0, rotation: 180, stagger: 0.2, ease: "elastic.out(1, 0.5)" });
    gsap.to(".floating-element", { y: 15, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" });
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        // Update auth context first
        await login(data.user);
        
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Navigate to home page
        router.push("/");
        router.refresh(); // Refresh router cache without full page reload
      } else {
        setErrorMessage(data.message || "An error occurred during authentication");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setErrorMessage("Network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already logged in, show loading or redirect
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-pattern" style={{ backgroundImage: `radial-gradient(circle at 10% 10%, #3B82F622 20%, transparent 20%)`, backgroundSize: "40px 40px" }} />

      {/* Floating Medical Icons */}
      <HeartPulse className="absolute top-1/4 left-20 text-blue-200/30 floating-element h-16 w-16 decorative-element" />
      <Stethoscope className="absolute top-1/3 right-32 text-blue-200/30 floating-element h-16 w-16 decorative-element" />

      {/* Main Card */}
      <div ref={containerRef} className="auth-card bg-white p-8 rounded-xl shadow-2xl w-96 relative z-10 border border-blue-50">
        <div ref={formRef} className="login-content">
          <div className="text-center mb-8">
            <div className="inline-block">
              <HeartPulse className="h-16 w-16 text-blue-600 mx-auto mb-4 decorative-element" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{isLogin ? "Welcome Back!" : "Join QuickCare"}</h2>
            <p className="text-gray-600">{isLogin ? "Secure access to your health portal" : "Start your health journey today"}</p>
          </div>

          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {errorMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="login-content">
              <Label htmlFor="username" className="flex items-center gap-2 text-gray-700">
                <UserCircle className="h-4 w-4" />
                Username
              </Label>
              <Input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="mt-1 focus-visible:ring-blue-500" 
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>

            <div className="login-content">
              <Label htmlFor="password" className="flex items-center gap-2 text-gray-700">
                Password
              </Label>
              <Input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="mt-1 focus-visible:ring-blue-500" 
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            {!isLogin && (
              <div ref={roleFieldRef} className="login-content overflow-hidden">
                <Label className="block mb-2 text-gray-700">Register as:</Label>
                <RadioGroup 
                  value={role} 
                  onValueChange={setRole} 
                  className="grid gap-2"
                  disabled={isLoading}
                >
                  {["user", "doctor"].map((r) => (
                    <div key={r} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors hover:scale-[1.02]">
                      <RadioGroupItem value={r} id={r} />
                      <Label htmlFor={r} className="flex-1">{r.charAt(0).toUpperCase() + r.slice(1)}</Label>
                      {r === "doctor" ? <Stethoscope className="h-4 w-4 text-blue-600" /> : <UserCircle className="h-4 w-4 text-blue-600" />}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 login-content" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>

          <p className="login-content text-center mt-6 text-gray-600">
            {isLogin ? "New here? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-blue-600 font-semibold hover:underline underline-offset-4"
              disabled={isLoading}
            >
              {isLogin ? "Create Account" : "Login Instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}