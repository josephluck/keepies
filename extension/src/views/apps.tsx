import * as React from "react";
import { State, Actions } from "../ui";
import * as urlParse from "url-parse";
import { AddNew } from "../components/add-new";
import { App } from "../components/app";

export function Apps({ actions, state }: { actions: Actions; state: State }) {
  const currentOrigin = state.tab ? urlParse(state.tab.url).origin : "";
  const alreadyAddedCurrentTab = state.settings
    ? !!state.settings.apps.find(app => app.origin === currentOrigin)
    : false;
  return (
    <>
      {state.settings.apps
        .sort(app => (app.origin === currentOrigin ? -1 : 1))
        .map(app => (
          <App
            app={app}
            onRemove={() => actions.removeApp(app)}
            onLogoClick={() => actions.takeKeepie()}
            disableOnLogoClick={currentOrigin !== app.origin}
            key={app.origin}
          />
        ))}
      <AddNew
        onSubmit={values => actions.addApp({ name: values.name })}
        alreadyAdded={alreadyAddedCurrentTab}
      />
    </>
  );
}
