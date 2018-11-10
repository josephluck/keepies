import * as React from "react";
import { AddNew } from "./add-new";
import { StoriesOf } from "../types";

export default function button(s: StoriesOf) {
  s("AddNew", module)
    .add("default", () => {
      return <AddNew onSubmit={console.log} alreadyAdded={false} />;
    })
    .add("already added", () => {
      return <AddNew onSubmit={console.log} alreadyAdded={true} />;
    });
}
