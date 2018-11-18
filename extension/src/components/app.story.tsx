import * as React from "react";
import { App } from "./app";
import { StoriesOf } from "../types";
import { Fixtures } from "../api/fixtures";
import { AddNew } from "./add-new";

export default function button(s: StoriesOf) {
  s("App", module)
    .add("default", () => {
      return (
        <App
          onRemove={console.log}
          onLogoClick={console.log}
          disableOnLogoClick={false}
          app={Fixtures.app()}
        />
      );
    })
    .add("without image", () => {
      return (
        <App
          onRemove={console.log}
          onLogoClick={console.log}
          disableOnLogoClick={false}
          app={Fixtures.app({ icon: null })}
        />
      );
    })
    .add("disabled on logo click", () => {
      return (
        <App
          onRemove={console.log}
          onLogoClick={console.log}
          disableOnLogoClick={true}
          app={Fixtures.app()}
        />
      );
    })
    .add("spotify", () => {
      return (
        <App
          onRemove={console.log}
          onLogoClick={console.log}
          disableOnLogoClick={false}
          app={Fixtures.app({
            icon:
              "https://cdn4.iconfinder.com/data/icons/various-icons-2/476/Spotify.png",
            name: "Spotify",
            origin: "https://spotify.com"
          })}
        />
      );
    })
    .add("codepen", () => {
      return (
        <App
          onRemove={console.log}
          onLogoClick={console.log}
          disableOnLogoClick={false}
          app={Fixtures.app({
            icon: "http://cdn.onlinewebfonts.com/svg/img_424372.png",
            name: "Codepen",
            origin: "https://codepen.io"
          })}
        />
      );
    })
    .add("list", () => {
      return (
        <>
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app({
              icon: "http://cdn.onlinewebfonts.com/svg/img_424372.png",
              name: "Codepen",
              origin: "https://codepen.io"
            })}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app({
              icon:
                "https://cdn4.iconfinder.com/data/icons/various-icons-2/476/Spotify.png",
              name: "Spotify",
              origin: "https://spotify.com"
            })}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
        </>
      );
    })
    .add("list with form at bottom", () => {
      return (
        <>
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app({
              icon:
                "https://cdn4.iconfinder.com/data/icons/various-icons-2/476/Spotify.png",
              name: "Spotify",
              origin: "https://spotify.com"
            })}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
          <AddNew onSubmit={console.log} alreadyAdded={false} />
        </>
      );
    })
    .add("list with form already added at bottom", () => {
      return (
        <>
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app({
              icon:
                "https://cdn4.iconfinder.com/data/icons/various-icons-2/476/Spotify.png",
              name: "Spotify",
              origin: "https://spotify.com"
            })}
          />
          <App
            onRemove={console.log}
            onLogoClick={console.log}
            disableOnLogoClick={false}
            app={Fixtures.app()}
          />
          <AddNew onSubmit={console.log} alreadyAdded={true} />
        </>
      );
    });
}
