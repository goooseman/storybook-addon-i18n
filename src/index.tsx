import addons, {
  makeDecorator,
  StoryContext,
  StoryGetter
} from "@storybook/addons";
import * as React from "react";

import Provider from "./Provider";
import { ADDON_ID, Parameters } from "./shared";

export const withI18n = makeDecorator({
  name: "withI18n",
  parameterName: "i18n",
  skipIfNoParametersOrOptions: true,
  allowDeprecatedUsage: true,

  wrapper: (getStory: StoryGetter, context: StoryContext, { parameters }) => {
    const channel = addons.getChannel();
    channel.emit(`${ADDON_ID}/register`, parameters);

    return (
      <Provider channel={channel} {...(parameters as Parameters)}>
        {getStory(context) as React.ReactNode}
      </Provider>
    );
  }
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
