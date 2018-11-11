import * as React from "react";
import styled from "styled-components";
import { Models } from "../api/models";
import { theme } from "./theme";
import { ActionLink } from "./action-link";

const Wrapper = styled.div`
  border-bottom: solid 1px ${theme.colors.border};
  padding: ${theme.spacing._16} ${theme.spacing._20};
  display: flex;
  align-items: center;
`;

const AppIcon = styled.div`
  width: ${theme.size.appIcon};
  height: ${theme.size.appIcon};
  margin-right: ${theme.spacing._16};
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  flex: 0 0 auto;
  position: relative;
`;

const AppName = styled.span`
  margin-right: ${theme.spacing._36};
  font-size: ${theme.font._16.size};
  line-height: ${theme.font._16.lineHeight};
  font-weight: ${theme.fontWeight._500};
  flex: 1;
`;

const AppInitials = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.font._12.size};
  line-height: ${theme.font._12.lineHeight};
  color: ${theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  onRemove
}: {
  app: Models.App;
  onRemove: () => any;
}) {
  const initials = `${app.name.charAt(0)}${app.name.charAt(1)}`;
  const iconStyle: React.CSSProperties = app.icon
    ? { backgroundImage: `url(${app.icon})` }
    : {
        background: theme.colors.avatarGradient,
        borderRadius: theme.borderRadius.circle
      };
  return (
    <Wrapper>
      <AppIcon style={iconStyle}>
        {!app.icon ? <AppInitials>{initials}</AppInitials> : null}
      </AppIcon>
      <Labels>
        <AppName>{app.name}</AppName>
        <AppOrigin>{app.origin}</AppOrigin>
      </Labels>
      <ActionLink onClick={onRemove}>Remove</ActionLink>
    </Wrapper>
  );
}
