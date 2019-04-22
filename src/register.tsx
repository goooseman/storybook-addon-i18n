import addons, { types } from "@storybook/addons";
import * as React from "react";

import { ADDON_ID, ADDON_TITLE, API, PANEL_ID, PARAM_KEY } from "./shared";

import Panel from "./Panel";

addons.register(ADDON_ID, (api: API) => {
  addons.add(PANEL_ID, {
    type: types.TAB,
    title: ADDON_TITLE,
    route: ({ storyId }) => `/${PARAM_KEY}/${storyId}`,
    match: ({ viewMode }) => viewMode === PARAM_KEY,
    render: ({ active }) => <Panel api={api} active={active} />
  });
});
