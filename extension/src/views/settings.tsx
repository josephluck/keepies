import * as React from "react";
import { State, Actions } from "../ui";
import { AppIcon } from "../components/app-logo";
import { ListItem } from "../components/list-item";
import styled from "styled-components";
import { theme } from "../components/theme";
import { Heading1, TertiaryText, CopyText } from "../components/typography";
import { ActionLink } from "../components/action-link";

const SettingsListItem = styled(ListItem)`
  flex-direction: column;
  align-items: flex-start;
`;

const SettingsHeadingWrap = styled.div`
  margin-bottom: ${theme.spacing._8};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TertiaryTextWithSpace = styled(TertiaryText)`
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
  console.log({ actions, state });
  return (
    <>
      <SettingsListItem>
        <SettingsHeadingWrap>
          <Heading1>GitHub</Heading1>
          <ActionLink>Setup</ActionLink>
        </SettingsHeadingWrap>
        <TertiaryTextWithSpace>
          Setup an integration with GitHub to automatically backup keepies to a
          git repository.
        </TertiaryTextWithSpace>
        <CopyText>You haven't set up an integration with GitHub yet.</CopyText>
      </SettingsListItem>
      <SettingsListItem>
        <SettingsHeadingWrap>
          <Heading1>Keepie Interval</Heading1>
          <ActionLink>Change</ActionLink>
        </SettingsHeadingWrap>
        <TertiaryTextWithSpace>
          Set the time interval between screenshots.
        </TertiaryTextWithSpace>
        <CopyText>
          Your interval is set to <CopyText>30 minutes</CopyText>.
        </CopyText>
      </SettingsListItem>
    </>
  );
}
