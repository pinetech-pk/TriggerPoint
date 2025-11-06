import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PlannerPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Planner</h1>
        <Link href="/plan/new">
          <Button>+ New Plan</Button>
        </Link>
      </div>
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">📅</div>
        <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground mb-4">
          Calendar view and plan scheduling will be available here.
        </p>
        <Link href="/plan/new">
          <Button variant="outline">Create Your First Plan</Button>
        </Link>
      </Card>
    </div>
  );
}
