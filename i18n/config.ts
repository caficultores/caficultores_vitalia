export const config = {
  defaultLocale: "es",
  locales: ["en", "es"],
};

export type Locale = (typeof config)["locales"][number];
