"use client";

import React from "react";
import { Coffee, Clock, CheckCircle, Star, Eye, HelpCircle, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Certificate, CertificationRequest, CoffeeVariety } from "@prisma/client";

const activityData = [
  { name: "Semana 1", certificaciones: 4 },
  { name: "Semana 2", certificaciones: 3 },
  { name: "Semana 3", certificaciones: 5 },
  { name: "Semana 4", certificaciones: 2 },
];

export function CupperDashboardScreen({
  pedingCertificateRequests = [] as unknown as (CertificationRequest & {
    coffee_varieties: { coffee_variety: CoffeeVariety }[];
  })[],
  inProgressCertificateRequests = [],
  completedCertificates = [] as unknown as (Certificate & {
    certification_request: CertificationRequest & { coffee_varieties: { coffee_variety: CoffeeVariety }[] };
  })[],
}: {
  pedingCertificateRequests: (CertificationRequest & { coffee_varieties: { coffee_variety: CoffeeVariety }[] })[];
  inProgressCertificateRequests: CertificationRequest[];
  completedCertificates: (Certificate & {
    certification_request: CertificationRequest & { coffee_varieties: { coffee_variety: CoffeeVariety }[] };
  })[];
}) {
  const t = useTranslations("cupperDashboard");

  const avarageScore =
    completedCertificates.reduce((acc, cert) => acc + cert.overall_score, 0) / completedCertificates.length || 0;

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#4A3728]">{t("welcome", { name: "María González" })}</h1>
          <p className="text-[#6B4423] mt-2">{t("subtitle")}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B4423]">{t("pendingRequests")}</CardTitle>
              <Clock className="h-4 w-4 text-[#8B593E]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#4A3728]">{pedingCertificateRequests.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B4423]">{t("analysisInProgress")}</CardTitle>
              <Coffee className="h-4 w-4 text-[#8B593E]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#4A3728]">{inProgressCertificateRequests.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B4423]">{t("issuedCertificates")}</CardTitle>
              <CheckCircle className="h-4 w-4 text-[#8B593E]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#4A3728]">{completedCertificates.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#6B4423]">{t("averageScore")}</CardTitle>
              <Star className="h-4 w-4 text-[#8B593E]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#4A3728]">{avarageScore.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="col-span-2 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#4A3728]">{t("pendingRequests")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("coffeeName")}</TableHead>
                    <TableHead>{t("variety")}</TableHead>
                    <TableHead>{t("farmName")}</TableHead>
                    <TableHead>{t("requestDate")}</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedingCertificateRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.coffee_name}</TableCell>
                      <TableCell>{request.coffee_varieties.map((variety) => variety.coffee_variety.name)}</TableCell>
                      <TableCell>{request.farm_name}</TableCell>
                      <TableCell>{request.created_at.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Link href={`/cupper-dashboard/certification-request/${request.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            {t("startAnalysis")}
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#4A3728]">{t("notifications")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-[#8B593E]" />
                  <span className="text-sm text-[#6B4423]">Nueva solicitud asignada: ID #CERT-2023-007</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-[#8B593E]" />
                  <span className="text-sm text-[#6B4423]">
                    Actualización de la plataforma: Nuevas funciones disponibles
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-[#8B593E]" />
                  <span className="text-sm text-[#6B4423]">Recordatorio: 2 análisis pendientes para esta semana</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="col-span-2 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#4A3728]">{t("issuedCertificates")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("variety")}</TableHead>
                    <TableHead>{t("farmName")}</TableHead>
                    <TableHead>{t("issueDate")}</TableHead>
                    <TableHead>{t("score")}</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedCertificates.map((certificate) => (
                    <TableRow key={certificate.id}>
                      <TableCell>
                        {certificate.certification_request.coffee_varieties.map(
                          (variety) => variety.coffee_variety.name
                        )}
                      </TableCell>
                      <TableCell>{certificate.certification_request.farm_name}</TableCell>
                      <TableCell>{certificate.certified_at.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{certificate.overall_score}</Badge>
                      </TableCell>
                      <TableCell>
                        <Link href={`/cupper-dashboard/certificates/${certificate.id}`}>
                          <Button variant="outline" size="sm">
                            {t("viewCertificate")}
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#4A3728]">{t("monthlyActivity")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="certificaciones" fill="#8B593E" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button className="bg-[#4A7023] hover:bg-[#3A5A1C] text-white">
            <HelpCircle className="mr-2 h-5 w-5" />
            {t("helpResources")}
          </Button>
        </div>
      </div>
    </div>
  );
}
