"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { Send } from "lucide-react";
import { FormEvent, FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // In your form component - remove the updateUserName call
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

      // Pass the name as a query parameter if it's a signup
      if (flow === "signUp" && name) {
        router.push(`/?name=${encodeURIComponent(name)}&newUser=true`);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      // ... error handling
    } finally {
      setError("");
      setSubmitting(false);
    }
  };
  return (
    <div className="w-full max-w-lg mx-auto my-20">
      <motion.div variants={itemVariants}>
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] rounded-lg p-8 border border-gray-800"
        >
          <h3 className="text-2xl font-bold mb-6 gradient-text">
            {flow === "signUp" ? " Create an Account" : "Login to your Account"}
          </h3>
          <div className="space-y-4">
            {flow === "signUp" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="bg-[#232323] border-gray-700 focus:border-purple-500"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Your Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                className="bg-[#232323] border-gray-700 focus:border-purple-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                placeholder="*********"
                required
                type="password"
                className="bg-[#232323] border-gray-700 focus:border-purple-500"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-jordy_blue hover:bg-purple-700 text-indigo_dye"
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : flow === "signIn" ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </Button>

            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="text-center text-sm text-white">
              <span>
                {flow === "signIn"
                  ? "Don't have an account? "
                  : "Already have an account? "}
              </span>
              <button
                type="button"
                className="text-primary hover:text-primary-hover hover:underline font-medium cursor-pointer"
                onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
              >
                {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
              </button>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-center my-3">
          <hr className="my-4 grow border-gray-200" />
          <span className="mx-4 text-white">or</span>
          <hr className="my-4 grow border-gray-200" />
        </div>
        <Button
          className="w-full"
          onClick={() => {
            void signIn("anonymous");
            router.push("/");
          }}
        >
          Sign in anonymously
        </Button>
      </motion.div>
    </div>
  );
}
