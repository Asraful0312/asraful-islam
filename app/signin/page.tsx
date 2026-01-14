"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ArrowRight, Fingerprint, Mail } from "lucide-react";

export default function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    formData.set("flow", flow);

    try {
      setError("");
      await signIn("password", formData);

      toast.success(
        flow === "signIn" ? "Login successful" : "Account created successfully"
      );

      if (flow === "signUp" && name) {
        router.push(`/?name=${encodeURIComponent(name)}&newUser=true`);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setError("");
      setSubmitting(false);
    }
  };

  return (
    <AuroraBackground className="h-screen">
      <div className="relative z-10 w-full max-w-md mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
              {flow === "signIn" ? "Welcome Back" : "Join the Community"}
            </h2>
            <p className="text-slate-400 text-sm">
              {flow === "signIn"
                ? "Enter your credentials to access your account"
                : "Create an account to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {flow === "signUp" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <div className="relative">
                  <Input
                    name="name"
                    placeholder="John Doe"
                    required
                    className="bg-black/20 border-white/10 focus:border-purple-500/50 text-white placeholder:text-slate-500 rounded-xl h-11 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                <Input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="pl-10 bg-black/20 border-white/10 focus:border-purple-500/50 text-white placeholder:text-slate-500 rounded-xl h-11 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <div className="relative">
                <Fingerprint className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10 bg-black/20 border-white/10 focus:border-purple-500/50 text-white placeholder:text-slate-500 rounded-xl h-11 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white h-11 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/40"
            >
              {submitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {flow === "signIn" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>

            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-center text-red-400 text-sm bg-red-500/10 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#09090b]/80 backdrop-blur px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-slate-300 h-11 rounded-xl transition-all"
              onClick={() => {
                void signIn("anonymous");
                router.push("/");
              }}
            >
              Sign in Anonymously
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              {flow === "signIn" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline decoration-blue-400/30 underline-offset-4"
                onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
              >
                {flow === "signIn" ? "Sign up now" : "Sign in here"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
