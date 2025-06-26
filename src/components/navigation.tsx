"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart3, Search, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function Navigation() {
  const pathname = usePathname();
  const t = useTranslations();

  const navigationItems = [
    {
      name: t('navigation.builder'),
      href: "/builder",
      icon: Wrench,
      description: t('home.features.builder.description'),
    },
    {
      name: t('navigation.performance'),
      href: "/performance",
      icon: BarChart3,
      description: t('home.features.performance.description'),
    },
    {
      name: t('navigation.pareto'),
      href: "/pareto",
      icon: Search,
      description: t('home.features.pareto.description'),
    },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">{t('common.appName')}</span>
          </Link>

          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex items-center",
                    isActive && "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
