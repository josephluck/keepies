import * as React from "react";
import { Logo, LogoWrap } from "./logo";
import { StoriesOf } from "../types";

export default function button(s: StoriesOf) {
  s("Logo", module).add("default", () => {
    return (
      <LogoWrap>
        <Logo>Keepies</Logo>
      </LogoWrap>
    );
  });
}
