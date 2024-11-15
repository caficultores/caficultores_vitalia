"use client";

import {
  Coffee,
  Award,
  ChevronRight,
  Users,
  Star,
  Shield,
  Facebook,
  Twitter,
  Instagram,
  TrendingUp,
  FileCheck,
  BarChart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import howItWorksImage from "@/public/how-it-works.webp";
import heroImage from "@/public/hero.webp";
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setRoleCookie } from "@/app/actions";
import { redirect } from "@/i18n/routing";

export default function LandingScreen() {
  const t = useTranslations();
  const locale = useLocale();

  const handleJoinNow = (role: string) => {
    setRoleCookie(role);
    redirect({ href: `/login`, locale });
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#4A3728]">
      <main className="pt-16">
        <section className="relative min-h-[80vh] flex items-center py-8">
          <Image
            src={heroImage}
            alt="Coffee grower inspecting beans"
            fill
            style={{ objectFit: "cover" }}
            className="absolute inset-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A3728]/90 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                {t("hero.titleOne")}
                <span className="text-[#E6DFD4]"> {t("hero.titleTwo")}</span> {t("hero.titleThree")}
              </h1>
              <p className="text-xl md:text-2xl text-[#F5F1E8] mb-12 leading-relaxed">{t("hero.subtitle")}</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  className="group bg-[#8B593E] text-white font-bold text-xl px-8 py-8 rounded-full inline-flex items-center justify-center hover:bg-[#6B4423] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => handleJoinNow("GROWER")}
                >
                  {t("hero.growersCTA")}
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  className="group bg-[#4A7023] text-white font-bold text-xl px-8 py-8 rounded-full inline-flex items-center justify-center hover:bg-[#3A5A1C] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => handleJoinNow("CUPPER")}
                >
                  {t("hero.cuppersCTA")}
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-[#4A3728] mb-10">
              {t("coffeeGrowersBenefits.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-[#4A3728] flex-1">
                    {t("coffeeGrowersBenefits.benefitOne.title")}
                  </CardTitle>
                  <div className="bg-[#F5F1E8] p-3 rounded-full">
                    <Coffee className="h-6 w-6 text-[#8B593E]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#6B4423] text-base">
                    {t("coffeeGrowersBenefits.benefitOne.description")}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-[#4A3728] flex-1">
                    {t("coffeeGrowersBenefits.benefitTwo.title")}
                  </CardTitle>
                  <div className="bg-[#F5F1E8] p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-[#4A7023]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#6B4423] text-base">
                    {t("coffeeGrowersBenefits.benefitTwo.description")}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-[#4A3728] flex-1">
                    {t("coffeeGrowersBenefits.benefitThree.title")}
                  </CardTitle>
                  <div className="bg-[#F5F1E8] p-3 rounded-full">
                    <BarChart className="h-6 w-6 text-[#C4A484]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#6B4423] text-base">
                    {t("coffeeGrowersBenefits.benefitThree.description")}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-[#4A3728] flex-1">
                    {t("coffeeGrowersBenefits.benefitFour.title")}
                  </CardTitle>
                  <div className="bg-[#F5F1E8] p-3 rounded-full">
                    <Users className="h-6 w-6 text-[#8B593E]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#6B4423] text-base">
                    {t("coffeeGrowersBenefits.benefitFour.description")}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-16">
              <Button
                className="group bg-[#8B593E] text-white font-bold text-xl px-8 py-8 rounded-full inline-flex items-center justify-center hover:bg-[#6B4423] transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => handleJoinNow("GROWER")}
              >
                {t("hero.growersCTA")}
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-[#4A3728] mb-10">{t("cuppersBenefits.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-[#4A3728] flex-1">
                    {t("cuppersBenefits.benefitOne.title")}
                  </CardTitle>
                  <div className="bg-[#F5F1E8] p-3 rounded-full">
                    <Star className="h-6 w-6 text-[#C4A484]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#6B4423] text-base">
                    {t("cuppersBenefits.benefitOne.description")}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-[#4A3728] flex-1">
                    {t("cuppersBenefits.benefitTwo.title")}
                  </CardTitle>
                  <div className="bg-[#F5F1E8] p-3 rounded-full">
                    <Users className="h-6 w-6 text-[#4A7023]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#6B4423] text-base">
                    {t("cuppersBenefits.benefitTwo.description")}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-[#4A3728] flex-1">
                    {t("cuppersBenefits.benefitThree.title")}
                  </CardTitle>
                  <div className="bg-[#F5F1E8] p-3 rounded-full">
                    <FileCheck className="h-6 w-6 text-[#8B593E]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#6B4423] text-base">
                    {t("cuppersBenefits.benefitThree.description")}
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-[#4A3728] flex-1">
                    {t("cuppersBenefits.benefitFour.title")}
                  </CardTitle>
                  <div className="bg-[#F5F1E8] p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-[#C4A484]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#6B4423] text-base">
                    {t("cuppersBenefits.benefitFour.description")}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-16">
              <Button
                className="group bg-[#4A7023] text-white font-bold text-xl px-8 py-8 rounded-full inline-flex items-center justify-center hover:bg-[#3A5A1C] transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => handleJoinNow("CUPPER")}
              >
                {t("hero.cuppersCTA")}
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">{t("features.title")}</h2>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-[#E6DFD4] rounded-full p-8 inline-block mb-6 shadow-lg group-hover:bg-[#8B593E] transition-colors duration-300">
                  <Coffee className="h-14 w-14 text-[#6B4423] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{t("features.featureOne.title")}</h3>
                <p className="text-[#4A3728] text-lg leading-relaxed">{t("features.featureOne.description")}</p>
              </div>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-[#E6DFD4] rounded-full p-8 inline-block mb-6 shadow-lg group-hover:bg-[#4A7023] transition-colors duration-300">
                  <Users className="h-14 w-14 text-[#4A7023] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{t("features.featureTwo.title")}</h3>
                <p className="text-[#4A3728] text-lg leading-relaxed">{t("features.featureTwo.description")}</p>
              </div>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-[#E6DFD4] rounded-full p-8 inline-block mb-6 shadow-lg group-hover:bg-[#C4A484] transition-colors duration-300">
                  <Award className="h-14 w-14 text-[#C4A484] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{t("features.featureThree.title")}</h3>
                <p className="text-[#4A3728] text-lg leading-relaxed">{t("features.featureThree.description")}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 bg-[#E6DFD4]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">{t("howItWorks.title")}</h2>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <Image
                  src={howItWorksImage}
                  alt="Coffee sensory analysis"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl relative hidden md:block"
                />
              </div>
              <div>
                <ol className="space-y-8">
                  <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                    <span className="bg-[#8B593E] text-white rounded-full w-10 h-10 flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                      1
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{t("howItWorks.stepOne.title")}</h3>
                      <p className="text-lg leading-relaxed">{t("howItWorks.stepOne.description")}</p>
                    </div>
                  </li>
                  <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                    <span className="bg-[#8B593E] text-white rounded-full w-10 h-10 flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                      2
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{t("howItWorks.stepTwo.title")}</h3>
                      <p className="text-lg leading-relaxed">{t("howItWorks.stepTwo.description")}</p>
                    </div>
                  </li>
                  <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                    <span className="bg-[#8B593E] text-white rounded-full w-10 h-10 flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                      3
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{t("howItWorks.stepThree.title")}</h3>
                      <p className="text-lg leading-relaxed">{t("howItWorks.stepThree.description")}</p>
                    </div>
                  </li>
                  <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                    <span className="bg-[#8B593E] text-white rounded-full w-10 h-10 flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                      4
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{t("howItWorks.stepFour.title")}</h3>
                      <p className="text-lg leading-relaxed">{t("howItWorks.stepFour.description")}</p>
                    </div>
                  </li>
                  <li className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                    <span className="bg-[#8B593E] text-white rounded-full w-10 h-10 flex items-center justify-center mr-6 flex-shrink-0 shadow-lg">
                      5
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{t("howItWorks.stepFive.title")}</h3>
                      <p className="text-lg leading-relaxed">{t("howItWorks.stepFive.description")}</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">{t("community.title")}</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="bg-[#F5F1E8] p-8 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300">
                <Star className="h-16 w-16 text-[#C4A484] mb-6" />
                <h3 className="text-2xl font-semibold mb-4">{t("community.featureOne.title")}</h3>
                <p className="text-lg leading-relaxed">{t("community.featureOne.description")}</p>
              </div>
              <div className="bg-[#F5F1E8] p-8 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300">
                <Shield className="h-16 w-16 text-[#4A7023] mb-6" />
                <h3 className="text-2xl font-semibold mb-4">{t("community.featureTwo.title")}</h3>
                <p className="text-lg leading-relaxed">{t("community.featureTwo.description")}</p>
              </div>
              <div className="bg-[#F5F1E8] p-8 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300">
                <Users className="h-16 w-16 text-[#8B593E] mb-6" />
                <h3 className="text-2xl font-semibold mb-4">{t("community.featureThree.title")}</h3>
                <p className="text-lg leading-relaxed">{t("community.featureThree.description")}</p>
              </div>
            </div>
            <div className="text-center mt-16">
              <Button
                className="group bg-[#4A7023] text-white font-bold text-xl px-8 py-8 rounded-full inline-flex items-center justify-center hover:bg-[#3A5A1C] transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => handleJoinNow("CUPPER")}
              >
                {t("hero.cuppersCTA")}
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#4A3728] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <span>Email:</span>
                  <a href="mailto:info@caficultores.co" className="hover:text-[#E6DFD4] transition-colors">
                    info@caficultores.co
                  </a>
                </li>
                {/* <li className="flex items-center space-x-3">
                  <span>Phone:</span>
                  <a href="tel:+573102222222" className="hover:text-[#E6DFD4] transition-colors">
                    +57 310 2222222
                  </a>
                </li> */}
                {/* <li>
                  <address className="not-italic">
                    123 Coffee Lane,
                    <br />
                    Bean City, 12345
                  </address>
                </li> */}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="hover:text-[#E6DFD4] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E6DFD4] transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E6DFD4] transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#E6DFD4] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Join Our Community</h3>
              <p className="mb-6 text-lg leading-relaxed">
                Stay updated with the latest news and connect with fellow coffee growers and cuppers.
              </p>
              <div className="flex space-x-6">
                <Link href="#" className="hover:text-[#E6DFD4] transform hover:scale-110 transition-all duration-300">
                  <Facebook className="h-8 w-8" />
                </Link>
                <Link href="#" className="hover:text-[#E6DFD4] transform hover:scale-110 transition-all duration-300">
                  <Twitter className="h-8 w-8" />
                </Link>
                <Link href="#" className="hover:text-[#E6DFD4] transform hover:scale-110 transition-all duration-300">
                  <Instagram className="h-8 w-8" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#E6DFD4]/20 text-center">
            <p className="text-[#E6DFD4]/80">&copy; 2024 caficultores.co. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
