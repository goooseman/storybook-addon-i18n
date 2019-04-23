import { Channel } from "@storybook/channels";
import * as React from "react";
import { ADDON_ID, Parameters } from "./shared";

interface Props extends Parameters {
  channel: Channel;
}

interface State {
  activeLocale?: string;
}

class Provider extends React.Component<Props, State> {
  public state: State = {};

  public componentWillMount() {
    const { channel } = this.props;
    channel.on(`${ADDON_ID}/change`, this.onChanged);
  }
  public componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener(`${ADDON_ID}/change`, this.onChanged);
  }

  public render() {
    const {
      provider,
      providerProps,
      providerLocaleKey = "locale",
      providerDirectionKey = "direction",
      getDirection,
      children
    } = this.props;
    const { activeLocale } = this.state;
    const direction = getDirection
      ? getDirection(activeLocale)
      : this.getDirection(activeLocale);

    if (!activeLocale) {
      return false;
    }

    return React.createElement(
      "div",
      {
        dir: direction
      },
      React.createElement(
        provider,
        {
          ...providerProps,
          [providerLocaleKey]: activeLocale,
          [providerDirectionKey]: direction
        },
        children
      )
    );
  }

  private getDirection = (locale: string): "ltr" | "rtl" => {
    const rtlLocales = ["he", "ar"];
    if (rtlLocales.includes(locale)) {
      return "rtl";
    }
    return "ltr";
  };

  private onChanged = (locale: string) => {
    this.setState({
      activeLocale: locale
    });
  };
}

export default Provider;
