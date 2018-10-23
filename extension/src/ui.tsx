import * as React from "react";
import helix, { Helix } from "helix-js";
import renderer from "helix-js/lib/renderers/react";
import { Settings, getSettings, App, removeApp, storeApp } from "./settings";
import { getCurrentTab } from "./capture";
import * as urlParse from "url-parse";

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
      async addApp(_state, actions) {
        const tab = await getCurrentTab();
        storeApp(tab.url).then(actions.syncSettings);
      },
      removeApp(_state, actions, app) {
        removeApp(app).then(actions.syncSettings);
      }
    }
  };
}

const component: Helix.Component<State, Actions> = (state, _, actions) => {
  const currentOrigin = state.tab ? urlParse(state.tab.url).origin : "";
  const appIsAlreadyAdded = state.settings
    ? !!state.settings.apps.find(app => app.origin === currentOrigin)
    : false;
  return (
    <div>
      {currentOrigin}
      <button onClick={actions.addApp} disabled={appIsAlreadyAdded}>
        Add current site
      </button>
      {state.settings ? (
        <>
          {state.settings.apps.map(app => (
            <div key={app.origin}>
              {app.origin}{" "}
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

  chrome.tabs.onActivated.addListener(async () => {
    const tab = await getCurrentTab();
    app.actions.setCurrentTab(tab);
  });
});
