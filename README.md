# Storybook I18n

Storybook I18n Addon can be used to change locale of the component inside the preview in [Storybook](https://storybook.js.org).

This is how I18n addon looks like:

![Storybook I18n Demo](docs/storybook-i18n-example.png)

This addon is made library-agnostic, it does not depend on any exact i18n tool you use in your application.

It can take any custom locale context provider and pass any custom props.
It can be used even to test your components in `ltr` and `rtl` fashion.

## Installation

```sh
npm i -D @storybook/addon-i18n
```

## Simple Usage

> Currently React is supported only. PR's are always welcome!

### React

Create a file called addons.js in your Storybook config, if there is no any and append following line:

`import "@storybook/addon-i18n/register.js";`

Then in your storie's config or in a global config for the project (`config.js`) add `i18n` key to parameters:

```
import { addParameters } from "@storybook/react";

addParameters({
  i18n: {
    provider: LionessProvider,
    providerProps: {
      messages,
    },
    supportedLocales: ["en", "ru"],
    providerLocaleKey: "locale"
  },
});
```

## API

Library accepts following parameters, which are passed as storybook parameters under `i18n` key:

- `provider` **required** - An internalization provider, which provides intl context to the app
- `providerProps` - All the props you need to pass to Provider, except locale
- `supportedLocales` **required** - An array of locale keys that your application support
- `providerLocaleKey` (`locale` by default) - prop name of the locale used by the library to pass active locale to provider
- `providerDirectionKey` (`direction` by default) - prop name of the direction key used by the libary to pass active direction (`rtl` or `ltr`) to provider
- `getDirection` - function, which accepts locale as an argument and should return `rtl` or `ltr`. By default it is returning `rtl` for `he` and `ar` locales

## Complex usage

If you are using Material-UI, you need to test `jss-rtl` in your storybook too. The problem is that you need to wrap your storybook to `ThemeProvider`, which should recieve a `theme` with correct direction. So how can we pass the direction from this libary to `ThemeProvider`.

You can check an integration example in my [React boilerplate project](https://github.com/trucknet-io/trucknet-boilerplate-typescript-react)

To achive this task a common Provider should be created, which is used and in the Storybook and in the main application bundle. Here is an example:

```
export class MuiLocaleProvider extends React.PureComponent<WithLocale> {
  public render() {
    const { locale, direction } = this.props;
    return (
      <LionessProvider locale={locale} messages={messages}>
        <MuiThemeProvider theme={createTheme(direction)}>
          <JssProvider {...jss}>
            <React.Fragment>
              <CssBaseline />
              {this.props.children}
            </React.Fragment>
          </JssProvider>
        </MuiThemeProvider>
      </LionessProvider>
    );
  }
}
```

This Provider should accept `locale` and `direction` as props and include everything needed for internalization: `LionessProvider` (intl), `MuiThemeProvider` (MUI theme which pass a theme with a correct direction) and `JssProvider` (with `jss-rtl` configured).

Then this provider can be used in storybook config:

```
addParameters({
  i18n: {
    provider: MuiLocaleProvider,
    providerProps: {
      messages,
    },
    supportedLocales,
  },
});
```
