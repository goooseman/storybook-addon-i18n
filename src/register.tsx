import addons, { types } from "@storybook/addons";
import * as React from "react";

import { ADDON_ID, ADDON_TITLE, PANEL_ID } from "./shared";

import LocaleSelector from "./LocaleSelector";

addons.register(ADDON_ID, api => {
  addons.add(PANEL_ID, {
    type: types.TOOL,
    title: ADDON_TITLE,
    match: ({ viewMode }) => viewMode === "story",
    render: () => <LocaleSelector api={api} />
  });
});
