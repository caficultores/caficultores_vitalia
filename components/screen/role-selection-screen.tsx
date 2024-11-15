"use client";

import React from "react";
import { Coffee, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { setRoleCookie } from "@/app/actions";
import { useRouter } from "next/navigation";

export function RoleSelectionScreen() {
  const t = useTranslations("roleSelection");
  const router = useRouter();
  const handleSelectRole = (role: string) => {
    setRoleCookie(role);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-[#4A3728]">{t("hello")}</h2>
          <p className="mt-2 text-sm text-[#6B4423]">{t("pleaseSelectRole")}</p>
        </div>
        <div className="mt-8 space-y-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold text-[#4A3728] flex-1">{t("grower")}</CardTitle>
              <Leaf className="h-6 w-6 text-[#4A7023]" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[#6B4423] mb-4">{t("growerDescription")}</CardDescription>
              <Button
                className="w-full bg-[#4A7023] hover:bg-[#3A5A1C] text-white"
                onClick={() => handleSelectRole("GROWER")}
              >
                {t("continueAsGrower")}
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold text-[#4A3728] flex-1">{t("cupper")}</CardTitle>
              <Coffee className="h-6 w-6 text-[#8B593E]" />
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[#6B4423] mb-4">{t("cupperDescription")}</CardDescription>
              <Button
                className="w-full bg-[#8B593E] hover:bg-[#6B4423] text-white"
                onClick={() => handleSelectRole("CUPPER")}
              >
                {t("continueAsCupper")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
