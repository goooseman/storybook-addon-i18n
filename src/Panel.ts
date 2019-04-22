import * as React from "react";
import { API } from "./shared";

interface Props {
  active: boolean;
  api: API;
}

export default class Panel extends React.Component<Props> {}
