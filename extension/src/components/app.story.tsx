import * as React from "react";
import { App } from "./app";
import { StoriesOf } from "../types";
import { Fixtures } from "../api/fixtures";

export default function button(s: StoriesOf) {
  s("App", module).add("default", () => {
    return <App app={Fixtures.app()} />;
  });
}
