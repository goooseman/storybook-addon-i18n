import { API } from "@storybook/api";
import {
  IconButton,
  Icons,
  TooltipLinkList,
  WithTooltip
} from "@storybook/components";
import * as React from "react";
import { ADDON_ID, Parameters } from "./shared";

interface Props {
  api: API;
}

interface State {
  locales: string[];
  activeLocale?: string;
  expanded: boolean;
}

export default class LocaleSelector extends React.Component<Props, State> {
  public state: State = {
    locales: [],
    expanded: false
  };

  public componentDidMount() {
    const { api } = this.props;
    api.on(`${ADDON_ID}/register`, this.onRegister);
  }
  public componentWillUnmount() {
    const { api } = this.props;
    api.off(`${ADDON_ID}/register`, this.onRegister);
  }

  public render() {
    return this.renderLocaleSelector();
  }

  private renderLocaleSelector = () => {
    const { locales, activeLocale, expanded } = this.state;
    const defaultLocale = this.getDefaultLocale(locales);
    const links = this.getLinks(locales);

    if (!activeLocale) {
      return false;
    }
    return (
      <WithTooltip
        placement="top"
        trigger="click"
        tooltipShown={expanded}
        onVisibilityChange={this.handleVisibilityChange}
        tooltip={<TooltipLinkList links={links} />}
        closeOnClick
      >
        <IconButton
          key="background"
          active={activeLocale !== defaultLocale}
          title="Change the locale of the preview"
        >
          <Icons icon="globe" />
        </IconButton>
      </WithTooltip>
    );
  };

  private getLinks = (locales: string[]) => {
    return locales.map(l => ({
      id: l,
      title: l,
      value: l,
      // next line fixes stupid storybook error passing loading=false to span el
      loading: null,
      onClick: this.getOnLinkSelected(l)
    }));
  };

  private getOnLinkSelected = (locale: string) => () => {
    this.setState({
      expanded: false
    });
    this.changeLocale(locale);
  };

  private handleVisibilityChange = (newVisibility: boolean) => {
    this.setState({ expanded: newVisibility });
  };

  private getDefaultLocale = (locales: string[]) => {
    return locales[0];
  };

  private onRegister = (parameters: Parameters) => {
    const defaultLocale = this.getDefaultLocale(parameters.supportedLocales);
    this.setState({
      locales: parameters.supportedLocales
    });
    this.changeLocale(defaultLocale);
  };

  private changeLocale = (locale: string) => {
    const { api } = this.props;
    this.setState({
      activeLocale: locale
    });
    api.emit(`${ADDON_ID}/change`, locale);
    api.setQueryParams({ activeLocale: locale });
  };
}
