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
    .add("icon", () => {
      return (
        <div style={{ padding: "100px" }}>
          <Icon />
        </div>
      );
    });
}
