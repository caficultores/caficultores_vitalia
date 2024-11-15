"use client";

import React, { useState, useEffect } from "react";
import { Coffee, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

const sensoryCriteria = [
  { name: "Fragancia", key: "fragrance" },
  { name: "Aroma", key: "aroma" },
  { name: "Sabor", key: "flavor" },
  { name: "Retrogusto", key: "aftertaste" },
  { name: "Acidez", key: "acidity" },
  { name: "Cuerpo", key: "body" },
  { name: "Equilibrio", key: "balance" },
  { name: "Dulzor", key: "sweetness" },
  { name: "Taza Limpia", key: "cleanCup" },
  { name: "Uniformidad", key: "uniformity" },
];

export default function SensoryAnalysisRegistration() {
  const t = useTranslations("cupperCertificationRequest");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lotInfo, setLotInfo] = useState({
    certificationId: "CERT-2023-001",
    variety: "Arabica",
    region: "Huila, Colombia",
    altitude: "1800",
    processingMethod: "Lavado",
  });

  const [scores, setScores] = useState(
    Object.fromEntries(sensoryCriteria.map((criterion) => [criterion.key, 5]))
  );

  const [finalEvaluation, setFinalEvaluation] = useState("");
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    setOverallScore(parseFloat((total / sensoryCriteria.length).toFixed(2)));
  }, [scores]);

  const handleScoreChange = (key: string, value: number) => {
    setScores((prevScores) => ({
      ...prevScores,
      [key]: Math.min(Math.max(value, 1), 10),
    }));
  };

  const handleSave = () => {
    console.log("Saving analysis:", {
      lotInfo,
      scores,
      finalEvaluation,
      overallScore,
    });
    toast({
      title: t("toasts.analysisSaved.title"),
      description: t("toasts.analysisSaved.description"),
    });
  };

  const handleSubmit = () => {
    console.log("Submitting analysis:", {
      lotInfo,
      scores,
      finalEvaluation,
      overallScore,
    });
    toast({
      title: t("toasts.certificateGenerated.title"),
      description: t("toasts.certificateGenerated.description"),
    });
  };

  const chartData = sensoryCriteria.map((criterion) => ({
    attribute: criterion.name,
    score: scores[criterion.key],
  }));

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-[#8B593E] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {t("title")}
              </CardTitle>
              <CardDescription className="text-lg opacity-90 text-white">
                {t("subtitle")}
              </CardDescription>
            </div>
            <Coffee className="h-12 w-12" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 bg-[#F5F1E8] p-4 rounded-lg">
            {Object.entries(lotInfo).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-sm font-medium text-[#6B4423]">
                  {t(`lotInformation.${key}`)}
                </span>
                <span className="text-lg font-semibold text-[#4A3728]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sensoryCriteria.map((criterion) => (
                  <div key={criterion.key} className="space-y-2">
                    <Label
                      htmlFor={criterion.key}
                      className="text-[#4A3728] font-semibold"
                    >
                      {t(`sensoryCriteria.${criterion.key}`)}
                    </Label>
                    <Input
                      id={criterion.key}
                      type="number"
                      min={-1}
                      max={10}
                      step={0.1}
                      value={scores[criterion.key]}
                      onChange={(e) =>
                        handleScoreChange(
                          criterion.key,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2 mt-4">
                <Label
                  htmlFor="overallScore"
                  className="text-[#4A3728] font-semibold"
                >
                  {t("overallScore")}
                </Label>
                <Input
                  id="overallScore"
                  value={overallScore * 10}
                  readOnly
                  className="bg-[#F5F1E8] font-semibold text-[#4A3728]"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={chartData}
                  >
                    <PolarGrid stroke="#E6DFD4" />
                    <PolarAngleAxis dataKey="attribute" stroke="#8B593E" />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 10]}
                      stroke="#8B593E"
                    />
                    <Radar
                      name="Perfil"
                      dataKey="score"
                      stroke="#4A7023"
                      fill="#4A7023"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="finalEvaluation"
                  className="text-[#4A3728] font-semibold"
                >
                  {t("finalEvaluation")}
                </Label>
                <Textarea
                  id="finalEvaluation"
                  value={finalEvaluation}
                  onChange={(e) => setFinalEvaluation(e.target.value)}
                  placeholder={t("finalEvaluationPlaceholder")}
                  className="h-40"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-[#F5F1E8] p-6 flex justify-between items-center">
          <Button
            onClick={handleSave}
            className="bg-[#6B4423] hover:bg-[#4A3728] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <Save className="mr-2 h-5 w-5" />
            {t("saveButton")}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#4A7023] hover:bg-[#3A5A1C] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <Send className="mr-2 h-5 w-5" />
            {t("submitButton")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
