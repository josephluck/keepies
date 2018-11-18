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
import { Box } from "@rebass/grid";
import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Extension = styled.div`
  width: ${theme.size.extension};
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing._10} ${theme.spacing._20};
  border-bottom: solid 1px ${theme.colors.border};
`;

const HeadingIconsWrap = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  cursor: pointer;
`;

const IconWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeadingIcon = styled.div<{ inView: boolean }>`
  font-size: ${theme.font._16.size};
  line-height: ${theme.font._16.size};
  color: ${theme.colors.link};
  position: relative;
  transition: all 333ms ease;
  transform: translateY(${props => (props.inView ? "0%" : "-50%")});
  opacity: ${props => (props.inView ? 1 : 0)};
`;

const CloseIcon = styled(HeadingIcon)`
  position: absolute;
  top: 0;
  color: ${theme.colors.disabledLinkText};
  transform: translateY(${props => (props.inView ? "0%" : "50%")});
`;

type Views = "apps" | "settings";

interface State {
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
}

type Actions = Helix.Actions<Reducers, Effects>;

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
        getSettings().then(actions.storeSettings);
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
      <Heading>
        <Box flex={1} />
        <LogoWrap>
          <Logo>Keepies</Logo>
        </LogoWrap>
        <HeadingIconsWrap
          onClick={() =>
            actions.setView(state.view === "apps" ? "settings" : "apps")
          }
        >
          <IconWrap>
            <HeadingIcon inView={state.view === "apps"}>
              <FontAwesomeIcon icon={faCog} />
            </HeadingIcon>
            <CloseIcon inView={state.view === "settings"}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseIcon>
          </IconWrap>
        </HeadingIconsWrap>
      </Heading>
      <Collapse isOpened>
        {state.view === "apps" && state.settings ? (
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
        ) : state.view === "settings" ? (
          <div>Settings</div>
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
