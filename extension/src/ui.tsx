import * as React from "react";
import helix, { Helix } from "helix-js";
import renderer from "helix-js/lib/renderers/react";
import { getSettings, removeApp, storeApp } from "./api/sdk";
import { getCurrentTab, requestKeepie } from "./keepie";
import * as urlParse from "url-parse";
import { messageActiveTabChanged, messageKeepieMade } from "./messages";
import { GlobalStyles, theme } from "./components/theme";
import { Models } from "./api/models";
import { App } from "./components/app";
import { AddNew } from "./components/add-new";
import { Logo, LogoWrap } from "./components/logo";
import { Collapse } from "react-collapse";
import styled from "styled-components";

const Extension = styled.div`
  width: ${theme.size.extension};
`;

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
        storeApp({ origin: tab.url, icon: tab.favIconUrl, name }).then(
          actions.syncSettings
        );
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
  const alreadyAddedCurrentTab = state.settings
    ? !!state.settings.apps.find(app => app.origin === currentOrigin)
    : false;

  return (
    <Extension>
      <GlobalStyles />
      <LogoWrap>
        <Logo>Keepies</Logo>
      </LogoWrap>
      {state.settings ? (
        <Collapse isOpened>
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
        </Collapse>
      ) : null}
      <AddNew
        onSubmit={values => actions.addApp({ name: values.name })}
        alreadyAdded={alreadyAddedCurrentTab}
      />
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
