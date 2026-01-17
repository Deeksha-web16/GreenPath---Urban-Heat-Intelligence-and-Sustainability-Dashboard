
"use client";

import { generateSustainabilityReport } from "@/ai/flows/generate-sustainability-report";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const mockResponses = [
    "Planting native, drought-resistant trees is one of the most effective ways to create shade and can reduce surface temperatures by up to 2-3°C in your immediate vicinity.",
    "For apartment dwellers, creating a green balcony with potted plants and climbers not only beautifies the space but also contributes to a micro-cooling effect.",
    "Advocating for 'cool roofs' with reflective paint in your community can significantly lower building temperatures and reduce the need for air conditioning, saving energy and money.",
    "Community gardens are a great way to increase green cover in dense urban areas. They also foster community engagement and provide access to fresh produce."
];

function AskAiSection() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showResponse, setShowResponse] = useState(false);

    const handleAsk = (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;
        
        setIsLoading(true);
        setShowResponse(false);

        // Simulate AI thinking time
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * mockResponses.length);
            setResponse(mockResponses[randomIndex]);
            setIsLoading(false);
            setShowResponse(true);
        }, 1200);
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ask GreenPath AI</CardTitle>
                <CardDescription>
                    Get instant answers to your sustainability questions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAsk} className="space-y-4">
                    <div className="grid w-full gap-2">
                        <Label htmlFor="ai-question">Your Question</Label>
                        <Textarea 
                            id="ai-question"
                            placeholder="Ask about heat risk, green solutions, or sustainability ideas..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading || !question.trim()}>
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Ask AI
                    </Button>
                </form>

                {showResponse && (
                     <div className="mt-6 rounded-md border bg-background/50 p-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                        <p className="font-semibold text-primary">GreenPath AI says:</p>
                        <p className="text-sm text-muted-foreground">{response}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}


export default function ReportPage() {
  const { user } = useAuth();
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    if (!user?.city || !user?.livingType) {
      setError("Please complete your profile setup first.");
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const result = await generateSustainabilityReport({
        location: user.city,
        livingType: user.livingType,
      });
      setReport(result.report);
    } catch (e) {
      setError("Failed to generate the report. Please try again later.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">
          AI Sustainability Report
        </h1>
        <p className="text-muted-foreground">
          Generate a personalized report with actionable climate advice.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Personalized Report</CardTitle>
          <CardDescription>
            Based on your location ({user?.city}) and living situation (
            {user?.livingType}), our AI will generate tailored recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button
            onClick={handleGenerateReport}
            disabled={loading || !user?.city || !user?.livingType}
            size="lg"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            Generate My Report
          </Button>
        </CardContent>
      </Card>
      
      <AskAiSection />

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/5" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
             <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      )}

      {report && (
        <Card className="prose dark:prose-invert max-w-none p-6">
            <div dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br />') }} />
        </Card>
      )}
    </div>
  );
}
