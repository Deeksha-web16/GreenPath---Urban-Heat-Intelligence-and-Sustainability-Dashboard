
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
import { Loader2 } from "lucide-react";
import { countries, states, cities } from "@/lib/locations";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const locationSchema = z.object({
  country: z.string().min(1, "Please select a country."),
  state: z.string().min(1, "Please select a state."),
  city: z.string().min(1, "Please select a city."),
  livingType: z.enum(["Flat", "House", "Ground"], {
    required_error: "Please select a living type.",
  }),
});

type LocationFormValues = z.infer<typeof locationSchema>;

export default function LocationPage() {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      country: "India",
      state: "Karnataka",
      city: "",
      livingType: "House",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        country: user.country || "India",
        state: user.state || "Karnataka",
        city: user.city || "",
        livingType: user.livingType || "House",
      });
    }
  }, [user, form]);

  const selectedCountry = form.watch("country");
  const selectedState = form.watch("state");

  const availableStates = selectedCountry ? states[selectedCountry] || [] : [];
  const availableCities = selectedState ? cities[selectedState] || [] : [];

  useEffect(() => {
    const currentCountry = form.getValues("country");
    if (user?.country && currentCountry !== user.country) {
      form.setValue("state", "");
      form.setValue("city", "");
    }
  }, [selectedCountry, form, user]);

  useEffect(() => {
    const currentState = form.getValues("state");
    if (user?.state && currentState !== user.state) {
      form.setValue("city", "");
    }
  }, [selectedState, form, user]);

  const onSubmit: SubmitHandler<LocationFormValues> = (data) => {
    if (!user) return;
    setLoading(true);

    // Simulate a short delay for UX
    setTimeout(() => {
      try {
        const updatedUser = { ...user, ...data };
        localStorage.setItem("gp_current_user", JSON.stringify(updatedUser));

        const allUsers = JSON.parse(localStorage.getItem("gp_users") || "[]");
        const userIndex = allUsers.findIndex(
          (u: any) => u.email === user.email
        );
        if (userIndex !== -1) {
          allUsers[userIndex] = updatedUser;
          localStorage.setItem("gp_users", JSON.stringify(allUsers));
        }

        setUser(updatedUser);

        toast({
          title: "Location Updated",
          description: "Your location has been successfully updated.",
        });

        startTransition(() => {
          router.push("/dashboard");
        });
      } catch (e) {
        console.error("Update user setup failed:", e);
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: "Failed to update profile.",
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
    <div className="min-h-full bg-gradient-to-br from-[#F3FFF8] to-[#E8FAF1] p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="rounded-2xl shadow-location-card bg-card/80 backdrop-blur-md">
              <CardHeader className="text-center p-8">
                <CardTitle className="text-3xl font-bold">
                  Update Your Location
                </CardTitle>
                <CardDescription className="text-md">
                  Your location helps us personalize heat insights and
                  sustainability tips.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-8">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-2 focus:ring-green-400/40">
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
                          <SelectTrigger className="focus:ring-2 focus:ring-green-400/40">
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
                          <SelectTrigger className="focus:ring-2 focus:ring-green-400/40">
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus:ring-2 focus:ring-green-400/40">
                            <SelectValue placeholder="Select your living type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Flat">
                            Flat / Apartment
                          </SelectItem>
                          <SelectItem value="House">
                            Independent House
                          </SelectItem>
                          <SelectItem value="Ground">
                            Ground / Farm Land
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="p-8">
                <Button
                  type="submit"
                  disabled={loading || isPending}
                  className="w-full bg-[#2F7D4E] hover:shadow-button-glow hover:bg-[#2F7D4E]/90 transition-all duration-300"
                  size="lg"
                >
                  {(loading || isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {loading || isPending ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
