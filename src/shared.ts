import { ReactElement } from "react";

export const ADDON_ID = "storybooks/i18n";
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = `i18n`;
export const ADDON_TITLE = "I18n";

export interface API {
  on(event: string, callback: (...args: unknown[]) => void): void;
  off(event: string, callback: (...args: unknown[]) => void): void;
  emit(event: string, callback: (...args: unknown[]) => void): void;

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

interface TextParameter {
  text: string;
}
interface MarkdownParameter {
  markdown: string;
}
interface DisabledParameter {
  disable: boolean;
}

export type Parameters =
  | string
  | TextParameter
  | MarkdownParameter
  | DisabledParameter;
