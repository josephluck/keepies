import * as React from "react";
import { App } from "./app";
import { StoriesOf } from "../types";
import { Fixtures } from "../api/fixtures";

export default function button(s: StoriesOf) {
  s("App", module)
    .add("default", () => {
      return <App app={Fixtures.app()} />;
    })
    .add("without image", () => {
      return <App app={Fixtures.app({ icon: null })} />;
    })
    .add("spotify", () => {
      return (
        <App
          app={Fixtures.app({
            icon:
              "https://cdn4.iconfinder.com/data/icons/various-icons-2/476/Spotify.png",
            name: "Spotify",
            origin: "https://spotify.com"
          })}
        />
      );
    });
}
