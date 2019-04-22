import { FunctionComponent, ReactElement } from "react";

export const ADDON_ID = "storybooks/i18n";
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = `i18n`;
import { EventEmitter } from "events";
export const ADDON_TITLE = "I18n";

export interface API extends EventEmitter {
  getParameters(id: string, scope?: string): undefined | Parameters;
  getElements(
    type: string
  ): {
    [id: string]: {
      id: string;
      render(): ReactElement;
    };
  };
}

export interface Parameters {
  provider: React.FunctionComponent;
  providerProps: object;
  providerLocaleKey: string;
  supportedLocales: string[];
}
