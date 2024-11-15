import React from "react";
import {
  Calendar,
  Mountain,
  Clock,
  Scale,
  User,
  MapPin,
  Settings,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getCertificationRequestById } from "@/app/actions";
import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";
export default async function CertificationRequestDetail({
  params,
}: {
params: Promise<{   "certification-request-id": string }>;
}) {
  const t = await getTranslations('growerDashboard');

  const certificationRequestId = (await params)["certification-request-id"];

  const certificationRequest = await getCertificationRequestById(
    certificationRequestId
  );

  if (!certificationRequest) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-[#8B593E] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {t("certificateRequestDetail.title")}
              </CardTitle>
              <CardDescription className="text-lg opacity-90 text-white">
                ID: {certificationRequest.id}
              </CardDescription>
            </div>
            <div className="flex bg-[#F5F1E8] p-3 rounded-lg flex-col items-center">
              <span className="text-[#8B593E]">{t("status")}</span>
              <Badge variant="secondary">
                {t(`${certificationRequest.certification_status.name}`)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("coffeeName")}:</span>
                <span>{certificationRequest.coffee_name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("city")}:</span>
                <span>{certificationRequest.city?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("municipality")}:</span>
                <span>{certificationRequest.municipality?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("district")}:</span>
                <span>{certificationRequest.district}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("village")}:</span>
                <span>{certificationRequest.village}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("harvestDate")}:</span>
                <span>
                  {certificationRequest.harvest_date.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mountain className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("altitude")}:</span>
                <span>{certificationRequest.altitude} metros</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("requester")}:</span>
                <span>{certificationRequest.user.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("province")}:</span>
                <span>{certificationRequest.province?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("processingMethod")}:</span>
                <span>{certificationRequest.processing_method.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("certificationStatus")}:</span>
                <Badge variant="secondary">
                  {t(`${certificationRequest.certification_status.name}`)}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("requestedAt")}:</span>
                <span>
                  {certificationRequest.requested_at.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("quantity")}:</span>
                <span>{certificationRequest.quantity} kg</span>
              </div>
              <div className="flex items-center space-x-2">
                <Scale className="h-5 w-5 text-[#8B593E]" />
                <span className="font-semibold">{t("farmName")}:</span>
                <span>{certificationRequest.farm_name}</span>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#4A3728]">
              {t("expectedResults")}
            </h3>
            <p className="text-[#6B4423]">
              {certificationRequest.expected_results}
            </p>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#4A3728]">
              {t("tastingNotes")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {certificationRequest.tasting_notes}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#4A3728]">
              {t("coffeeVarieties")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {certificationRequest.coffee_varieties.map((variety, index) => (
                <Badge key={index} variant="outline">
                  {variety?.name}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#4A3728]">
              {t("additionalInformation")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">{t("createdAt")}:</span>
                <span> {certificationRequest.created_at.toLocaleString()}</span>
              </div>
              <div>
                <span className="font-semibold">{t("updatedAt")}:</span>
                <span> {certificationRequest.updated_at.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
