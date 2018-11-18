import * as React from "react";
import styled from "styled-components";
import { Models } from "../api/models";
import { theme } from "./theme";
import { ActionLink } from "./action-link";
import { AppLogo } from "./app-logo";

const Wrapper = styled.div`
  border-bottom: solid 1px ${theme.colors.border};
  padding: ${theme.spacing._16} ${theme.spacing._20};
  display: flex;
  align-items: center;
`;

const AppName = styled.span`
  margin-right: ${theme.spacing._36};
  font-size: ${theme.font._16.size};
  line-height: ${theme.font._16.lineHeight};
  font-weight: ${theme.fontWeight._500};
  flex: 1;
`;

const AppOrigin = styled.div`
  font-weight: ${theme.fontWeight._400};
  font-size: ${theme.font._12.size};
  line-height: ${theme.font._12.lineHeight};
  color: ${theme.colors.disabledLinkText};
  margin-top: ${theme.spacing._4};
  opacity: 0.8;
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
    <Wrapper>
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
    </Wrapper>
  );
}
