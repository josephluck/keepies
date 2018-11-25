import * as React from "react";
import helix, { Helix } from "helix-js";
import renderer from "helix-js/lib/renderers/react";
import {
  getSettings,
  removeApp,
  storeApp,
  authenticateWithGitHub,
  getGitHubRepositories,
  storeChosenGitHubRepository
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
import { GitHubSettings } from "./views/github-settings";

const Extension = styled.div`
  width: ${theme.size.extension};
`;

type Views = "apps" | "settings" | "gitHubSettings";
type LoadingKeys = "gitHubRepositories" | "gitHubAuthentication";

export interface State {
  settings: null | Models.Settings;
  tab: null | chrome.tabs.Tab;
  view: Views;
  gitHubRepositories: Models.Repository[];
  loading: Record<LoadingKeys, boolean>;
}

interface Reducers {
  storeSettings: Helix.Reducer<State, Models.Settings>;
  setCurrentTab: Helix.Reducer<State, chrome.tabs.Tab>;
  setView: Helix.Reducer<State, Views>;
  storeGitHubRepositories: Helix.Reducer<State, Models.Repository[]>;
  setLoading: Helix.Reducer<State, { key: LoadingKeys; isLoading: boolean }>;
}

interface Effects {
  syncSettings: Helix.Effect0<State, Actions>;
  addApp: Helix.Effect<State, Actions, { name: string }>;
  removeApp: Helix.Effect<State, Actions, Models.App>;
  takeKeepie: Helix.Effect0<State, Actions>;
  onActiveTabChanged: Helix.Effect0<State, Actions>;
  startGitHubAuth: Helix.Effect0<State, Actions>;
  syncGithubRepositories: Helix.Effect0<State, Actions>;
  goToView: Helix.Effect<State, Actions, Views>;
  storeChosenGitHubRepository: Helix.Effect<State, Actions, number>;
}

export type Actions = Helix.Actions<Reducers, Effects>;

function model(
  settings: Models.Settings
): Helix.Model<State, Reducers, Effects> {
  return {
    state: {
      settings,
      tab: null,
      view: "apps",
      gitHubRepositories: [],
      loading: {
        gitHubRepositories: false,
        gitHubAuthentication: false
      }
    },
    reducers: {
      storeSettings: (state, settings) => ({ ...state, settings }),
      setCurrentTab: (state, tab) => ({ ...state, tab }),
      setView: (state, view) => ({ ...state, view }),
      storeGitHubRepositories: (state, gitHubRepositories) => ({
        ...state,
        gitHubRepositories
      }),
      setLoading: (state, { key, isLoading }) => ({
        ...state,
        loading: {
          ...state.loading,
          [key]: isLoading
        }
      })
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
        actions.setLoading({ key: "gitHubAuthentication", isLoading: true });
        authenticateWithGitHub()
          .then(actions.syncSettings)
          .then(actions.syncGithubRepositories)
          .then(() => {
            actions.setLoading({
              key: "gitHubAuthentication",
              isLoading: false
            });
            actions.setView("gitHubSettings");
          });
      },
      goToView(state, actions, view) {
        actions.setView(view);
        if (
          view === "gitHubSettings" &&
          state.settings.gitHubAuthenticationToken
        ) {
          actions.syncGithubRepositories();
        }
      },
      syncGithubRepositories(state, actions) {
        if (state.settings.gitHubAuthenticationToken) {
          actions.setLoading({ key: "gitHubRepositories", isLoading: true });
          getGitHubRepositories()
            .then(actions.storeGitHubRepositories)
            .then(() => {
              actions.setLoading({
                key: "gitHubRepositories",
                isLoading: false
              });
            });
        } else {
          console.log("No github token");
        }
      },
      storeChosenGitHubRepository(state, actions, repositoryId) {
        const repository = state.gitHubRepositories.find(
          repo => repo.id === repositoryId
        );
        console.log({ repository });
        storeChosenGitHubRepository(repository)
          .then(actions.syncSettings)
          .then(() => actions.setView("settings"));
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
        ) : state.view === "gitHubSettings" ? (
          <GitHubSettings state={state} actions={actions} />
        ) : null}
      </Collapse>
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
