import * as React from "react";
import helix, { Helix } from "helix-js";
import renderer from "helix-js/lib/renderers/react";
import {
  getSettings,
  removeApp,
  storeApp,
  authenticateWithGitHub
} from "./api/sdk";
import { getCurrentTab, requestKeepie } from "./keepie";
import { messageActiveTabChanged, messageKeepieMade } from "./messages";
import { GlobalStyles, theme } from "./components/theme";
import { Models } from "./api/models";
import { Collapse } from "react-collapse";
import styled from "styled-components";
import { Heading } from "./views/heading";
import { Apps } from "./views/apps";
import { Settings } from "./views/settings";

const Extension = styled.div`
  width: ${theme.size.extension};
`;

type Views = "apps" | "settings";

export interface State {
  settings: null | Models.Settings;
  tab: null | chrome.tabs.Tab;
  view: Views;
}

interface Reducers {
  storeSettings: Helix.Reducer<State, Models.Settings>;
  setCurrentTab: Helix.Reducer<State, chrome.tabs.Tab>;
  setView: Helix.Reducer<State, Views>;
}

interface Effects {
  syncSettings: Helix.Effect0<State, Actions>;
  addApp: Helix.Effect<State, Actions, { name: string }>;
  removeApp: Helix.Effect<State, Actions, Models.App>;
  takeKeepie: Helix.Effect0<State, Actions>;
  onActiveTabChanged: Helix.Effect0<State, Actions>;
  startGitHubAuth: Helix.Effect0<State, Actions>;
  syncGithubRepositories: Helix.Effect0<State, Actions>;
}

export type Actions = Helix.Actions<Reducers, Effects>;

function model(
  settings: Models.Settings
): Helix.Model<State, Reducers, Effects> {
  return {
    state: {
      settings,
      tab: null,
      view: "apps"
    },
    reducers: {
      storeSettings: (state, settings) => ({ ...state, settings }),
      setCurrentTab: (state, tab) => ({ ...state, tab }),
      setView: (state, view) => ({ ...state, view })
    },
    effects: {
      syncSettings(_state, actions) {
        getSettings()
          .then(actions.storeSettings)
          .then(actions.syncGithubRepositories);
      },
      addApp(_state, actions, { name }) {
        getCurrentTab().then(tab =>
          storeApp({ origin: tab.url, icon: tab.favIconUrl, name }).then(
            actions.syncSettings
          )
        );
      },
      removeApp(_state, actions, app) {
        removeApp(app).then(actions.syncSettings);
      },
      takeKeepie(_state, _actions) {
        requestKeepie();
      },
      onActiveTabChanged(_state, actions) {
        getCurrentTab().then(actions.setCurrentTab);
      },
      startGitHubAuth(_state, actions) {
        authenticateWithGitHub().then(actions.syncSettings);
      },
      syncGithubRepositories(state, actions) {
        if (state.settings.gitHubToken) {
        } else {
          console.log("No github token");
        }
      }
    }
  };
}

const component: Helix.Component<State, Actions> = (state, _, actions) => {
  return (
    <Extension>
      <GlobalStyles />
      <Heading state={state} actions={actions} />
      <Collapse isOpened>
        {state.view === "apps" && state.settings ? (
          <Apps state={state} actions={actions} />
        ) : state.view === "settings" ? (
          <Settings state={state} actions={actions} />
        ) : null}
      </Collapse>
      {chrome.runtime.id}
      {JSON.stringify(state.settings)}
    </Extension>
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
    if (message && message.name) {
      if (message.name === messageActiveTabChanged().name) {
        console.log("UI received active tab changed message");
        app.actions.onActiveTabChanged();
      }

      if (message.name === messageKeepieMade().name) {
        console.log("UI received keepie made message");
        app.actions.syncSettings();
      }
    }
  });
});
