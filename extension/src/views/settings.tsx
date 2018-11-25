import * as React from "react";
import { State, Actions } from "../ui";
import { AppIcon } from "../components/app-logo";
import { ListItem } from "../components/list-item";
import styled from "styled-components";
import { theme } from "../components/theme";
import {
  Heading1,
  TertiaryText,
  BoldTertiaryText
} from "../components/typography";
import { ActionLink, ActionAnchor } from "../components/action-link";
import { RepoLabel } from "../components/label";

const SettingsListItem = styled(ListItem)`
  flex-direction: column;
  align-items: flex-start;
`;

export const SettingsHeadingWrap = styled.div`
  margin-bottom: ${theme.spacing._8};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TertiaryTextWithSpace = styled(TertiaryText)`
  display: block;
  margin-bottom: ${theme.spacing._8};
`;

export function Settings({
  actions,
  state
}: {
  actions: Actions;
  state: State;
}) {
  const {
    gitHubAuthenticationToken,
    chosenGitHubSyncRepo,
    gitHubDirectoryName
  } = state.settings;
  return (
    <>
      <SettingsListItem>
        <SettingsHeadingWrap>
          <Heading1>GitHub</Heading1>
          {gitHubAuthenticationToken ? (
            <ActionLink onClick={() => actions.goToView("gitHubSettings")}>
              Settings
            </ActionLink>
          ) : (
            <ActionLink onClick={actions.startGitHubAuth}>Setup</ActionLink>
          )}
        </SettingsHeadingWrap>
        <TertiaryTextWithSpace>
          Setup an integration with GitHub to automatically backup keepies to a
          git repository.
        </TertiaryTextWithSpace>
        <BoldTertiaryText>
          {gitHubAuthenticationToken && chosenGitHubSyncRepo ? (
            <>
              Keepies is currently syncing to
              <RepoLabel>{chosenGitHubSyncRepo.name}</RepoLabel>
              in directory <RepoLabel>{gitHubDirectoryName}</RepoLabel>
            </>
          ) : gitHubAuthenticationToken ? (
            'You have given Keepies access to GitHub but you haven\'t chosen a GitHub repository to sync with yet. Choose one by visiting the "Settings" menu above.'
          ) : (
            "You haven't set up an integration with GitHub yet."
          )}
        </BoldTertiaryText>
      </SettingsListItem>
      <SettingsListItem>
        <SettingsHeadingWrap>
          <Heading1>Keepie interval</Heading1>
          <ActionLink>Change</ActionLink>
        </SettingsHeadingWrap>
        <TertiaryTextWithSpace>
          Set the time interval between screenshots.
        </TertiaryTextWithSpace>
        <BoldTertiaryText>Your interval is set to 30 minutes.</BoldTertiaryText>
      </SettingsListItem>
      <SettingsListItem>
        <SettingsHeadingWrap>
          <Heading1>Report an issue</Heading1>
          <ActionAnchor
            href="https://github.com/josephluck/keepies/issues/new"
            target="_blank"
          >
            Report
          </ActionAnchor>
        </SettingsHeadingWrap>
        <TertiaryText>
          If something isn't quite right or you think Keepies is missing
          something, please file an issue.
        </TertiaryText>
      </SettingsListItem>
    </>
  );
}
