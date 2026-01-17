
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertTriangle,
  ArrowUp,
  CheckCircle,
  Sprout,
  Thermometer,
} from "lucide-react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Skeleton } from "@/components/ui/skeleton";

/* ------------------------------------------------------------------ */
/* MOCK DATA */
/* ------------------------------------------------------------------ */

const cityMockData: Record<
  string,
  { avgTemp: number; greenCover: number; chartData: any[] }
> = {
  Bengaluru: {
    avgTemp: 28.2,
    greenCover: 38,
    chartData: [
      { month: "Jan", temp: 22 },
      { month: "Feb", temp: 24 },
      { month: "Mar", temp: 27 },
      { month: "Apr", temp: 29 },
      { month: "May", temp: 28 },
      { month: "Jun", temp: 26 },
      { month: "Jul", temp: 25 },
      { month: "Aug", temp: 25 },
      { month: "Sep", temp: 25 },
      { month: "Oct", temp: 24 },
      { month: "Nov", temp: 23 },
      { month: "Dec", temp: 22 },
    ],
  },

  Mumbai: {
    avgTemp: 30.5,
    greenCover: 18,
    chartData: [
      { month: "Jan", temp: 25 },
      { month: "Feb", temp: 26 },
      { month: "Mar", temp: 28 },
      { month: "Apr", temp: 30 },
      { month: "May", temp: 32 },
      { month: "Jun", temp: 31 },
      { month: "Jul", temp: 30 },
      { month: "Aug", temp: 29 },
      { month: "Sep", temp: 29 },
      { month: "Oct", temp: 29 },
      { month: "Nov", temp: 28 },
      { month: "Dec", temp: 26 },
    ],
  },

  Default: {
    avgTemp: 29,
    greenCover: 25,
    chartData: [
      { month: "Jan", temp: 20 },
      { month: "Feb", temp: 22 },
      { month: "Mar", temp: 25 },
      { month: "Apr", temp: 29 },
      { month: "May", temp: 32 },
      { month: "Jun", temp: 34 },
      { month: "Jul", temp: 33 },
      { month: "Aug", temp: 32 },
      { month: "Sep", temp: 30 },
      { month: "Oct", temp: 28 },
      { month: "Nov", temp: 24 },
      { month: "Dec", temp: 21 },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* CHART CONFIG */
/* ------------------------------------------------------------------ */

const chartConfig = {
  temp: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

/* ------------------------------------------------------------------ */
/* AI RECOMMENDATIONS (MOCKED, STABLE) */
/* ------------------------------------------------------------------ */

const recommendationsByRisk: Record<"High" | "Medium" | "Low", string[]> = {
  High: [
    "Increase tree plantation in dense residential areas to reduce heat absorption.",
    "Use reflective or 'cool-roof' materials to lower indoor temperatures and save energy.",
    "Avoid outdoor activities during peak afternoon hours (12 PM - 4 PM) to minimize heat exposure.",
    "Promote the development of shaded pedestrian walkways and green corridors to connect parks.",
    "Advocate for permeable pavements to reduce surface heat and allow rainwater to recharge groundwater.",
    "Install exterior window shades or awnings to block direct sunlight from entering buildings.",
    "Utilize public transportation to reduce vehicle emissions, a major contributor to urban heat.",
    "Support local policies that mandate green building standards for new constructions.",
  ],
  Medium: [
    "Start a balcony, terrace, or rooftop garden to improve local cooling and biodiversity.",
    "Use light-colored curtains or blinds to reflect sunlight and keep interiors cool.",
    "Encourage community greening initiatives like planting native shrubs in open spaces.",
    "Adopt water-efficient irrigation methods like drip systems for your gardens.",
    "Create a small water body like a pond or a fountain in your garden to create a cooling effect.",
    "Join or form a local group to clean up and maintain nearby parks and water bodies.",
    "Replace concrete driveways or paths with grass pavers or gravel to reduce heat retention.",
    "Choose outdoor furniture made from natural, heat-resistant materials like wood or bamboo.",
  ],
  Low: [
    "Focus on maintaining and expanding existing green cover by planting native species.",
    "Implement rainwater harvesting systems to collect and store water for plant irrigation.",
    "Protect and preserve local parks, urban forests, and water bodies from encroachment.",
    "Encourage eco-friendly building practices that blend with the natural landscape.",
    "Create a compost pit to recycle organic waste and enrich the soil for your garden.",
    "Install bird feeders and baths to support local wildlife and enhance biodiversity.",
    "Organize nature walks or tree identification programs to build community appreciation for green spaces.",
    "Minimize the use of chemical pesticides and fertilizers to protect the local ecosystem.",
  ],
};

/* ------------------------------------------------------------------ */
/* ANIMATION VARIANTS */
/* ------------------------------------------------------------------ */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};


/* ------------------------------------------------------------------ */
/* DASHBOARD PAGE */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  /* Redirect if setup not completed */
  useEffect(() => {
    if (!loading && (!user || !user.city)) {
      router.push("/setup");
    }
  }, [user, loading, router]);

  const dashboardData = useMemo(() => {
    if (!user?.city) return null;

    const data = cityMockData[user.city] || cityMockData.Default;

    let heatRisk: "High" | "Medium" | "Low";

    if (data.avgTemp > 30 && data.greenCover < 25) {
      heatRisk = "High";
    } else if (data.avgTemp > 26) {
      heatRisk = "Medium";
    } else {
      heatRisk = "Low";
    }

    return {
      ...data,
      heatRisk,
      recommendations: recommendationsByRisk[heatRisk],
    };
  }, [user?.city]);

  if (loading || !dashboardData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Skeleton className="h-64 w-3/4" />
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Urban Heat Dashboard – {user.city}
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {user.displayName || "Explorer"} 👋
        </p>
      </div>

      {/* METRICS */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        variants={{
          in: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div variants={cardVariants}>
            <Card>
            <CardHeader className="flex justify-between pb-2">
                <CardTitle className="text-sm">Average Temperature</CardTitle>
                <Thermometer className="h-4 w-4" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                {dashboardData.avgTemp}°C
                </div>
                <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUp className="mr-1 h-3 w-3 text-destructive" />
                Higher than historical baseline
                </p>
            </CardContent>
            </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
            <Card>
            <CardHeader className="flex justify-between pb-2">
                <CardTitle className="text-sm">Heat Risk</CardTitle>
                <AlertTriangle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                {dashboardData.heatRisk}
                </div>
                <p className="text-xs text-muted-foreground">
                Based on urban density & greenery
                </p>
            </CardContent>
            </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
            <Card>
            <CardHeader className="flex justify-between pb-2">
                <CardTitle className="text-sm">Green Coverage</CardTitle>
                <Sprout className="h-4 w-4" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                {dashboardData.greenCover}%
                </div>
                <p className="text-xs text-muted-foreground">
                {dashboardData.greenCover < 30
                    ? "Below recommended level"
                    : "Healthy green cover"}
                </p>
            </CardContent>
            </Card>
        </motion.div>
      </motion.div>

      {/* GRAPH */}
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Temperature Trend</CardTitle>
            <CardDescription>
              Average monthly temperature for {user.city}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[500px]">
              <BarChart data={dashboardData.chartData}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-2))"
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.7}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(v) => `${v}°C`} />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="temp" radius={4} fill="url(#tempGradient)" animationDuration={1000} animationBegin={300} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI RECOMMENDATIONS */}
      <motion.div initial="initial" animate="in" variants={cardVariants} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              AI Urban Cooling Recommendations 🌱🤖
            </CardTitle>
            <CardDescription>
              Actionable insights tailored for {user.city}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.ul 
                className="space-y-3"
                initial="hidden"
                animate="visible"
                variants={listVariants}
            >
              {dashboardData.recommendations.map((rec, i) => (
                <motion.li key={i} className="flex gap-2" variants={itemVariants}>
                  <CheckCircle className="h-4 w-4 text-primary mt-1" />
                  <span>{rec}</span>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
