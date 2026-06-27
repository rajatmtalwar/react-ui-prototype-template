import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Active users", value: "2,481", delta: "+12.4% vs last month" },
  { label: "Revenue", value: "$48.2k", delta: "+3.1% vs last month" },
  { label: "Churn", value: "1.8%", delta: "-0.4% vs last month" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          A starting point for your prototype.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.delta}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
