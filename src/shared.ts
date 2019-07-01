export const ADDON_ID = "storybooks/i18n";
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = `i18n`;
export const ADDON_TITLE = "I18n";

export interface Parameters {
  provider: React.FunctionComponent;
  providerProps: object;
  providerLocaleKey?: string;
  providerDirectionKey?: string;
  supportedLocales: string[];
  getDirection?(locale: string): "ltr" | "rtl";
}
