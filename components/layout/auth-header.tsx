"use client";
import { Coffee } from "lucide-react";

import { Link } from "@/i18n/routing";
import LangSwitcher from "../lang-switcher";

const AuthHeader = () => {
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
          </div>
        </div>
      </header>
    </>
  );
};

export default AuthHeader;
