"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Coffee, Menu, X } from "lucide-react";

import { Link } from "@/i18n/routing";
import LangSwitcher from "../lang-switcher";
import { useSession } from "next-auth/react";

const Header = () => {
  const t = useTranslations("header");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: session } = useSession();

  return (
    <>
      <header className="fixed w-full z-50 bg-[#F5F1E8]/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
          <div className="flex items-center space-x-3">
            <Coffee className="h-10 w-10 text-[#6B4423]" />
            <Link href="/">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#6B4423] to-[#8B593E] bg-clip-text text-transparent">
                Caficultores
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-3 md:space-x-10">
            <LangSwitcher />
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#8B593E] font-medium transition-colors duration-200"
                  >
                    {t("menu.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#8B593E] font-medium transition-colors duration-200"
                  >
                    {t("menu.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="hover:text-[#8B593E] font-medium transition-colors duration-200"
                  >
                    {t("menu.howItWorks")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${session ? `/${session.role?.toLowerCase()}-dashboard` : '/role-selection'}`}
                    className="bg-[#8B593E] text-white px-5 py-2 rounded-full hover:bg-[#6B4423] transition-colors duration-200"
                  >
                    {t("menu.joinNow")}
                  </Link>
                </li>
              </ul>
              <div />
            </nav>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          {mobileMenuOpen && (
            <nav className="absolute top-full left-0 right-0 bg-[#F5F1E8] shadow-lg md:hidden">
              <ul className="flex flex-col items-center py-6 space-y-4">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#8B593E] font-medium transition-colors duration-200"
                  >
                    {t("menu.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#8B593E] font-medium transition-colors duration-200"
                  >
                    {t("menu.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="hover:text-[#8B593E] font-medium transition-colors duration-200"
                  >
                    {t("menu.howItWorks")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${session ? `/${session.role?.toLowerCase()}-dashboard` : '/role-selection'}`}
                    className="bg-[#8B593E] text-white px-5 py-2 rounded-full hover:bg-[#6B4423] transition-colors duration-200"
                  >
                    {t("menu.joinNow")}
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
