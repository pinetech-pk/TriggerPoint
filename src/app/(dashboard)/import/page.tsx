"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

type ImportStep = "upload" | "mapping" | "preview" | "complete";

const columnOptions = [
  { value: "", label: "-- Skip --" },
  { value: "title", label: "Trade Title" },
  { value: "security", label: "Security/Symbol" },
  { value: "direction", label: "Direction" },
  { value: "entry_date", label: "Entry Date" },
  { value: "exit_date", label: "Exit Date" },
  { value: "entry_price", label: "Entry Price" },
  { value: "exit_price", label: "Exit Price" },
  { value: "pnl", label: "P&L" },
  { value: "pnl_percent", label: "P&L %" },
  { value: "risk_percent", label: "Risk %" },
  { value: "risk_amount", label: "Risk Amount" },
  { value: "risk_reward_actual", label: "R:R" },
  { value: "session", label: "Session" },
  { value: "timeframe", label: "Timeframe" },
  { value: "strategy", label: "Strategy" },
  { value: "account", label: "Account" },
  { value: "setup_notes", label: "Setup Notes" },
  { value: "mistake", label: "Mistake" },
  { value: "lesson", label: "Lesson" },
  { value: "chart_url", label: "Chart URL" },
  { value: "is_winner", label: "Win/Loss" },
];

// Demo detected columns from Notion export
const detectedColumns = [
  { original: "Trade Title", suggested: "title" },
  { original: "Date", suggested: "entry_date" },
  { original: "Direction", suggested: "direction" },
  { original: "Security", suggested: "security" },
  { original: "Session", suggested: "session" },
  { original: "Model", suggested: "strategy" },
  { original: "PnL", suggested: "pnl" },
  { original: "PnL (%)", suggested: "pnl_percent" },
  { original: "Risk (%)", suggested: "risk_percent" },
  { original: "RRx", suggested: "risk_reward_actual" },
  { original: "Win", suggested: "is_winner" },
  { original: "Mistake - Lesson", suggested: "mistake" },
];

export default function ImportPage() {
  const [step, setStep] = useState<ImportStep>("upload");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Import Trades"
        description="Import trades from CSV files (Notion, Excel, etc.)"
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[
              { id: "upload", label: "Upload" },
              { id: "mapping", label: "Map Columns" },
              { id: "preview", label: "Preview" },
              { id: "complete", label: "Complete" },
            ].map((s, index) => (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s.id
                      ? "bg-primary text-primary-foreground"
                      : ["upload", "mapping", "preview", "complete"].indexOf(step) >
                        index
                      ? "bg-green text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {["upload", "mapping", "preview", "complete"].indexOf(step) > index ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-sm ${
                    step === s.id ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {index < 3 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Upload */}
          {step === "upload" && (
            <Card>
              <CardHeader>
                <CardTitle>Upload CSV File</CardTitle>
                <CardDescription>
                  Upload a CSV file exported from Notion, Excel, or any other source
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-1">
                    {file ? file.name : "Drop your CSV file here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {file && (
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <FileText className="h-8 w-8 text-blue" />
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button onClick={() => setStep("mapping")}>
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Column Mapping */}
          {step === "mapping" && (
            <Card>
              <CardHeader>
                <CardTitle>Map Columns</CardTitle>
                <CardDescription>
                  Match your CSV columns to the trading journal fields
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded-lg font-medium text-sm">
                  <div>CSV Column</div>
                  <div>Journal Field</div>
                </div>

                {detectedColumns.map((col) => (
                  <div
                    key={col.original}
                    className="grid grid-cols-2 gap-4 items-center"
                  >
                    <div className="text-sm">{col.original}</div>
                    <Select
                      options={columnOptions}
                      defaultValue={col.suggested}
                    />
                  </div>
                ))}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep("upload")}>
                    Back
                  </Button>
                  <Button onClick={() => setStep("preview")}>
                    Preview Import
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Preview */}
          {step === "preview" && (
            <Card>
              <CardHeader>
                <CardTitle>Preview Import</CardTitle>
                <CardDescription>
                  Review the data before importing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-bg border border-green-border rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green" />
                  <div>
                    <p className="font-medium text-green">100 trades ready to import</p>
                    <p className="text-sm text-muted-foreground">
                      0 errors, 0 warnings
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Security</th>
                        <th className="p-3 text-left">Direction</th>
                        <th className="p-3 text-right">P&L</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">SOL/USDT (1m)</td>
                        <td className="p-3">SOL/USDT</td>
                        <td className="p-3">LONG</td>
                        <td className="p-3 text-right text-green">+$0.25</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">BTC/USDT (5m)</td>
                        <td className="p-3">BTC/USDT</td>
                        <td className="p-3">SHORT</td>
                        <td className="p-3 text-right text-red">-$0.10</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">ETH/USDT (15m)</td>
                        <td className="p-3">ETH/USDT</td>
                        <td className="p-3">LONG</td>
                        <td className="p-3 text-right text-green">+$0.48</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-3 bg-muted text-center text-sm text-muted-foreground">
                    Showing 3 of 100 trades
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep("mapping")}>
                    Back
                  </Button>
                  <Button onClick={() => setStep("complete")}>
                    Import 100 Trades
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Complete */}
          {step === "complete" && (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Import Complete!</h2>
                <p className="text-muted-foreground mb-6">
                  Successfully imported 100 trades to your journal
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => setStep("upload")}>
                    Import More
                  </Button>
                  <Button onClick={() => window.location.href = "/trades"}>
                    View Trades
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
