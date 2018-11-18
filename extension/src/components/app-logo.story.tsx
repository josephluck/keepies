import * as React from "react";
import { AppLogo } from "./app-logo";
import { StoriesOf } from "../types";
import { Fixtures } from "../api/fixtures";
import { addSeconds } from "date-fns";

export default function button(s: StoriesOf) {
  s("AppLogo", module)
    .add("default", () => {
      return <AppLogo app={Fixtures.app()} />;
    })
    .add("0% progress", () => {
      return (
        <AppLogo
          app={Fixtures.app({
            lastKeepieOn: Date.now(),
            nextKeepieDue: addSeconds(new Date(), 10).getTime()
          })}
        />
      );
    })
    .add("10% progress", () => {
      return (
        <AppLogo
          app={Fixtures.app({
            lastKeepieOn: addSeconds(new Date(), -1).getTime(),
            nextKeepieDue: addSeconds(new Date(), 9).getTime()
          })}
        />
      );
    })
    .add("20% progress", () => {
      return (
        <AppLogo
          app={Fixtures.app({
            lastKeepieOn: addSeconds(new Date(), -2).getTime(),
            nextKeepieDue: addSeconds(new Date(), 8).getTime()
          })}
        />
      );
    })
    .add("50% progress", () => {
      return (
        <AppLogo
          app={Fixtures.app({
            lastKeepieOn: addSeconds(new Date(), -5).getTime(),
            nextKeepieDue: addSeconds(new Date(), 5).getTime()
          })}
        />
      );
    })
    .add("90% progress", () => {
      return (
        <AppLogo
          app={Fixtures.app({
            lastKeepieOn: addSeconds(new Date(), -9).getTime(),
            nextKeepieDue: addSeconds(new Date(), 1).getTime()
          })}
        />
      );
    });
}
