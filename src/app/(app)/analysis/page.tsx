
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { cityZones, type Zone } from "@/lib/city-zones";

const getRiskDetails = (risk: "High" | "Medium" | "Low") => {
  switch (risk) {
    case "High":
      return {
        color: "from-red-500/30 to-red-800/30 border-red-500/50",
        icon: "🔥",
        textColor: "text-red-400",
      };
    case "Medium":
      return {
        color: "from-yellow-500/30 to-yellow-700/30 border-yellow-500/50",
        icon: "☀️",
        textColor: "text-yellow-400",
      };
    case "Low":
    default:
      return {
        color: "from-green-500/30 to-green-700/30 border-green-500/50",
        icon: "❄️",
        textColor: "text-green-400",
      };
  }
};

export default function AnalysisPage() {
  const { user } = useAuth();
  const selectedCity = user?.city || "Bengaluru";
  const riskZones: Zone[] =
    cityZones[selectedCity as keyof typeof cityZones] ||
    cityZones["Bengaluru"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">
          Urban Heat Zone Analysis
        </h1>
        <p className="text-muted-foreground">
          Identifying heat risk levels across different zones in{" "}
          {selectedCity}.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {riskZones.map((zone) => {
          const { color, icon, textColor } = getRiskDetails(zone.heatRisk);
          return (
            <div
              key={zone.name}
              className={`rounded-xl border bg-gradient-to-br p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${color}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{zone.name}</h3>
                <span className="text-3xl">{icon}</span>
              </div>
              <div className={`mt-2 text-lg font-semibold ${textColor}`}>
                {zone.heatRisk} Risk
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Temp</p>
                  <p className="text-2xl font-bold">{zone.avgTemperature}°C</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Green Cover</p>
                  <p className="text-2xl font-bold">{zone.greenCover}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Understanding the Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>
            <strong className="text-red-400">High-Risk Zones (🔥):</strong>{" "}
            Typically dense urban cores with minimal green space. These areas
            trap heat, leading to significantly higher temperatures and increased
            energy demands.
          </p>
          <p>
            <strong className="text-yellow-400">Medium-Risk Zones (☀️):</strong>{" "}
            Suburban areas with a mix of infrastructure and residential green
            spaces. These zones have a moderate heat island effect but show
            potential for improvement through targeted greening initiatives.
          </p>
          <p>
            <strong className="text-green-400">Low-Risk Zones (❄️):</strong> Areas
            with abundant vegetation, such as large parks and botanical gardens.
            These act as natural "cooling islands," demonstrating the vital role
            of green cover in mitigating urban heat.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
