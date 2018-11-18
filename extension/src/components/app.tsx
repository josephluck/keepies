import * as React from "react";
import styled from "styled-components";
import { Models } from "../api/models";
import { theme } from "./theme";
import { ActionLink } from "./action-link";
import { AppLogo } from "./app-logo";
import { ListItem } from "./list-item";
import { Heading1, TertiaryText } from "./typography";

const AppName = styled(Heading1)`
  margin-right: ${theme.spacing._36};
  flex: 1;
`;

const AppOrigin = styled(TertiaryText)`
  margin-top: ${theme.spacing._4};
`;

const Labels = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export function App({
  app,
  onRemove,
  onLogoClick,
  disableOnLogoClick
}: {
  app: Models.App;
  onRemove: () => any;
  onLogoClick: () => any;
  disableOnLogoClick: boolean;
}) {
  return (
    <ListItem>
      <AppLogo
        app={app}
        onClick={onLogoClick}
        disableOnClick={disableOnLogoClick}
      />
      <Labels>
        <AppName>{app.name}</AppName>
        <AppOrigin>{app.origin}</AppOrigin>
      </Labels>
      <ActionLink onClick={onRemove}>Remove</ActionLink>
    </ListItem>
  );
}
