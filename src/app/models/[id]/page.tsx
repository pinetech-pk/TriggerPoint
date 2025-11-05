'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { tradingModels } from '@/data/trading-models';
import { notFound } from 'next/navigation';

export default function ModelPage({ params }: { params: { id: string } }) {
  const model = tradingModels.find(m => m.id === params.id);

  if (!model) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">{model.name}</h1>
          <Badge className="text-lg px-4 py-2">
            Default Confidence: {model.defaultConfidence}/10
          </Badge>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Explanation</h2>
        <p className="text-muted-foreground leading-relaxed">{model.explanation}</p>
      </Card>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Trading Rules</h2>
        <ol className="space-y-3">
          {model.rules.map((rule, index) => (
            <li key={index} className="flex gap-3">
              <span className="font-semibold text-primary">{index + 1}.</span>
              <span className="flex-1">{rule}</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Sample Chart</h2>
        <div className="bg-muted rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">TradingView Chart Reference</p>
          <a 
            href={model.sampleImageUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {model.sampleImageUrl}
          </a>
          <p className="text-xs text-muted-foreground mt-4">
            Click the link above to view the sample chart on TradingView
          </p>
        </div>
      </Card>
    </div>
  );
}
