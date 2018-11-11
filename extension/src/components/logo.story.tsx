import * as React from "react";
import { Logo, LogoWrap, Icon } from "./logo";
import { StoriesOf } from "../types";

export default function button(s: StoriesOf) {
  s("Logo", module)
    .add("default", () => {
      return (
        <LogoWrap>
          <Logo>Keepies</Logo>
        </LogoWrap>
      );
    })
    .add("icons at all sizes", () => {
      return (
        <div style={{ padding: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
            <Icon size="large" />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Icon size="medium" />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Icon size="small" />
          </div>
        </div>
      );
    })
    .add("icon large", () => {
      return <Icon size="large" />;
    })
    .add("icon medium", () => {
      return <Icon size="medium" />;
    })
    .add("icon small", () => {
      return <Icon size="small" />;
    });
}
