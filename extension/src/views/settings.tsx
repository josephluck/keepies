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
          Setup an integration with GitHub to automatically backup captures to a
          git repository.
        </TertiaryTextWithSpace>
        <BoldTertiaryText>
          {gitHubAuthenticationToken && chosenGitHubSyncRepo ? (
            <>
              Keepies is currently syncing captures to
              <a href={chosenGitHubSyncRepo.html_url} target="_blank">
                <RepoLabel>{chosenGitHubSyncRepo.name}</RepoLabel>
              </a>
              in directory
              <a
                href={`${chosenGitHubSyncRepo.html_url}/tree/${
                  chosenGitHubSyncRepo.default_branch
                }/${gitHubDirectoryName}`}
                target="_blank"
              >
                <RepoLabel>{gitHubDirectoryName}</RepoLabel>
              </a>
            </>
          ) : gitHubAuthenticationToken ? (
            'You have given Keepies access to GitHub but you haven\'t chosen a repository to sync with yet. Please visit the "Settings" menu above to complete the set up.'
          ) : (
            "You haven't set up an integration with GitHub yet."
          )}
        </BoldTertiaryText>
      </SettingsListItem>
      <SettingsListItem>
        <SettingsHeadingWrap>
          <Heading1>Automatic download</Heading1>
          <ActionLink>Change</ActionLink>
        </SettingsHeadingWrap>
        <TertiaryTextWithSpace>
          Choose whether Keepies should automatically download captures to your
          computer.
        </TertiaryTextWithSpace>
        <BoldTertiaryText>
          Keepies is automatically downloading captures.
        </BoldTertiaryText>
      </SettingsListItem>
      <SettingsListItem>
        <SettingsHeadingWrap>
          <Heading1>Capture interval</Heading1>
          <ActionLink>Change</ActionLink>
        </SettingsHeadingWrap>
        <TertiaryTextWithSpace>
          Set the time interval between captures.
        </TertiaryTextWithSpace>
        <BoldTertiaryText>
          Your capture interval is set to 30 minutes.
        </BoldTertiaryText>
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
      <SettingsListItem>
        <TertiaryText style={{ margin: "0 auto" }}>
          Keepies is made with 🍕 and ❤️ by{" "}
          <a href="http://josephluck.co.uk" target="_blank">
            Joseph Luck
          </a>
          .
        </TertiaryText>
      </SettingsListItem>
    </>
  );
}
