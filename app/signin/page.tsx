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
          className="relative bg-card/80 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-2xl"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground mb-2">
              {flow === "signIn" ? "Welcome Back" : "Join the Community"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {flow === "signIn"
                ? "Enter your credentials to access your account"
                : "Create an account to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {flow === "signUp" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                <div className="relative">
                  <Input
                    name="name"
                    placeholder="John Doe"
                    required
                    className="bg-background/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground rounded-xl h-11 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="pl-10 bg-background/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground rounded-xl h-11 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
              <div className="relative">
                <Fingerprint className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10 bg-background/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground rounded-xl h-11 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground h-11 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
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
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card backdrop-blur px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-secondary/50 border-border hover:bg-secondary text-muted-foreground h-11 rounded-xl transition-all"
              onClick={() => {
                void signIn("anonymous");
                router.push("/");
              }}
            >
              Sign in Anonymously
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              {flow === "signIn" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline decoration-primary/30 underline-offset-4"
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
