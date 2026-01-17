
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/use-auth";
import type { AppUser } from "@/lib/definitions";
import { motion } from "framer-motion";
import { Logo } from "@/components/logo";

const signupSchema = z.object({
  displayName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormValues> = (values) => {
    setError(null);
    setLoading(true);

    // Demo mode: localStorage signup
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem("gp_users") || "[]");

        const emailExists = users.some(
          (user: any) => user.email === values.email
        );

        if (emailExists) {
          setError("This email address is already registered.");
          setLoading(false);
          return;
        }

        const newUser: AppUser = {
          uid: `user_${Date.now()}`,
          displayName: values.displayName,
          email: values.email,
          password: values.password,
        };

        const updatedUsers = [...users, newUser];

        localStorage.setItem("gp_users", JSON.stringify(updatedUsers));
        localStorage.setItem("gp_current_user", JSON.stringify(newUser));

        setUser(newUser);
        router.push("/location");
      } catch (e) {
        console.error(e);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.3 } }}
      className="group shadow-green-glow hover:shadow-green-glow-hover transition-all duration-300 ease-in-out rounded-xl"
    >
      <Card className="w-full max-w-md border-0 bg-transparent shadow-none transition-all duration-300">
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          <Logo withText={true} />
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Start your journey toward cooler, greener cities.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Sign-up Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        className="bg-white/70 focus:ring-primary/50 dark:bg-black/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        className="bg-white/70 focus:ring-primary/50 dark:bg-black/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/70 focus:ring-primary/50 dark:bg-black/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </motion.div>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline hover:text-primary">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
}
