"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t bg-background py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <div>
          © 2025{" "}
          <Link
            href="https://x.com/chiji1108"
            target="_blank"
            className="text-primary hover:underline"
          >
            Chiji1108
          </Link>
          . All rights reserved.
        </div>
        <Link href="/terms" className="text-primary hover:underline">
          {t('footer.terms')}
        </Link>
      </div>
    </footer>
  );
}