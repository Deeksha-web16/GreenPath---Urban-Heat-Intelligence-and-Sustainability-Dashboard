
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;
type StoredFeedback = FeedbackFormValues & { id: string; date: string, userEmail: string };

export default function FeedbackPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<StoredFeedback[]>([]);

  useEffect(() => {
    // This effect runs on the client after hydration
    const stored = localStorage.getItem("gp_feedback");
    if (stored) {
      setSubmittedFeedback(JSON.parse(stored));
    }
  }, []);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });
  
  useEffect(() => {
    if (user) {
        form.setValue("name", user.displayName || "");
    }
  }, [user, form]);


  const onSubmit: SubmitHandler<FeedbackFormValues> = (data) => {
    if (!user) return;
    setLoading(true);

    try {
      const newFeedback: StoredFeedback = {
        id: `fb_${new Date().getTime()}`,
        date: new Date().toISOString(),
        userEmail: user.email,
        ...data,
      };

      const updatedFeedback = [...submittedFeedback, newFeedback];
      localStorage.setItem("gp_feedback", JSON.stringify(updatedFeedback));
      setSubmittedFeedback(updatedFeedback);

      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your thoughts.",
      });
      form.reset({name: user.displayName || "", message: ""});
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Could not save your feedback. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Submit Feedback</h1>
        <p className="text-muted-foreground">
          We&apos;d love to hear your thoughts on GreenPath.
        </p>
      </div>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardHeader>
              <CardTitle>Your Feedback</CardTitle>
              <CardDescription>
                Let us know what you think, or report an issue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your experience..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardContent>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Feedback
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>

      {submittedFeedback.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Submitted Feedback</CardTitle>
            <CardDescription>
              Here's what other users have said.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {submittedFeedback.map((fb) => (
              <div key={fb.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm text-muted-foreground">From: {fb.name} ({fb.userEmail}) on {new Date(fb.date).toLocaleDateString()}</p>
                <p className="mt-2">{fb.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
