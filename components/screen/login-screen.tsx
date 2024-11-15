"use client";
import { useTranslations } from "next-intl";
import { Coffee } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BtnLoginGoogle from "../login/btn-login-google";

export function LoginScreen() {
  const t = useTranslations("login");

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center px-4 py-[6rem]">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <Coffee className="h-8 w-8 text-[#6B4423]" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#4A3728]">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-[#8B593E]">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <BtnLoginGoogle />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
