import * as React from "react";
import { App } from "./app";
import { StoriesOf } from "../types";
import { Fixtures } from "../api/fixtures";
import { AddNew } from "./add-new";

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
    })
    .add("list", () => {
      return (
        <>
          <App app={Fixtures.app()} />
          <App app={Fixtures.app()} />
          <App app={Fixtures.app()} />
          <App
            app={Fixtures.app({
              icon:
                "https://cdn4.iconfinder.com/data/icons/various-icons-2/476/Spotify.png",
              name: "Spotify",
              origin: "https://spotify.com"
            })}
          />
          <App app={Fixtures.app()} />
        </>
      );
    })
    .add("list with form at bottom", () => {
      return (
        <>
          <App app={Fixtures.app()} />
          <App app={Fixtures.app()} />
          <App app={Fixtures.app()} />
          <App
            app={Fixtures.app({
              icon:
                "https://cdn4.iconfinder.com/data/icons/various-icons-2/476/Spotify.png",
              name: "Spotify",
              origin: "https://spotify.com"
            })}
          />
          <App app={Fixtures.app()} />
          <AddNew onSubmit={console.log} alreadyAdded={false} />
        </>
      );
    })
    .add("list with form already added at bottom", () => {
      return (
        <>
          <App app={Fixtures.app()} />
          <App app={Fixtures.app()} />
          <App app={Fixtures.app()} />
          <App
            app={Fixtures.app({
              icon:
                "https://cdn4.iconfinder.com/data/icons/various-icons-2/476/Spotify.png",
              name: "Spotify",
              origin: "https://spotify.com"
            })}
          />
          <App app={Fixtures.app()} />
          <AddNew onSubmit={console.log} alreadyAdded={true} />
        </>
      );
    });
}
