import { Card } from "@/components/ui/card";

export default function PlannerPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Planner</h1>
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">📅</div>
        <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          Calendar view and plan scheduling will be available here.
        </p>
      </Card>
    </div>
  );
}
