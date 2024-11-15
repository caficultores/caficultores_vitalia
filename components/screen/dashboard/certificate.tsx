"use client";
import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { Certificate, CertificationRequest, City, CoffeeVariety, Municipality, Province } from "@prisma/client";

export function CertificateScreen({
  certificate,
}: {
  certificate: Certificate & {
    certification_request: CertificationRequest & { coffee_varieties: CoffeeVariety[] } & {
      municipality: Municipality;
    } & { city: City } & { province: Province };
  };
}) {
  const t = useTranslations("certificateDetails");

  const cupAttributes = [
    { name: t("fragance"), value: certificate.fragrance_score },
    { name: t("aroma"), value: certificate.aroma_score },
    { name: t("flavor"), value: certificate.flavor_score },
    { name: t("aftertaste"), value: certificate.aftertaste_score },
    { name: t("acidity"), value: certificate.acidity_score },
    { name: t("body"), value: certificate.body_score },
    { name: t("balance"), value: certificate.balance_score },
    { name: t("sweetness"), value: certificate.sweetness_score },
    { name: t("cleanCup"), value: certificate.clean_cup_score },
    { name: t("uniformity"), value: certificate.uniformity_score },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-[#8B593E] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">{t("title")}</CardTitle>
              <CardDescription className="text-lg opacity-90 text-white">
                {t("subtitle")}: {certificate.id}
              </CardDescription>
            </div>
            <div className="bg-[#F5F1E8] p-3 rounded-lg">
              <p className="text-sm font-medium text-[#6B4423]">{t("scaScore")}</p>
              <p className="text-lg font-semibold text-[#4A3728]">
                {(cupAttributes.reduce((sum, attr) => sum + attr.value, 0) / cupAttributes.length) * 10}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500">{t("certificationDate")}</p>
              <p className="text-lg font-semibold text-[#4A3728]">{certificate.certified_at.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{t("cupperInCharge")}</p>
              <p className="text-lg font-semibold text-[#4A3728]">{certificate.certified_by}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{t("coffeeVariety")}</p>
              <p className="text-lg font-semibold text-[#4A3728]">
                {certificate.certification_request.coffee_varieties.map((variety) => variety.name)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{t("origin")}</p>
              <p className="text-lg font-semibold text-[#4A3728]">
                {certificate.certification_request.district}, {certificate.certification_request.village},{" "}
                {certificate.certification_request.municipality?.name}, {certificate.certification_request.city?.name},{" "}
                {certificate.certification_request.province?.name}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#4A3728] mb-4">{t("cupProfile")}</h3>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={cupAttributes}>
                  <PolarGrid stroke="#E6DFD4" />
                  <PolarAngleAxis dataKey="name" stroke="#8B593E" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#8B593E" />
                  <Radar name="Perfil" dataKey="value" stroke="#4A7023" fill="#4A7023" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#4A3728] mb-4">{t("detailedResults")}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {cupAttributes.map((attr) => (
                <div key={attr.name} className="bg-[#F5F1E8] p-3 rounded-lg">
                  <p className="text-sm font-medium text-[#6B4423]">{attr.name}</p>
                  <p className="text-lg font-semibold text-[#4A3728]">{attr.value.toFixed(1)}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#4A3728] mb-2">{t("finalEvaluation")}</h3>
            <p className="text-[#6B4423] leading-relaxed">
              Este café Caturra de Huila, Colombia, presenta un perfil equilibrado con notas destacadas de chocolate y
              frutos rojos. Su acidez brillante y cuerpo medio-alto contribuyen a una experiencia en taza memorable. La
              limpieza y uniformidad sobresalientes indican un procesamiento y selección de granos cuidadosos.
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-[#F5F1E8] p-6">
          <Button className="w-full bg-[#4A7023] hover:bg-[#3A5A1C] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
            <Download className="mr-2 h-5 w-5" />
            {t("downloadCertificate")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
