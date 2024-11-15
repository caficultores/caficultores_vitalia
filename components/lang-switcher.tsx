"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const LangSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLangChange = async () => {
    router.push(pathname, { locale: locale === "en" ? "es" : "en" });
  };

  return (
    <a
      onClick={handleLangChange}
      className="cursor-pointer text-2xl rounded-full transition-colors duration-200"
    >
      {locale === "en" ? "🇪🇸" : "🇬🇧"}
    </a>
  );
};

export default LangSwitcher;
