import * as React from "react";
import { PrimaryButton, SecondaryButton } from "./button";
import { StoriesOf } from "../types";

export default function button(s: StoriesOf) {
  s("Button", module)
    .add("primary", () => {
      return <PrimaryButton>Primary Button</PrimaryButton>;
    })
    .add("secondary", () => {
      return <SecondaryButton>Secondary Button</SecondaryButton>;
    });
}
