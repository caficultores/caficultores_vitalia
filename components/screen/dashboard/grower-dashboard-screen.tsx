"use client";

import { ChevronRight, Coffee, LineChart, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Certificate, CertificationRequest, CertificationStatus } from "@prisma/client";


export default function GrowerDashboardScreen({
  pendingCertificates = [] as (CertificationRequest & {certification_status: CertificationStatus})[],
  certificates = [] as Certificate[]
}) {
  const t = useTranslations("growerDashboard");

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* {showAnnouncement && (
        <div className="bg-[#8B593E] text-white p-3 text-center">
          <p className="text-sm">
            New feature: You can now track your sensory analysis certificate
            progress in real-time!
            <Button
              variant="link"
              className="text-white underline ml-2"
              onClick={() => setShowAnnouncement(false)}
            >
              Dismiss
            </Button>
          </p>
        </div>
      )} */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6">
          <Card className="col-span-2 mb-6 md:mb-0">
            <CardHeader>
              <CardTitle>{t("pendingCertificates")}</CardTitle>
              <CardDescription>{t("descriptionPedingCertificates")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingCertificates.map((cert) => (
                  <Link
                    href={`/grower-dashboard/certification-request/${cert.id}`}
                    key={cert.id}
                    className="flex items-center justify-between hover:bg-[#E6DFD4] p-2 rounded-md"
                  >
                    <div>
                      <h3 className="font-medium text-[#4A3728]">
                        {cert.coffee_name}
                      </h3>
                      <p className="text-sm text-[#8B593E]">
                        {t("certificationStatus")} {t(`${cert.certification_status.name}`)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {t("viewAllCertificates")}
              </Button>
            </CardFooter>
          </Card>
          <Card className="mb-6 md:mb-0">
            <CardHeader>
              <CardTitle>{t("requestNewCertificate.title")}</CardTitle>
              <CardDescription>
                {t("requestNewCertificate.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/grower-dashboard/certification-request">
                <Button className="w-full bg-[#4A7023] hover:bg-[#3A5A1C] text-white">
                  <Plus className="mr-2 h-4 w-4" />{" "}
                  {t("requestNewCertificate.button")}
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="col-span-2 mb-6 md:mb-0">
            <CardHeader>
              <CardTitle>{t("title")}</CardTitle>
              <CardDescription>{t("description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <Link
                    href={`/grower-dashboard/certificates/${cert.id}`}
                    key={cert.id}
                    className="flex items-center justify-between hover:bg-[#E6DFD4] p-2 rounded-md"
                  >
                    {/* <div>
                      <h3 className="font-medium text-[#4A3728]">
                        {cert.certification_requests.coffee_name}
                      </h3>
                      <p className="text-sm text-[#8B593E]">
                        {t("certifiedOn")} {cert.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#4A7023]">
                        {cert.score}
                      </span>
                      <Progress value={cert.score} className="w-24 h-2" />
                    </div> */}
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {t("viewAllCertificates")}
              </Button>
            </CardFooter>
          </Card>
          <Card className="mb-6 md:mb-0">
            <CardHeader>
              <CardTitle>{t("helpAndSupport.title")}</CardTitle>
              <CardDescription>
                {t("helpAndSupport.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                {t("helpAndSupport.faqs")} <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                {t("helpAndSupport.support")}{" "}
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                {t("helpAndSupport.tutorials")}{" "}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          <Card className="col-span-2 mb-6 md:mb-0">
            <CardHeader>
              <CardTitle>{t("performanceInsights.title")}</CardTitle>
              <CardDescription>
                {t("performanceInsights.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-[#E6DFD4] rounded-md">
                <LineChart className="h-12 w-12 text-[#6B4423] opacity-50" />
                <span className="ml-2 text-[#6B4423]">
                  {t("performanceInsights.chartPlaceholder")}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {t("performanceInsights.viewAnalytics")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-[#4A3728] text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Coffee className="h-6 w-6" />
              <span className="font-semibold">{t("footer.platformName")}</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">
                {t("footer.privacyPolicy")}
              </a>
              <a href="#" className="hover:underline">
                {t("footer.terms")}
              </a>
              <a href="#" className="hover:underline">
                {t("footer.contact")}
              </a>
            </div>
          </div>
          <Separator className="my-4 bg-white/20" />
          <p className="text-sm text-center">{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
