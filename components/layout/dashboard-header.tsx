"use client";
import { useCallback } from "react";
import { Bell, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n/routing";
import LangSwitcher from "../lang-switcher";
import { Button } from "../ui/button";
import { web3auth } from "@/lib/web3auth";

const DashboardHeader = ({ logoLink }: { logoLink: string }) => {
  const { data } = useSession();
  const t = useTranslations();

  const handleLogout = useCallback(() => {
    signOut({ redirectTo: "/" });
    web3auth.logout();
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href={logoLink}>
          <h1 className="text-2xl font-semibold text-[#4A3728]">Dashboard</h1>
        </Link>
        <div className="flex items-center space-x-3 md:space-x-10">
          <LangSwitcher />
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-[#6B4423] cursor-pointer" />
            {data && <Button variant="link" onClick={handleLogout}>{t("logout")}</Button>}
            <div className="flex items-center space-x-2">
              <span className="text-[#4A3728]">{data?.user?.name}</span>
              <Avatar>
                <AvatarImage src={data?.user?.image || ''} alt="Fred" />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
