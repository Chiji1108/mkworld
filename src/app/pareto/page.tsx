"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GROUPED_DRIVERS,
  GROUPED_MACHINES,
  type GroupedStats,
} from "@/lib/stats";
import { Info } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

interface Combination {
  driver: GroupedStats;
  machine: GroupedStats;
  combined: {
    speed: { smooth: number; rough: number; water: number };
    acceleration: number;
    weight: number;
    handling: number;
  };
  totalScore: number;
}

interface OptimizationCriteria {
  speedSmooth: boolean;
  speedRough: boolean;
  speedWater: boolean;
  acceleration: boolean;
  weight: boolean;
  handling: boolean;
}

export default function ParetoPage() {
  const [criteria, setCriteria] = useState<OptimizationCriteria>({
    speedSmooth: true,
    speedRough: false,
    speedWater: false,
    acceleration: true,
    weight: false,
    handling: false,
  });

  const allCombinations = useMemo(() => {
    const combinations: Combination[] = [];

    GROUPED_DRIVERS.forEach((driver) => {
      GROUPED_MACHINES.forEach((machine) => {
        const combined = {
          speed: {
            smooth: driver.speed.smooth + machine.speed.smooth,
            rough: driver.speed.rough + machine.speed.rough,
            water: driver.speed.water + machine.speed.water,
          },
          acceleration: driver.acceleration + machine.acceleration,
          weight: driver.weight + machine.weight,
          handling: driver.handling + machine.handling,
        };

        let totalScore = 0;
        if (criteria.speedSmooth) totalScore += combined.speed.smooth;
        if (criteria.speedRough) totalScore += combined.speed.rough;
        if (criteria.speedWater) totalScore += combined.speed.water;
        if (criteria.acceleration) totalScore += combined.acceleration;
        if (criteria.weight) totalScore += combined.weight;
        if (criteria.handling) totalScore += combined.handling;

        combinations.push({
          driver,
          machine,
          combined,
          totalScore,
        });
      });
    });

    return combinations;
  }, [criteria]);

  const paretoOptimalCombinations = useMemo(() => {
    const sorted = [...allCombinations].sort(
      (a, b) => b.totalScore - a.totalScore
    );
    return sorted.slice(0, 100);
  }, [allCombinations]);

  const handleCriteriaChange = (
    key: keyof OptimizationCriteria,
    checked: boolean
  ) => {
    setCriteria((prev) => ({ ...prev, [key]: checked }));
  };

  const criteriaCount = Object.values(criteria).filter(Boolean).length;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">パレート最適</h1>
        <p className="text-muted-foreground">
          指定した条件に基づいて最適な組み合わせを見つけます
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>最適化条件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="speedSmooth"
                  checked={criteria.speedSmooth}
                  onCheckedChange={(checked) =>
                    handleCriteriaChange("speedSmooth", !!checked)
                  }
                />
                <label
                  htmlFor="speedSmooth"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  スピード（滑）
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="speedRough"
                  checked={criteria.speedRough}
                  onCheckedChange={(checked) =>
                    handleCriteriaChange("speedRough", !!checked)
                  }
                />
                <label
                  htmlFor="speedRough"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  スピード（荒）
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="speedWater"
                  checked={criteria.speedWater}
                  onCheckedChange={(checked) =>
                    handleCriteriaChange("speedWater", !!checked)
                  }
                />
                <label
                  htmlFor="speedWater"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  スピード（水）
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceleration"
                  checked={criteria.acceleration}
                  onCheckedChange={(checked) =>
                    handleCriteriaChange("acceleration", !!checked)
                  }
                />
                <label
                  htmlFor="acceleration"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  かそく
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weight"
                  checked={criteria.weight}
                  onCheckedChange={(checked) =>
                    handleCriteriaChange("weight", !!checked)
                  }
                />
                <label
                  htmlFor="weight"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  おもさ
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="handling"
                  checked={criteria.handling}
                  onCheckedChange={(checked) =>
                    handleCriteriaChange("handling", !!checked)
                  }
                />
                <label
                  htmlFor="handling"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  まがりやすさ
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {criteriaCount === 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              最適化条件を1つ以上選択してください。
            </AlertDescription>
          </Alert>
        )}

        {paretoOptimalCombinations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>最適組み合わせ (上位100組)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>順位</TableHead>
                    <TableHead>ドライバー</TableHead>
                    <TableHead>マシン</TableHead>
                    <TableHead className="bg-primary/10">合計スコア</TableHead>
                    <TableHead
                      className={criteria.speedSmooth ? "bg-primary/10" : ""}
                    >
                      スピード（滑）
                    </TableHead>
                    <TableHead
                      className={criteria.speedRough ? "bg-primary/10" : ""}
                    >
                      スピード（荒）
                    </TableHead>
                    <TableHead
                      className={criteria.speedWater ? "bg-primary/10" : ""}
                    >
                      スピード（水）
                    </TableHead>
                    <TableHead
                      className={criteria.acceleration ? "bg-primary/10" : ""}
                    >
                      かそく
                    </TableHead>
                    <TableHead
                      className={criteria.weight ? "bg-primary/10" : ""}
                    >
                      おもさ
                    </TableHead>
                    <TableHead
                      className={criteria.handling ? "bg-primary/10" : ""}
                    >
                      まがりやすさ
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paretoOptimalCombinations.map((combo, index) => (
                    <TableRow
                      key={`${combo.driver.names.join(
                        "-"
                      )}-${combo.machine.names.join("-")}`}
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell
                        style={{ backgroundColor: combo.driver.color }}
                      >
                        <div className="space-y-2">
                          {combo.driver.names.map((name) => (
                            <div
                              key={name}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-8 h-8 relative">
                                <Image
                                  src={`/drivers/${name}.png`}
                                  alt={name}
                                  fill
                                  className="object-contain rounded"
                                />
                              </div>
                              <span className="text-sm">{name}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: combo.machine.color }}
                      >
                        <div className="space-y-2">
                          {combo.machine.names.map((name) => (
                            <div
                              key={name}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-8 h-8 relative">
                                <Image
                                  src={`/machines/${name}.png`}
                                  alt={name}
                                  fill
                                  className="object-contain rounded"
                                />
                              </div>
                              <span className="text-sm">{name}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="bg-primary/10 text-center font-bold">
                        {combo.totalScore}
                      </TableCell>
                      <TableCell
                        className={`text-center ${
                          criteria.speedSmooth ? "bg-primary/10" : ""
                        }`}
                      >
                        {combo.combined.speed.smooth}
                      </TableCell>
                      <TableCell
                        className={`text-center ${
                          criteria.speedRough ? "bg-primary/10" : ""
                        }`}
                      >
                        {combo.combined.speed.rough}
                      </TableCell>
                      <TableCell
                        className={`text-center ${
                          criteria.speedWater ? "bg-primary/10" : ""
                        }`}
                      >
                        {combo.combined.speed.water}
                      </TableCell>
                      <TableCell
                        className={`text-center ${
                          criteria.acceleration ? "bg-primary/10" : ""
                        }`}
                      >
                        {combo.combined.acceleration}
                      </TableCell>
                      <TableCell
                        className={`text-center ${
                          criteria.weight ? "bg-primary/10" : ""
                        }`}
                      >
                        {combo.combined.weight}
                      </TableCell>
                      <TableCell
                        className={`text-center ${
                          criteria.handling ? "bg-primary/10" : ""
                        }`}
                      >
                        {combo.combined.handling}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
