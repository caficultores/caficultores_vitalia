"use client";

import { useState } from "react";
import { Coffee, Check } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const coffeeVarieties = [
  { label: "Arabica", value: "arabica" },
  { label: "Robusta", value: "robusta" },
  { label: "Typica", value: "typica" },
  { label: "Bourbon", value: "bourbon" },
  { label: "Caturra", value: "caturra" },
  { label: "Gesha", value: "gesha" },
];

const processingMethods = [
  { label: "Washed", value: "washed" },
  { label: "Natural", value: "natural" },
  { label: "Honey", value: "honey" },
  { label: "Wet Hulled", value: "wet-hulled" },
  { label: "Anaerobic", value: "anaerobic" },
];

export default function CompleteProfileScreen() {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "",
    region: "",
    municipality: "",
    farmName: "",
    farmLocation: "",
    farmSize: "",
    altitude: "",
    varieties: [] as string[],
    processingMethods: [] as string[],
    annualProduction: "",
    certifications: "",
    achievements: "",
    socialMedia: "",
    website: "",
  });

  const [photos, setPhotos] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleMultiSelectChange = (
    name: "varieties" | "processingMethods",
    value: string
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: prevState[name].includes(value)
        ? prevState[name].filter((item: string) => item !== value)
        : [...prevState[name], value],
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos].slice(0, 2));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Photos:", photos);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <Coffee className="h-8 w-8 text-[#6B4423]" />
          </div>
          <CardTitle className="text-3xl font-bold text-[#4A3728]">
            {t("completeProfile.title")}
          </CardTitle>
          <CardDescription className="text-[#8B593E]">
            {t("completeProfile.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#4A3728] mb-4">
                {t("completeProfile.personalInformation")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {t("completeProfile.fullName")}
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("completeProfile.phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">
                    {t("completeProfile.country")}
                  </Label>
                  <Select
                    name="country"
                    onValueChange={(value: string) =>
                      handleSelectChange("country", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("completeProfile.selectCountry")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="brazil">Brazil</SelectItem>
                      <SelectItem value="ethiopia">Ethiopia</SelectItem>
                      <SelectItem value="vietnam">Vietnam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">{t("completeProfile.region")}</Label>
                  <Input
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="municipality">
                    {t("completeProfile.municipality")}
                  </Label>
                  <Input
                    id="municipality"
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-[#4A3728] mb-4">
                {t("completeProfile.farmInformation")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmName">
                    {t("completeProfile.farmName")}
                  </Label>
                  <Input
                    id="farmName"
                    name="farmName"
                    value={formData.farmName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmLocation">
                    {t("completeProfile.specificLocation")}
                  </Label>
                  <Input
                    id="farmLocation"
                    name="farmLocation"
                    value={formData.farmLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmSize">
                    {t("completeProfile.farmSize")}
                  </Label>
                  <Input
                    id="farmSize"
                    name="farmSize"
                    type="number"
                    value={formData.farmSize}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="altitude">
                    {t("completeProfile.altitude")}
                  </Label>
                  <Input
                    id="altitude"
                    name="altitude"
                    type="number"
                    value={formData.altitude}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-[#4A3728] mb-4">
                {t("completeProfile.cultivationDetails")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="varieties">
                    {t("completeProfile.varieties")}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        {formData.varieties.length > 0
                          ? formData.varieties
                            .map(
                              (variety) =>
                                coffeeVarieties.find(
                                  (v) => v.value === variety
                                )?.label
                            )
                            .join(", ")
                          : "Select varieties"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search varieties..." />
                        <CommandEmpty>
                          {t("completeProfile.noMethodFound")}
                        </CommandEmpty>
                        <CommandGroup>
                          {coffeeVarieties.map((variety) => (
                            <CommandItem
                              key={variety.value}
                              onSelect={() =>
                                handleMultiSelectChange(
                                  "varieties",
                                  variety.value
                                )
                              }
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.varieties.includes(variety.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {variety.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processingMethods">
                    {t("completeProfile.processingMethods")}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        {formData.processingMethods.length > 0
                          ? formData.processingMethods
                            .map(
                              (method) =>
                                processingMethods.find(
                                  (m) => m.value === method
                                )?.label
                            )
                            .join(", ")
                          : "Select methods"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search methods..." />
                        <CommandEmpty>
                          {t("completeProfile.noMethodFound")}
                        </CommandEmpty>
                        <CommandGroup>
                          {processingMethods.map((method) => (
                            <CommandItem
                              key={method.value}
                              onSelect={() =>
                                handleMultiSelectChange(
                                  "processingMethods",
                                  method.value
                                )
                              }
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.processingMethods.includes(
                                    method.value
                                  )
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {method.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualProduction">
                    {t("completeProfile.annualProduction")}
                  </Label>
                  <Input
                    id="annualProduction"
                    name="annualProduction"
                    type="number"
                    value={formData.annualProduction}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-[#4A3728] mb-4">
                {t("completeProfile.certifications")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="certifications">
                    {t("completeProfile.certificationLabel")}
                  </Label>
                  <Textarea
                    id="certifications"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    placeholder="e.g., Organic, Fair Trade"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievements">
                    {t("completeProfile.achievementsLabel")}
                  </Label>
                  <Textarea
                    id="achievements"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleInputChange}
                    placeholder="Awards or recognitions"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-[#4A3728] mb-4">
                {t("completeProfile.onlinePresence")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="socialMedia">
                    {t("completeProfile.socialMedia")}
                  </Label>
                  <Input
                    id="socialMedia"
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    placeholder="e.g., Instagram handle"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">
                    {t("completeProfile.website")}
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder={t("completeProfile.websitePlaceholder")}
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-[#4A3728] mb-4">
                {t("completeProfile.farmPhotos")}
              </h3>
              <div className="space-y-2">
                <Label htmlFor="photos">
                  {t("completeProfile.uploadMorePhotos")}
                </Label>
                <Input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4A7023] file:text-white hover:file:bg-[#3A5A1C]"
                />
                {photos.length > 0 && (
                  <div className="mt-2 flex space-x-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Farm photo ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setPhotos(photos.filter((_, i) => i !== index))
                          }
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-[#4A7023] hover:bg-[#3A5A1C] text-white"
            type="submit"
          >
            {t("completeProfile.saveProfile")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
