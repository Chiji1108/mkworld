"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { DRIVERS, MACHINES, type Stats } from "@/lib/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface Combination {
  driver: Stats;
  machine: Stats;
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
    handling: true,
  });
  const [showResults, setShowResults] = useState(false);

  const allCombinations = useMemo(() => {
    const combinations: Combination[] = [];
    
    DRIVERS.forEach(driver => {
      MACHINES.forEach(machine => {
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
    if (!showResults) return [];
    
    const sorted = [...allCombinations].sort((a, b) => b.totalScore - a.totalScore);
    return sorted.slice(0, 20);
  }, [allCombinations, showResults]);

  const handleCriteriaChange = (key: keyof OptimizationCriteria, checked: boolean) => {
    setCriteria(prev => ({ ...prev, [key]: checked }));
    setShowResults(false);
  };

  const criteriaCount = Object.values(criteria).filter(Boolean).length;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">パレート最適</h1>
        <p className="text-muted-foreground">指定した条件に基づいて最適な組み合わせを見つけます</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>最適化条件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-3">スピード</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="speedSmooth"
                      checked={criteria.speedSmooth}
                      onCheckedChange={(checked) => handleCriteriaChange("speedSmooth", !!checked)}
                    />
                    <label htmlFor="speedSmooth" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      滑
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="speedRough"
                      checked={criteria.speedRough}
                      onCheckedChange={(checked) => handleCriteriaChange("speedRough", !!checked)}
                    />
                    <label htmlFor="speedRough" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      荒
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="speedWater"
                      checked={criteria.speedWater}
                      onCheckedChange={(checked) => handleCriteriaChange("speedWater", !!checked)}
                    />
                    <label htmlFor="speedWater" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      水
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-3">その他の性能</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceleration"
                      checked={criteria.acceleration}
                      onCheckedChange={(checked) => handleCriteriaChange("acceleration", !!checked)}
                    />
                    <label htmlFor="acceleration" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      かそく
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="weight"
                      checked={criteria.weight}
                      onCheckedChange={(checked) => handleCriteriaChange("weight", !!checked)}
                    />
                    <label htmlFor="weight" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      おもさ
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="handling"
                      checked={criteria.handling}
                      onCheckedChange={(checked) => handleCriteriaChange("handling", !!checked)}
                    />
                    <label htmlFor="handling" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      まがりやすさ
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => setShowResults(true)}
                  disabled={criteriaCount === 0}
                  className="w-full sm:w-auto"
                >
                  最適組み合わせを検索 ({criteriaCount}項目選択中)
                </Button>
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

        {showResults && paretoOptimalCombinations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>最適組み合わせ (上位20組)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>順位</TableHead>
                    <TableHead>ドライバー</TableHead>
                    <TableHead>マシン</TableHead>
                    <TableHead>合計スコア</TableHead>
                    <TableHead>スピード（滑）</TableHead>
                    <TableHead>スピード（荒）</TableHead>
                    <TableHead>スピード（水）</TableHead>
                    <TableHead>かそく</TableHead>
                    <TableHead>おもさ</TableHead>
                    <TableHead>まがりやすさ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paretoOptimalCombinations.map((combo, index) => (
                    <TableRow key={`${combo.driver.name}-${combo.machine.name}`}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 relative">
                            <Image
                              src={`/drivers/${combo.driver.name}.png`}
                              alt={combo.driver.name}
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                          <span className="text-sm">{combo.driver.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 relative">
                            <Image
                              src={`/machines/${combo.machine.name}.png`}
                              alt={combo.machine.name}
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                          <span className="text-sm">{combo.machine.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default" className="text-lg">
                          {combo.totalScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={criteria.speedSmooth ? "default" : "outline"}>
                          {combo.combined.speed.smooth}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={criteria.speedRough ? "default" : "outline"}>
                          {combo.combined.speed.rough}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={criteria.speedWater ? "default" : "outline"}>
                          {combo.combined.speed.water}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={criteria.acceleration ? "secondary" : "outline"}>
                          {combo.combined.acceleration}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={criteria.weight ? "secondary" : "outline"}>
                          {combo.combined.weight}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={criteria.handling ? "secondary" : "outline"}>
                          {combo.combined.handling}
                        </Badge>
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