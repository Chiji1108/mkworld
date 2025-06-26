import { TweetCard } from "@/components/magicui/tweet-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Search, Wrench } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: "https://mkworld-tools.vercel.app",
    },
    twitter: {
      title: t('title'),
      description: t('description'),
    },
  };
}

export default function Home() {
  const t = useTranslations();
  const features = [
    {
      title: t('home.features.builder.title'),
      description: t('home.features.builder.description'),
      icon: Wrench,
      href: "/builder",
    },
    {
      title: t('home.features.performance.title'),
      description: t('home.features.performance.description'),
      icon: BarChart3,
      href: "/performance",
    },
    {
      title: t('home.features.pareto.title'),
      description: t('home.features.pareto.description'),
      icon: Search,
      href: "/pareto",
    },
  ];

  return (
    <div className="container mx-auto pb-12">
      <div className="flex justify-center items-center my-24 sm:my-32">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl sm:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          {t('common.appName')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className="relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  {feature.description}
                </CardDescription>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Link href={feature.href}>{t('common.select')}</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t('home.tweets.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="flex justify-center">
            <TweetCard
              id="1934907959110488460"
              className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="flex justify-center">
            <TweetCard
              id="1937519504999022884"
              className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="flex justify-center">
            <TweetCard
              id="1937356387379810695"
              className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            {t('home.tweets.thanks')}
          </p>
        </div>
      </div>
    </div>
  );
}
