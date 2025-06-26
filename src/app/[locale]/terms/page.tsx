"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations();
  
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">{t('terms.pageTitle')}</h1>
        <p className="text-muted-foreground">{t('terms.description')}</p>
      </div>

      <div className="space-y-6">
        {/* Article 1: Permitted Use */}
        <Card>
          <CardHeader>
            <CardTitle>{t('terms.sections.permitted.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">
                {t('terms.sections.permitted.subtitle')}
              </h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>{t('terms.sections.permitted.commercial')}</strong>:
                  {' '}{t('terms.sections.permitted.commercialDesc')}
                </li>
                <li>
                  <strong>{t('terms.sections.permitted.social')}</strong>:
                  {' '}{t('terms.sections.permitted.socialDesc')}
                </li>
                <li>
                  <strong>{t('terms.sections.permitted.screenshot')}</strong>:
                  {' '}{t('terms.sections.permitted.screenshotDesc')}
                </li>
                <li>
                  <strong>{t('terms.sections.permitted.education')}</strong>:
                  {' '}{t('terms.sections.permitted.educationDesc')}
                </li>
                <li>
                  <strong>{t('terms.sections.permitted.anyUser')}</strong>:
                  {' '}{t('terms.sections.permitted.anyUserDesc')}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Article 2: Prohibited Activities */}
        <Card>
          <CardHeader>
            <CardTitle>{t('terms.sections.prohibited.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4 className="font-semibold mb-2">
                {t('terms.sections.prohibited.subtitle')}
              </h4>
              <ul className="list-disc ml-6 space-y-2">
                <li>{t('terms.sections.prohibited.redistribute')}</li>
                <li>{t('terms.sections.prohibited.sourceCode')}</li>
                <li>{t('terms.sections.prohibited.overload')}</li>
                <li>{t('terms.sections.prohibited.harassment')}</li>
                <li>{t('terms.sections.prohibited.illegal')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Article 3: Copyright */}
        <Card>
          <CardHeader>
            <CardTitle>{t('terms.sections.copyright.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-4">
                {t('terms.sections.copyright.description')}
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>{t('terms.sections.copyright.unofficial')}</li>
                <li>{t('terms.sections.copyright.noAffiliation')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Article 4: Disclaimer */}
        <Card>
          <CardHeader>
            <CardTitle>{t('terms.sections.disclaimer.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <ul className="list-disc ml-6 space-y-2">
                <li>{t('terms.sections.disclaimer.noDamageResponsibility')}</li>
                <li>{t('terms.sections.disclaimer.noAccuracyGuarantee')}</li>
                <li>{t('terms.sections.disclaimer.noContinuityGuarantee')}</li>
                <li>{t('terms.sections.disclaimer.mayChangeService')}</li>
                <li>{t('terms.sections.disclaimer.noExternalLinkResponsibility')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Article 5: Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>{t('terms.sections.privacy.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <ul className="list-disc ml-6 space-y-2">
                <li>{t('terms.sections.privacy.noPersonalData')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Article 6: Changes to Terms */}
        <Card>
          <CardHeader>
            <CardTitle>{t('terms.sections.changes.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-4">
                {t('terms.sections.changes.description')}
              </p>
              <p>
                {t('terms.sections.changes.agreement')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Article 7: Contact */}
        <Card>
          <CardHeader>
            <CardTitle>{t('terms.sections.contact.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-4">
                {t('terms.sections.contact.description')}
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <Link
                    href="https://x.com/chiji1108"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {t('terms.sections.contact.xMain')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/ChijiiwaShingo"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {t('terms.sections.contact.xTech')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/Chijidosu"
                    target="_blank"
                    className="text-primary hover:underline line-through"
                  >
                    {t('terms.sections.contact.xUniv')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/miririmon"
                    target="_blank"
                    className="text-primary hover:underline line-through"
                  >
                    {t('terms.sections.contact.xBrawl')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://x.com/shingo_seikei"
                    target="_blank"
                    className="text-primary hover:underline line-through"
                  >
                    {t('terms.sections.contact.xPlastic')}
                  </Link>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center pt-8 text-sm text-muted-foreground">
          <p>{t('terms.dates.established')}</p>
          <p>{t('terms.dates.lastUpdated')}</p>
        </div>
      </div>
    </div>
  );
}