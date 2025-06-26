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
import { translateDriverName, translateMachineName } from "@/lib/translation-helpers";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

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
  const t = useTranslations();

  // nuqsでURL状態管理 - 各条件を個別のパラメータで管理
  const [speedSmooth, setSpeedSmooth] = useQueryState('speedSmooth', {
    defaultValue: true,
    parse: (value) => value === 'true',
    serialize: (value) => String(value),
  });

  const [speedRough, setSpeedRough] = useQueryState('speedRough', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => String(value),
  });

  const [speedWater, setSpeedWater] = useQueryState('speedWater', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => String(value),
  });

  const [acceleration, setAcceleration] = useQueryState('acceleration', {
    defaultValue: true,
    parse: (value) => value === 'true',
    serialize: (value) => String(value),
  });

  const [weight, setWeight] = useQueryState('weight', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => String(value),
  });

  const [handling, setHandling] = useQueryState('handling', {
    defaultValue: false,
    parse: (value) => value === 'true',
    serialize: (value) => String(value),
  });

  // 従来のcriteria形式に変換（useMemoでメモ化）
  const criteria: OptimizationCriteria = useMemo(() => ({
    speedSmooth,
    speedRough,
    speedWater,
    acceleration,
    weight,
    handling,
  }), [speedSmooth, speedRough, speedWater, acceleration, weight, handling]);

  const allCombinations = useMemo(() => {
    const combinations: Combination[] = [];

    GROUPED_DRIVERS.forEach((driver) => {
      GROUPED_MACHINES.forEach((machine) => {
        const combined = {
          speed: {
            smooth: driver.speed.hard + machine.speed.hard,
            rough: driver.speed.soft + machine.speed.soft,
            water: driver.speed.liquid + machine.speed.liquid,
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


  const criteriaCount = Object.values(criteria).filter(Boolean).length;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          {t("pareto.pageTitle")}
        </h1>
        <p className="text-muted-foreground">{t("pareto.description")}</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("pareto.optimization.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="speedSmooth"
                  checked={speedSmooth}
                  onCheckedChange={(checked) => setSpeedSmooth(!!checked)}
                />
                <label
                  htmlFor="speedSmooth"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.speedHard")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="speedRough"
                  checked={speedRough}
                  onCheckedChange={(checked) => setSpeedRough(!!checked)}
                />
                <label
                  htmlFor="speedRough"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.speedSoft")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="speedWater"
                  checked={speedWater}
                  onCheckedChange={(checked) => setSpeedWater(!!checked)}
                />
                <label
                  htmlFor="speedWater"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.speedLiquid")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceleration"
                  checked={acceleration}
                  onCheckedChange={(checked) => setAcceleration(!!checked)}
                />
                <label
                  htmlFor="acceleration"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.acceleration")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weight"
                  checked={weight}
                  onCheckedChange={(checked) => setWeight(!!checked)}
                />
                <label
                  htmlFor="weight"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.weight")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="handling"
                  checked={handling}
                  onCheckedChange={(checked) => setHandling(!!checked)}
                />
                <label
                  htmlFor="handling"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.handling")}
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {criteriaCount === 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t("pareto.optimization.description")}
            </AlertDescription>
          </Alert>
        )}

        {paretoOptimalCombinations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t("pareto.results.title")} (100)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">
                      {t("pareto.results.score")}
                    </TableHead>
                    <TableHead className="text-center">
                      {t("stats.driver")}
                    </TableHead>
                    <TableHead className="text-center">
                      {t("stats.machine")}
                    </TableHead>
                    <TableHead
                      className={
                        speedSmooth
                          ? "bg-primary/10 text-center w-1/9"
                          : "text-center w-1/9"
                      }
                    >
                      {t("stats.speedHard")}
                    </TableHead>
                    <TableHead
                      className={
                        speedRough
                          ? "bg-primary/10 text-center w-1/9"
                          : "text-center w-1/9"
                      }
                    >
                      {t("stats.speedSoft")}
                    </TableHead>
                    <TableHead
                      className={
                        speedWater
                          ? "bg-primary/10 text-center w-1/9"
                          : "text-center w-1/9"
                      }
                    >
                      {t("stats.speedLiquid")}
                    </TableHead>
                    <TableHead
                      className={
                        acceleration
                          ? "bg-primary/10 text-center w-1/9"
                          : "text-center w-1/9"
                      }
                    >
                      {t("stats.acceleration")}
                    </TableHead>
                    <TableHead
                      className={
                        weight
                          ? "bg-primary/10 text-center w-1/9"
                          : "text-center w-1/9"
                      }
                    >
                      {t("stats.weight")}
                    </TableHead>
                    <TableHead
                      className={
                        handling
                          ? "bg-primary/10 text-center w-1/9"
                          : "text-center w-1/9"
                      }
                    >
                      {t("stats.handling")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paretoOptimalCombinations.map((combo) => {
                    return (
                      <TableRow
                        key={`${combo.driver.names.join(
                          "-"
                        )}-${combo.machine.names.join("-")}`}
                      >
                        <TableCell className="text-center font-bold">
                          {combo.totalScore}
                        </TableCell>
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
                                    alt={translateDriverName(name, t)}
                                    fill
                                    className="object-contain rounded"
                                  />
                                </div>
                                <span className="text-sm">
                                  {translateDriverName(name, t)}
                                </span>
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
                                    alt={translateMachineName(name, t)}
                                    fill
                                    className="object-contain rounded"
                                  />
                                </div>
                                <span className="text-sm">
                                  {translateMachineName(name, t)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell
                          className={`text-center ${
                            speedSmooth ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.speed.smooth}
                        </TableCell>
                        <TableCell
                          className={`text-center ${
                            speedRough ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.speed.rough}
                        </TableCell>
                        <TableCell
                          className={`text-center ${
                            speedWater ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.speed.water}
                        </TableCell>
                        <TableCell
                          className={`text-center ${
                            acceleration ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.acceleration}
                        </TableCell>
                        <TableCell
                          className={`text-center ${
                            weight ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.weight}
                        </TableCell>
                        <TableCell
                          className={`text-center ${
                            handling ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.handling}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
