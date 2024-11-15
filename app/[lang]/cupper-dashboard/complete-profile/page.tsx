"use client";

import React, { useState } from "react";
import { Coffee, Upload, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

const coffeeStyles = [
  { id: "washed", label: "Lavado" },
  { id: "natural", label: "Natural" },
  { id: "honey", label: "Honey" },
  { id: "anaerobic", label: "Anaeróbico" },
];

const coffeeVarieties = [
  { id: "bourbon", label: "Bourbon" },
  { id: "typica", label: "Typica" },
  { id: "caturra", label: "Caturra" },
  { id: "gesha", label: "Gesha" },
];

const regions = [
  { id: "latinAmerica", label: "América Latina" },
  { id: "africa", label: "África" },
  { id: "asia", label: "Asia" },
];

export default function CatadorProfileCompletion() {
  const t = useTranslations();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedCoffeeStyles, setSelectedCoffeeStyles] = useState<string[]>(
    []
  );
  const [selectedVarieties, setSelectedVarieties] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Here you would typically send the data to your backend
    console.log("Profile saved");
    toast({
      title: "Perfil actualizado",
      description: "Tu perfil ha sido actualizado exitosamente.",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-[#8B593E] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {t("cupperProfileCompletion.title")}
              </CardTitle>
              <CardDescription className="text-lg opacity-90 text-white">
                {t("cupperProfileCompletion.description")}
              </CardDescription>
            </div>
            <Coffee className="h-12 w-12" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#4A3728]">
                {t("cupperProfileCompletion.personalInformation")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {t("cupperProfileCompletion.fullName")}
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">
                    {t("cupperProfileCompletion.location")}
                  </Label>
                  <Input id="location" placeholder="Ciudad, País" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("cupperProfileCompletion.profilePhoto")}</Label>
                <div className="flex items-center space-x-4">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#E6DFD4] flex items-center justify-center">
                      <Coffee className="h-8 w-8 text-[#8B593E]" />
                    </div>
                  )}
                  <Label
                    htmlFor="profileImage"
                    className="cursor-pointer bg-[#4A7023] hover:bg-[#3A5A1C] text-white py-2 px-4 rounded-lg transition duration-300"
                  >
                    <Upload className="inline-block mr-2 h-4 w-4" />
                    {t("cupperProfileCompletion.uploadImage")}
                  </Label>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#4A3728]">
                {t("cupperProfileCompletion.professionalInformation")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="certifications">
                    {t("cupperProfileCompletion.certifications")}
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          "cupperProfileCompletion.selectCertifications"
                        )}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sca">SCA</SelectItem>
                      <SelectItem value="qGrader">Q Grader</SelectItem>
                      <SelectItem value="other">Otra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">
                    {t("cupperProfileCompletion.yearsOfExperience")}
                  </Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    placeholder={t(
                      "cupperProfileCompletion.enterYearsOfExperience"
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages">
                  {t("cupperProfileCompletion.spokenLanguages")}
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("cupperProfileCompletion.selectLanguages")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spanish">Español</SelectItem>
                    <SelectItem value="english">Inglés</SelectItem>
                    <SelectItem value="portuguese">Portugués</SelectItem>
                    <SelectItem value="french">Francés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#4A3728]">
                {t("cupperProfileCompletion.analysisPreferences")}
              </h3>
              <div className="space-y-4">
                <Label>
                  {t("cupperProfileCompletion.preferredCoffeeStyles")}
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {coffeeStyles.map((style) => (
                    <div key={style.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={style.id}
                        checked={selectedCoffeeStyles.includes(style.id)}
                        onCheckedChange={(checked: boolean) => {
                          setSelectedCoffeeStyles(
                            checked
                              ? [...selectedCoffeeStyles, style.id]
                              : selectedCoffeeStyles.filter(
                                (id) => id !== style.id
                              )
                          );
                        }}
                      />
                      <Label htmlFor={style.id}>{style.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Label>{t("cupperProfileCompletion.varietyTypes")}</Label>
                <div className="grid grid-cols-2 gap-4">
                  {coffeeVarieties.map((variety) => (
                    <div
                      key={variety.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={variety.id}
                        checked={selectedVarieties.includes(variety.id)}
                        onCheckedChange={(checked: boolean) => {
                          setSelectedVarieties(
                            checked
                              ? [...selectedVarieties, variety.id]
                              : selectedVarieties.filter(
                                (id) => id !== variety.id
                              )
                          );
                        }}
                      />
                      <Label htmlFor={variety.id}>{variety.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Label>
                  {t("cupperProfileCompletion.specializationRegions")}
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {regions.map((region) => (
                    <div
                      key={region.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={region.id}
                        checked={selectedRegions.includes(region.id)}
                        onCheckedChange={(checked: boolean) => {
                          setSelectedRegions(
                            checked
                              ? [...selectedRegions, region.id]
                              : selectedRegions.filter((id) => id !== region.id)
                          );
                        }}
                      />
                      <Label htmlFor={region.id}>{region.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#4A3728]">
                {t("cupperProfileCompletion.contactInformation")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t("cupperProfileCompletion.professionalEmail")}
                  </Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {t("cupperProfileCompletion.phone")}
                  </Label>
                  <Input id="phone" type="tel" placeholder="+1 234 567 8900" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">
                  {t("cupperProfileCompletion.linkedin")}
                </Label>
                <Input
                  id="linkedin"
                  placeholder="https://www.linkedin.com/in/tu-perfil"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="bg-[#F5F1E8] p-6 flex justify-between items-center">
          <Button
            variant="outline"
            className="text-[#4A3728] border-[#4A3728] hover:bg-[#4A3728] hover:text-white"
          >
            <HelpCircle className="mr-2 h-5 w-5" />
            {t("cupperProfileCompletion.help")}
          </Button>
          <Button
            onClick={handleSaveProfile}
            className="bg-[#4A7023] hover:bg-[#3A5A1C] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            {t("cupperProfileCompletion.saveChanges")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
