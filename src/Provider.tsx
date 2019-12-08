import { Channel } from "@storybook/channels";
import * as api from "@storybook/client-api";
import * as React from "react";

import { ADDON_ID, Parameters, RTL_LOCALES } from "./shared";

interface Props extends Parameters {
  channel: Channel;
}

interface State {
  activeLocale?: string;
}

class Provider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { activeLocale = props.supportedLocales[0] } = api.getQueryParams();
    this.state = { activeLocale };

    props.channel.on(`${ADDON_ID}/change`, this.onChanged);
  }

  public componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener(`${ADDON_ID}/change`, this.onChanged);
  }

  public render() {
    const {
      provider: ProviderComponent,
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

    const props = {
      ...providerProps,
      [providerLocaleKey]: activeLocale,
      [providerDirectionKey]: direction
    };

    return (
      <div dir={direction}>
        <ProviderComponent {...props}>{children}</ProviderComponent>
      </div>
    );
  }

  private getDirection = (locale: string): "ltr" | "rtl" => {
    return RTL_LOCALES.includes(locale.toLowerCase()) ? "rtl" : "ltr";
  };

  private onChanged = (locale: string) => {
    this.setState({
      activeLocale: locale
    });
  };
}

export default Provider;
