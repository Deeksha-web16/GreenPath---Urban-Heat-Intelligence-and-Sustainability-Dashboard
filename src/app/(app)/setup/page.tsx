
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { countries, states, cities } from "@/lib/locations";
import { useToast } from "@/hooks/use-toast";

const setupSchema = z.object({
  country: z.string().min(1, "Please select a country."),
  state: z.string().min(1, "Please select a state."),
  city: z.string().min(1, "Please select a city."),
  livingType: z.enum(["Flat", "House", "Ground"], {
    required_error: "Please select a living type.",
  }),
});

type SetupFormValues = z.infer<typeof setupSchema>;

export default function SetupPage() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const form = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      country: "India",
      state: "Karnataka",
      city: "",
      livingType: "House",
    },
  });

  const selectedCountry = form.watch("country");
  const selectedState = form.watch("state");

  const availableStates = selectedCountry ? states[selectedCountry] || [] : [];
  const availableCities = selectedState ? cities[selectedState] || [] : [];

  useEffect(() => {
    const currentCountry = form.getValues("country");
    if (selectedCountry !== currentCountry) {
      form.setValue("state", "");
      form.setValue("city", "");
    }
  }, [selectedCountry, form]);

  useEffect(() => {
    const currentState = form.getValues("state");
    if (selectedState !== currentState) {
      form.setValue("city", "");
    }
  }, [selectedState, form]);

  const onSubmit: SubmitHandler<SetupFormValues> = (data) => {
    if (!user) return;
    setLoading(true);

    // Simulate a short delay for better UX
    setTimeout(() => {
        try {
          const updatedUser = { ...user, ...data };
          localStorage.setItem("gp_current_user", JSON.stringify(updatedUser));
          
          const allUsers = JSON.parse(localStorage.getItem("gp_users") || "[]");
          const userIndex = allUsers.findIndex((u: any) => u.email === user.email);
          if (userIndex !== -1) {
            allUsers[userIndex] = updatedUser;
            localStorage.setItem("gp_users", JSON.stringify(allUsers));
          }
          
          setUser(updatedUser);
          toast({
            title: "Profile Updated",
            description: "Your setup is complete!",
          });

          startTransition(() => {
            router.push("/dashboard");
          });

        } catch (e) {
          console.error("Update user setup failed:", e);
          toast({
            variant: "destructive",
            title: "Update Failed",
            description: "Failed to save your settings. Please try again.",
          });
        } finally {
          setLoading(false);
        }
    }, 500);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Just one more step...</CardTitle>
          <CardDescription>
            Help us personalize your experience by providing a few more details.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedCountry}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedState}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="livingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Living Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your living type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Flat">Flat / Apartment</SelectItem>
                        <SelectItem value="House">Independent House</SelectItem>
                        <SelectItem value="Ground">Ground / Farm Land</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading || isPending}>
                {(loading || isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading || isPending ? "Saving..." : "Save and Continue"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
