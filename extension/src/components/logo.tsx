import * as React from "react";
import { theme } from "./theme";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export const LogoWrap = styled.div`
  padding: ${theme.spacing._10} ${theme.spacing._20};
  border-bottom: solid 1px ${theme.colors.border};
  text-align: center;
`;

export const Logo = styled.div`
  display: inline-block;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.font._16.size};
  line-height: ${theme.font._16.lineHeight};
  color: ${theme.colors.logoRight};
  letter-spacing: 2px;
  background: linear-gradient(
    to right,
    ${theme.colors.logoLeft} 0%,
    ${theme.colors.logoRight} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
`;

const IconWrap = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.size.appIconInner};
  line-height: ${theme.size.appIconInner};
  background: ${theme.colors.avatarGradient};
  width: ${theme.size.appIcon};
  height: ${theme.size.appIcon};
  color: ${theme.colors.white};
  border-radius: 8%;
`;

export function Icon() {
  return (
    <IconWrap>
      <FontAwesomeIcon icon={faCamera} />
    </IconWrap>
  );
}
