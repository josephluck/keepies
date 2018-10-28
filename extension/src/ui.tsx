import * as React from "react";
import helix, { Helix } from "helix-js";
import renderer from "helix-js/lib/renderers/react";
import { Settings, getSettings, App, removeApp, storeApp } from "./settings";
import { getCurrentTab, requestKeepie } from "./keepie";
import * as urlParse from "url-parse";
import { messageActiveTabChanged } from "./messages";

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
  takeKeepie: Helix.Effect0<State, Actions>;
  onActiveTabChanged: Helix.Effect0<State, Actions>;
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
        storeApp(tab.url)
          .then(actions.syncSettings)
          .then(requestKeepie);
      },
      removeApp(_state, actions, app) {
        removeApp(app).then(actions.syncSettings);
      },
      takeKeepie(_state, _actions) {
        requestKeepie();
      },
      async onActiveTabChanged(_state, actions) {
        const tab = await getCurrentTab();
        actions.setCurrentTab(tab);
      }
    }
  };
}

const component: Helix.Component<State, Actions> = (state, _, actions) => {
  const currentOrigin = state.tab ? urlParse(state.tab.url).origin : "";
  const appIsInStoredApps = state.settings
    ? !!state.settings.apps.find(app => app.origin === currentOrigin)
    : false;
  return (
    <div>
      {appIsInStoredApps ? (
        <button onClick={actions.takeKeepie}>Take a Keepie</button>
      ) : (
        <button onClick={actions.addApp}>
          Take Keepies of {currentOrigin}
        </button>
      )}
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <code>{JSON.stringify(state)}</code>
    </div>
  );
};

const mount = document.createElement("div");
document.body.appendChild(mount);

getSettings().then(async settings => {
  const app = helix<State, Actions>({
    model: model(settings),
    component,
    render: renderer(mount)
  });

  app.actions.onActiveTabChanged();
  chrome.runtime.onMessage.addListener(async message => {
    if (message.type === messageActiveTabChanged().name) {
      app.actions.onActiveTabChanged();
    }
  });
});
