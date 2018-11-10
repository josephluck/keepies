import * as React from "react";
import helix, { Helix } from "helix-js";
import renderer from "helix-js/lib/renderers/react";
import { getSettings, removeApp, storeApp } from "./api/sdk";
import { getCurrentTab, requestKeepie } from "./keepie";
import * as urlParse from "url-parse";
import { messageActiveTabChanged } from "./messages";
import {
  PrimaryButton,
  SecondaryButton,
  UnstyledButton
} from "./components/button";
import { GlobalStyles } from "./components/theme";
import { Flex, Box } from "@rebass/grid";
import { Models } from "./api/models";

interface State {
  settings: null | Models.Settings;
  tab: null | chrome.tabs.Tab;
}
interface Reducers {
  storeSettings: Helix.Reducer<State, Models.Settings>;
  setCurrentTab: Helix.Reducer<State, chrome.tabs.Tab>;
}
interface Effects {
  syncSettings: Helix.Effect0<State, Actions>;
  addApp: Helix.Effect<State, Actions, { name: string }>;
  removeApp: Helix.Effect<State, Actions, Models.App>;
  takeKeepie: Helix.Effect0<State, Actions>;
  onActiveTabChanged: Helix.Effect0<State, Actions>;
}

type Actions = Helix.Actions<Reducers, Effects>;

function model(
  settings: Models.Settings
): Helix.Model<State, Reducers, Effects> {
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
      async addApp(_state, actions, { name }) {
        const tab = await getCurrentTab();
        storeApp({ origin: tab.url, icon: tab.favIconUrl, name })
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
      <GlobalStyles />
      {appIsInStoredApps ? (
        <PrimaryButton onClick={actions.takeKeepie}>
          Take a Keepie now
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={() => actions.addApp({ name: "Todo" })}>
          Take keepies of this site
        </PrimaryButton>
      )}
      {state.settings ? (
        <>
          {state.settings.apps.map(app => (
            <Flex alignItems="center" key={app.origin}>
              <Box flex={1}>{app.origin}</Box>
              <UnstyledButton onClick={() => actions.removeApp(app)}>
                X
              </UnstyledButton>
            </Flex>
          ))}
        </>
      ) : null}
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
