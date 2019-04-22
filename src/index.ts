import {
  makeDecorator,
  StoryContext,
  StoryGetter,
  WrapperSettings
} from "@storybook/addons";

export const withI18n = makeDecorator({
  name: "withI18n",
  parameterName: "i18n",
  skipIfNoParametersOrOptions: true,
  allowDeprecatedUsage: true,

  wrapper: (
    getStory: StoryGetter,
    context: StoryContext,
    { parameters }: WrapperSettings
  ) => {
    // TODO getting parameters and using them

    return getStory(context);
  }
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
