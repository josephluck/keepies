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
  margin-right: ${theme.spacing._20};
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: ${theme.borderRadius.circle};
  overflow: hidden;
  flex: 0 0 auto;
  position: relative;
`;

const AppName = styled.span`
  margin-right: ${theme.spacing._20};
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

export function App({ app }: { app: Models.App }) {
  const initials = `${app.name.charAt(0)}${app.name.charAt(1)}`;
  const iconStyle = app.icon
    ? { backgroundImage: `url(${app.icon})` }
    : { background: theme.colors.avatarGradient };
  return (
    <Wrapper>
      <AppIcon style={iconStyle}>
        {!app.icon ? <AppInitials>{initials}</AppInitials> : null}
      </AppIcon>
      <AppName>{app.origin}</AppName>
      <ActionLink>Remove</ActionLink>
    </Wrapper>
  );
}
