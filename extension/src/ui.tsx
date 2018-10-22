import * as React from "react";
import helix, { Helix } from "helix-js";
import renderer from "helix-js/lib/renderers/react";
import { Settings, getSettings, setSetting, App } from "./settings";
import { getCurrentTab } from "./capture";

interface State {
  settings: null | Settings;
  tab: null | chrome.tabs.Tab;
}
interface Reducers {
  storeSettings: Helix.Reducer<State, Settings>;
  setCurrentTab: Helix.Reducer<State, chrome.tabs.Tab>;
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
      settings,
      tab: null
    },
    reducers: {
      storeSettings: (state, settings) => ({ ...state, settings }),
      setCurrentTab: (state, tab) => ({ ...state, tab })
    },
    effects: {
      syncSettings(_state, actions) {
        getSettings().then(actions.storeSettings);
      },
      async addApp(state, actions) {
        const tab = await getCurrentTab();
        const app: App = {
          url: tab.url
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
  return (
    <div>
      <button onClick={actions.addApp}>Add current site</button>
      {state.settings ? (
        <>
          {state.settings.apps.map(app => (
            <div key={app.url}>
              {app.url}{" "}
              <button onClick={() => actions.removeApp(app)}>x</button>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

const mount = document.createElement("div");
document.body.appendChild(mount);

getSettings().then(settings => {
  const app = helix<State, Actions>({
    model: model(settings),
    component,
    render: renderer(mount)
  });
  chrome.tabs.onUpdated.addListener((_, __, tab) => {
    app.actions.setCurrentTab(tab);
  });
});
