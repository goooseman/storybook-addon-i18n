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
    const { provider, providerProps, providerLocaleKey, children } = this.props;
    const { activeLocale } = this.state;

    if (!activeLocale) {
      return false;
    }
    return React.createElement(
      provider,
      {
        ...providerProps,
        [providerLocaleKey]: activeLocale
      },
      children
    );
  }

  private onChanged = (locale: string) => {
    this.setState({
      activeLocale: locale
    });
  };
}

export default Provider;
