import * as React from "react";
import helix, { Helix } from "helix-js";
import renderer from "helix-js/lib/renderers/react";
import {
  Settings,
  getSettings,
  setSetting,
  App,
  setupSettings
} from "./settings";

interface State {
  settings: null | Settings;
}
interface Reducers {
  storeSettings: Helix.Reducer<State, Settings>;
}
interface Effects {
  syncSettings: Helix.Effect0<State, Actions>;
  addApp: Helix.Effect0<State, Actions>;
  removeApp: Helix.Effect<State, Actions, App>;
}

type Actions = Helix.Actions<Reducers, Effects>;

function model(settings: Settings): Helix.Model<State, Reducers, Effects> {
  return {
    state: {
      settings
    },
    reducers: {
      storeSettings: (state, settings) => ({ ...state, settings })
    },
    effects: {
      syncSettings(_state, actions) {
        getSettings().then(actions.syncSettings);
      },
      addApp(state, actions) {
        const app: App = {
          url: window.location.origin
        };
        const apps = [...state.settings.apps, app];
        setSetting("apps", apps).then(actions.syncSettings);
      },
      removeApp(state, actions, app) {
        const apps = state.settings.apps.filter(({ url }) => url !== app.url);
        setSetting("apps", apps).then(actions.syncSettings);
      }
    }
  };
}

const component: Helix.Component<State, Actions> = (state, _, actions) => {
  const appIsEnabled =
    state.settings &&
    !!state.settings.apps.find(
      ({ url }) =>
        window.location.origin.includes(url) || window.location.origin === url
    );
  return (
    <div>
      <button onClick={actions.addApp} disabled={appIsEnabled}>
        Add current site
      </button>
      {state.settings ? (
        <>
          {state.settings.apps.map(app => (
            <div>
              {app.url} <button onClick={() => actions.removeApp(app)} />
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

const mount = document.createElement("div");
document.body.appendChild(mount);

setupSettings().then(settings => {
  helix<State, Actions>({
    model: model(settings),
    component,
    render: renderer(mount)
  });
});
