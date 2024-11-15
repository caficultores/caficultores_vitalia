"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Coffee, Send } from "lucide-react";
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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { City, CoffeeVariety, ProcessingMethod, Province } from "@prisma/client";
import { CertificationRequestSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { createCertificationRequest, getCities } from "@/app/actions";
import { useRouter } from "next/navigation";

export function CertificationRequestScreen({
  coffeeVarieties = [],
  processingMethods = [],
  provinces = [],
}: {
  coffeeVarieties: CoffeeVariety[];
  processingMethods: ProcessingMethod[];
  provinces: Province[];
}) {
  const t = useTranslations("growerCertificationRequest");
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);

  const form = useForm<z.infer<typeof CertificationRequestSchema>>({
    resolver: zodResolver(CertificationRequestSchema),
    defaultValues: {
      variety: "",
      harvestDate: "",
      altitude: "",
      processingMethod: "",
      province: "",
      sampleQuantity: "",
      city: "",
      district: "",
      village: "",
      farmName: "",
      coffeeName: "",
      tastingNotes: ""
    },
  });

  console.log(form.formState.errors);

  const selectedProvince = form.watch("province");

  useEffect(() => {
    if (selectedProvince) {
      handleProvinceChange(selectedProvince);
    }
  }, [selectedProvince]);

  async function onSubmit(data: z.infer<typeof CertificationRequestSchema>) {
    console.log(data);
    toast({
      title: "Generaste una solicitud de analisis sensorial:",
      description: "Te avisaremos cuando un catador acepte tu solicitud.",
    });
    const certificationRequest = await createCertificationRequest(data);
    router.push(
      `/grower-dashboard/certification-request/${certificationRequest.id}`
    );
  }

  async function handleProvinceChange(provinceId: string) {
    const cities = await getCities(provinceId);
    setCities(cities);
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="coffeeName"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.coffeeName")}
                  </Label>
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="coffeeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="province"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.province")}
                  </Label>
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value as string}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un departamento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {provinces.map((province) => (
                              <SelectItem key={province.id} value={province.id}>
                                {province.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>
                          You can manage email addresses in your{" "}
                          <Link href="/examples/forms">email settings</Link>.
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="city"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.city")}
                  </Label>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value as string}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una ciudad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city.id} value={city.id}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>
                          You can manage email addresses in your{" "}
                          <Link href="/examples/forms">email settings</Link>.
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="district"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.district")}
                  </Label>
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="village"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.village")}
                  </Label>
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="village"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="farmName"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.farmName")}
                  </Label>
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="farmName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="variety"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.variety")}
                  </Label>
                  <FormField
                    control={form.control}
                    name="variety"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value as string}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una variedad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {coffeeVarieties.map((variety) => (
                              <SelectItem key={variety.id} value={variety.id}>
                                {variety.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>
                          You can manage email addresses in your{" "}
                          <Link href="/examples/forms">email settings</Link>.
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="harvestDate"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.harvestDate")}
                  </Label>
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="harvestDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="altitude"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.altitude")}
                  </Label>
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="altitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="processingMethod"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.processingMethod")}
                  </Label>
                  <FormField
                    control={form.control}
                    name="processingMethod"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value as string}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un metodo de procesamiento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {processingMethods.map((processingMethod) => (
                              <SelectItem
                                key={processingMethod.id}
                                value={processingMethod.id}
                              >
                                {processingMethod.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>
                          You can manage email addresses in your{" "}
                          <Link href="/examples/forms">email settings</Link>.
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="sampleQuantity"
                    className="text-[#4A3728] font-semibold"
                  >
                    {t("coffeeInformation.sampleQuantity")}
                  </Label>
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="sampleQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="tastingNotes"
                  className="text-[#4A3728] font-semibold"
                >
                  {t("sensoryNotes.expectedNotes")}
                </Label>
                <FormField
                  control={form.control}
                  name="tastingNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="analysisExpectations"
                  className="text-[#4A3728] font-semibold"
                >
                  {t("sensoryNotes.analysisExpectations")}
                </Label>
                <FormField
                  control={form.control}
                  name="analysisExpectations"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="bg-[#F5F1E8] p-6 flex justify-between items-center">
              <Button
                type="submit"
                className="bg-[#4A7023] hover:bg-[#3A5A1C] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
              >
                <Send className="mr-2 h-5 w-5" />
                {t("submitButton")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
